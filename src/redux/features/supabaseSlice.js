import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_BASE_URL, HEADERS, API_KEY } from "../../constants/apiConstants";
import * as SecureStore from 'expo-secure-store'
import { Platform, ToastAndroid } from "react-native";


const initialState = {
    isSignedIn: false,
    token: {
        access_token: null,
        refresh_token: null
    },
    user: {},
    splashStatus: true,
    leaves: [],
    leavesDuration: 'All leaves'
}

export const login = createAsyncThunk('supabase/login', async({email, password}) => {
    console.log('-> trying login in...');
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
            Platform.OS === 'ios' ? alert(response.error_description) : ToastAndroid.show(response.error_description, ToastAndroid.LONG)
                // await SecureStore.getItemAsync('dummykey')
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
    console.log(' -> trying signing in...')
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
            Platform.OS === 'ios' ? alert(response.msg) : ToastAndroid.show(response.msg, ToastAndroid.LONG)
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

export const getUser = createAsyncThunk('supabase/getUser', async() => {
    let access_token = await SecureStore.getItemAsync('access_token')
    var options = {  
        method: 'GET',
        headers: {...HEADERS, 'Authorization': `Bearer ${access_token}`}
    }
    try {
        const res = await fetch(API_BASE_URL+'/auth/v1/user', options)
        const response = await res.json()
        return response
    } catch (error) {
        console.log('-> error in getting user data')
    }
})

export const changePassword = createAsyncThunk('supabase/changePassword', async({ email, password }) => {
    console.log('-> changing passwordd')
    let access_token = await SecureStore.getItemAsync('access_token')
    var options = {  
        method: 'PUT',
        headers: {...HEADERS, 'Authorization': `Bearer ${access_token}`},
        body: JSON.stringify({
            "email": `${email}`,
            "password": `${password}`
        })
    }
    try {
        const res = await fetch(API_BASE_URL+'/auth/v1/user', options)
        const response = await res.json()
        return response
    } catch (error) {
        console.log('-> error in getting user data')
    }
})

export const logoutUser = createAsyncThunk('supabase/logoutUser', async() => {
    console.log('-> logging out')
    let access_token = await SecureStore.getItemAsync('access_token')
    var options = {  
        method: 'POST',
        headers: {...HEADERS, 'Authorization': `Bearer ${access_token}`}
    }
    try {
        await fetch(API_BASE_URL+'/auth/v1/logout', options)
        await SecureStore.setItemAsync('access_token', '')
        await SecureStore.setItemAsync('refresh_token', '')
    } catch (error) {
        console.log('-> error in getting user data')
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
        return response
    } catch (error) {
        console.log('-> error in getLeaves')
    }
})

export const createLeave = createAsyncThunk('supabase/createLeave', async({ start_date, end_date, reason }) => {
    console.log(` -> creating Leave with start_date = ${start_date}, end_date = ${end_date}`)
    let access_token = await SecureStore.getItemAsync('access_token')
    if(reason)
    {
        var options = {  
            method: 'POST',
            headers: {...HEADERS, 'Authorization': `Bearer ${access_token}`},
            body: JSON.stringify({
                "start_date": `${start_date}`,
                "end_date": `${end_date}`,
                "reason": `${reason}`
            })
        }
    }
    else
    {
        var options = {  
            method: 'POST',
            headers: {...HEADERS, 'Authorization': `Bearer ${access_token}`},
            body: JSON.stringify({
                "start_date": `${start_date}`,
                "end_date": `${end_date}`
            })
        }
    }
    try {
        const response = await fetch(API_BASE_URL+'/rest/v1/leaves', options)
        return response
    } catch (error) {
        console.log('-> error in getLeaves')
    }
})

export const deleteLeave = createAsyncThunk('supabase/deleteLeave', async({leaveID}) => {
    console.log(' -> deleting Leave with id: ', leaveID)
    let access_token = await SecureStore.getItemAsync('access_token')
    var options = {
        method: 'DELETE',
        headers: {...HEADERS, 'Authorization': `Bearer ${access_token}`}
    }
    try {
        console.log('-> attempting delete...')
        let apiURL = `${API_BASE_URL}/rest/v1/leaves?id=eq.${leaveID}`
        await fetch(apiURL, options)
        console.log('-> deleted...')
    } catch (error) {
        console.log('-> error in getLeaves')
    }
})

export const editLeave = createAsyncThunk('supabase/editLeave', async({ startingDate, endingDate, leaveID }) => {
    console.log(' -> editing Leave with id: ', leaveID)
    let access_token = await SecureStore.getItemAsync('access_token')
    
    var options = {  
        method: 'PATCH',
        headers: {...HEADERS, 'Authorization': `Bearer ${access_token}`, 'Prefer': 'return=representation'},
        body: JSON.stringify({
            "start_date": `${startingDate}`,
            "end_date": `${endingDate}`
        })
    }
    
    try {
        let apiURL = `${API_BASE_URL}/rest/v1/leaves?id=eq.${leaveID}`
        const res = await fetch(apiURL, options)
        const response = await res.json()
        return response
    } catch (error) {
        console.log('-> error in getLeaves')
    }
})

export const filterLeaves = createAsyncThunk('supabase/filterLeaves', async({ startdate, enddate }) => {
    console.log(`  -> filtering leaves with start_date = ${startdate} and end_date = ${enddate}`)

    let access_token = await SecureStore.getItemAsync('access_token')
    
    var options = {  
        method: 'GET',
        headers: {...HEADERS, 'Authorization': `Bearer ${access_token}`}
    }
    
    try {
        let apiURL = `${API_BASE_URL}/rest/v1/leaves?start_date=gt.${startdate}&end_date=lt.${enddate}&select=*`
        const res = await fetch(apiURL, options)
        const response = await res.json()
        return response
    } catch (error) {
        console.log(error)
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
        },
        changeLeavesDuration: (state, action) => {
            state.leavesDuration = action.payload
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
        .addCase(getUser.fulfilled, (state, action) => {
            if(action.payload.aud)
            {
                state.user = action.payload
            }
            else
            {
                Platform.OS === 'ios' ? alert(action.payload.message) : ToastAndroid.show(action.payload.message, ToastAndroid.LONG)
            }
        })
        .addCase(changePassword.fulfilled, (state, action) => {
            if(action.payload.aud)
            {
                Platform.OS === 'ios' ? alert('Password changed successfully') : ToastAndroid.show('Password changed successfully', ToastAndroid.LONG)
                state.user = action.payload
            }
            else
            {
                Platform.OS === 'ios' ? alert(action.payload.msg) : ToastAndroid.show(action.payload.msg, ToastAndroid.LONG)
            }
        })
        .addCase(logoutUser.fulfilled, (state, action) => {
            state.user = {}
            state.leaves = []
            state.token.access_token = ''
            state.token.refresh_token = ''
            state.isSignedIn = false
        })
        .addCase(getLeaves.fulfilled, (state, action) => {
            if(action.payload.message)
            {
                Platform.OS === 'ios' ? alert(action.payload.message) : ToastAndroid.show(action.payload.message, ToastAndroid.LONG)
            }
            else
            {
                state.leavesDuration = 'All leaves'
                state.leaves = action.payload
            }
        })
        .addCase(editLeave.fulfilled, (state, action) => {
            if(action.payload.message)
            {
                console.log(`-> ${action.payload.message}.`)
                Platform.OS === 'ios' ? alert(action.payload.message) : ToastAndroid.show(action.payload.message, ToastAndroid.SHORT)
            }
            else
            {
                Platform.OS === 'ios' ? alert('Leave edited successfully.') : ToastAndroid.show("Leave edited successfully", ToastAndroid.SHORT)
            }
        })
        .addCase(createLeave.fulfilled, (state, action) => {
            if(action.payload.ok === false)
            {
                console.log('-> Error creating leave.')
                Platform.OS === 'ios' ? alert('Error creating Leave.') : ToastAndroid.show('Error creating Leave', ToastAndroid.SHORT)
            }
            else
            {
                console.log('-> Leave created successfully.')
                Platform.OS === 'ios' ? alert('Leave created successfully.') : ToastAndroid.show("Leave created successfully", ToastAndroid.SHORT)
            }
        })
        .addCase(filterLeaves.fulfilled, (state, action) => {
            if(action.payload.message)
            {
                console.log(`-> ${action.payload.message}.`)
                Platform.OS === 'ios' ? alert(action.payload.message) : ToastAndroid.show(action.payload.message, ToastAndroid.SHORT)
            }
            else
            {
                state.leaves = action.payload
            }
        })
    }
    }
)

export const { changeIsSignedIn, changeSplashStatus, changeLeavesDuration } = supabaseSlice.actions

export default supabaseSlice.reducer