import React from 'react'
import { Text, View, StyleSheet, Button } from 'react-native'
import { useDispatch } from 'react-redux' 
import { login, signup, changeIsSignedIn } from '../../redux/features/supabaseSlice'
import * as SecureStore from 'expo-secure-store'

const HomeScreen = () => {

    const dispatch = useDispatch()

    const handlePress = async () => {
        let token = await SecureStore.getItemAsync('access_token')
        console.log('token: ', token);
    }

    const logout = async() => {
        await SecureStore.setItemAsync('access_token', '')
        dispatch(changeIsSignedIn(false))
        console.log('-> token nulled');
    }

    return <View style={styles.container}>
        <Button
            title='get token'
            onPress={handlePress}
        />
        <Button
            title='clear token'
            onPress={logout}
        />
    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default HomeScreen ;