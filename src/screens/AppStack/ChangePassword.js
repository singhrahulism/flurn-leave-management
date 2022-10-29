import React, { useState } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, StatusBar, Platform, ToastAndroid } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import PasswordField from '../../components/fields/PasswordField'
import PrimaryButton from '../../components/buttons/PrimaryButton'

import { useDispatch, useSelector } from 'react-redux'
import { changePassword } from '../../redux/features/supabaseSlice'
import { changeLoading } from '../../redux/features/loadingSlice'

import { MaterialIcons } from '@expo/vector-icons';

const ChangePasswordScreen = () => {

    const dispatch = useDispatch()
    const navigation = useNavigation()
    const isLoading = useSelector(state => state.loading.value)
    const email = useSelector(state => state.supabase.user.email)

    const [password, setPassword] = useState('')
    const [passwordAgain, setPasswordAgain] = useState('')
    const [isPasswordValid, setIsPasswordValid] = useState(true)
    const [isPasswordAgainValid, setIsPasswordAgainValid] = useState(true)

    const handlePress = () => {
        if(password.length > 5)
        {
            if(passwordAgain.length > 5)
            {
                if(password === passwordAgain)
                {
                    // do action here
                    dispatch(changeLoading(true))
                    dispatch(changePassword({email, password}))
                    .then(() => {
                        dispatch(changeLoading(false))
                        navigation.goBack()
                    })
                    .catch(() => {
                        dispatch(changeLoading(false))
                    })
                }
                else
                {
                    Platform.OS === 'ios' ? alert('Passwords do not match') : ToastAndroid.show('Passwords do not match', ToastAndroid.SHORT)
                }
            }
            else
            {
                setIsPasswordAgainValid(false)
            }
        }
        else
        {
            setIsPasswordValid(false)
        }
    }

    return <View style={styles.container}>
        <TouchableOpacity activeOpacity={0.7} style={styles.backButtonContainer} onPress={() => navigation.goBack()}>
            <MaterialIcons name="keyboard-arrow-left" size={30} color="#4e4e4e" />
        </TouchableOpacity>
        <Text style={styles.headingContainer}>Change Password</Text>
        <Text style={{marginTop: 40, marginBottom: 30}}>Please enter a new password to continue ⚡</Text>
        <PasswordField
            value={password}
            onInputChange={pass => {
                setPassword(pass)
                setIsPasswordValid(true)
                setIsPasswordAgainValid(true)
            }}
            shouldShakeField={!isPasswordValid}
        />
        <View style={{height: 15}}/>
        <PasswordField
            value={passwordAgain}
            onInputChange={pass => {
                setPasswordAgain(pass)
                setIsPasswordValid(true)
                setIsPasswordAgainValid(true)
            }}
            shouldShakeField={!isPasswordAgainValid}
        />
        <View
            style={{height: 50}}
        />
        <PrimaryButton
            text={'Change Password'}
            allowed={password && passwordAgain}
            handlePress={handlePress}
            useIndicator={isLoading}
        />
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
    backButtonContainer: {
        height: 40,
        width: 40,
        backgroundColor: '#cecece',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        paddingRight: 1
    },
    headingContainer: {
        fontSize: 25,
        fontWeight: 'bold',
        marginTop: 20
    }
})

export default ChangePasswordScreen ;