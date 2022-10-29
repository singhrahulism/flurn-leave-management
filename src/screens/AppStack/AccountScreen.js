import React from 'react'
import { useEffect } from 'react'
import { Text, View, StyleSheet, Button, StatusBar } from 'react-native'
import { useNavigation } from '@react-navigation/native'

import { useDispatch, useSelector } from 'react-redux'
import { getUser, logoutUser } from '../../redux/features/supabaseSlice'
import { changeLoading } from '../../redux/features/loadingSlice'

import ActionButton from '../../components/buttons/ActionButton'

const AccountScreen = () => {

    const dispatch = useDispatch()
    const navigation = useNavigation()
    const isLoading = useSelector(state => state.loading.value)

    const getuserdata = () => {
        dispatch(getUser())
        .then(() => {
            console.log('-> user data fetched')
        })
        .catch(() => {
            console.log('-> user data fetched')
        })
    }

    const handleLogOut = () => {
        console.log('logout')
        dispatch(changeLoading(true))
        dispatch(logoutUser())
        .then(() => {
            dispatch(changeLoading(false))
        })
        .catch(() => {
            dispatch(changeLoading(false))
            console.log(' -> error logging out.')
        })
    }

    useEffect(() => {
        getuserdata()
    }, [])

    return <View style={styles.container}>
        <Text style={styles.greetingContainer}>Hi!</Text>
        <Text style={{marginTop: 40, marginBottom: 30}}>Please select an action to continue ⚡</Text>
        <ActionButton title={'Change Password'} iconName={'key-change'} handlePress={() => navigation.navigate('ChangePassword')} />
        <ActionButton title={'Logout'} iconName={'logout'} handlePress={handleLogOut} useIndicator={isLoading} />
    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
        marginTop: 30,
        paddingHorizontal: 20,
        paddingBottom: 55
    },
    greetingContainer: {
        fontSize: 25,
        fontWeight: 'bold',
    }
})

export default AccountScreen ;