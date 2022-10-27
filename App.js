import { useEffect } from "react"
import { NavigationContainer } from "@react-navigation/native"
import { AppStack, AuthStack } from "./stack"
import * as SecureStore from 'expo-secure-store'
import { Provider, useDispatch } from "react-redux" 
import store from "./src/redux/store"
import { useSelector } from "react-redux"
import { changeSplashStatus } from "./src/redux/features/supabaseSlice" 
import { useState } from "react"

const App = () => {

    const isSignedIn = useSelector(state => state.supabase.isSignedIn)
    const splashStatus = useSelector(state => state.supabase.splashStatus)
    const dispatch = useDispatch()
    const [stack, setStack] = useState(false)
    const getToken = async() => {
        console.log(' -> Fetching token from secure store...');
        let token = await SecureStore.getItemAsync('access_token')
        if(token !== '')
        {
            console.log(token);
            dispatch(changeSplashStatus(false))
            setStack(true)
        }
        else
        {
            console.log(token);
            dispatch(changeSplashStatus(false))
            setStack(false)
        }
    }

    useEffect(() => {
        console.log('inside issignedin');
        getToken()
    }, [isSignedIn])

    if(splashStatus === true)
    {
        return 
    }

    return (
    <NavigationContainer>
      { stack === true ? <AppStack /> : <AuthStack /> }
    </NavigationContainer>
    )
}

export default () => {
    return (
        <Provider store={store}>
            <App />
        </Provider>
    )
}