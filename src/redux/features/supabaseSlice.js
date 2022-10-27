import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_BASE_URL, HEADERS, API_KEY } from "../../constants/apiConstants";
import * as SecureStore from 'expo-secure-store'

const initialState = {
    isSignedIn: false,
    token: {
        access_token: null,
        refresh_token: null
    },
    splashStatus: true,
    leaves: []
}

export const login = createAsyncThunk('supabase/login', async({email, password}) => {
    console.log('-> inside login...');
    var options = {  
        method: 'POST',
        headers: {...HEADERS, 'Authorization': `Bearer ${API_KEY}`},
        body: JSON.stringify({
            "email": `${email}`,
            "password": `${password}`
        })
    }
    
    try {
        const res = await fetch(API_BASE_URL+'/auth/v1/token?grant_type=password', options)
        const response = await res.json()
        console.log(response);
        if(response.error)
        {
            switch(response.error)
                {
                    case 'invalid_grant':
                        alert(response.error_description)
                        break
                }
                await SecureStore.getItemAsync('dummykey')
        }
        else if(response.access_token)
        {
            console.log('-> setting tokens');
            await SecureStore.setItemAsync('access_token', response.access_token)
            await SecureStore.setItemAsync('refresh_token', response.refresh_token)
            return true
        }
    } catch (error) {
        console.log(' -> login error');
    }
})

export const signup = createAsyncThunk('supabase/signup', async({name, email, password}) => {
    var options = {  
        method: 'POST',
        headers: {...HEADERS, 'Authorization': `Bearer ${API_KEY}`},
        body: JSON.stringify({
            "email": `${email}`,
            "password": `${password}`,
            "data": {
                "name": `${name}`
            }
        })
    }
    try {
        const res = await fetch(API_BASE_URL+'/auth/v1/signup', options)
        const response = await res.json()
        if(response.code)
        {
            switch(response.msg)
            {
                case 'User already registered':
                    alert('User already registered.')
                    break
            }
        }
        else if(response.access_token)
        {
            console.log('-> setting tokens');
            await SecureStore.setItemAsync('access_token', response.access_token)
            await SecureStore.setItemAsync('refresh_token', response.refresh_token)
            return true
        }
        
    } catch (error) {
        console.log(' -> signup error');
    }
})

export const getLeaves = createAsyncThunk('supabase/getLeaves', async() => {
    let access_token = await SecureStore.getItemAsync('access_token')
    var options = {  
        method: 'GET',
        headers: {...HEADERS, 'Authorization': `Bearer ${access_token}`}
    }
    try {
        const res = await fetch(API_BASE_URL+'/rest/v1/leaves?select=*', options)
        const response = await res.json()
        console.log(response)
        return response
    } catch (error) {
        console.log('-> error in getLeaves')
    }
})

const supabaseSlice = createSlice({
    name: 'supabase',
    initialState,
    reducers: {
        changeIsSignedIn: (state, action) => {
            state.isSignedIn = action.payload
        },
        changeSplashStatus: (state, action) => {
            state.splashStatus = action.payload
        }
    },
    extraReducers(builder) {
        builder
        .addCase(login.fulfilled, (state, action) => {
            if(action.payload)
            {
                state.isSignedIn = true
            }
        })
        .addCase(signup.fulfilled, (state, action) => {
            if(action.payload)
            {
                state.isSignedIn = true
            }
        })
        .addCase(getLeaves.fulfilled, (state, action) => {
            state.leaves = action.payload
        })
    }
    }
)

export const { changeIsSignedIn, changeSplashStatus } = supabaseSlice.actions

export default supabaseSlice.reducer