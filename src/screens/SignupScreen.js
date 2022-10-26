import React, { useEffect, useState, useRef } from 'react'
import { Text, View, StyleSheet, StatusBar, Image, Platform, TouchableOpacity, TextInput } from 'react-native'
import NameField from '../components/fields/NameField'
import EmailField from '../components/fields/EmailField'
import PasswordField from '../components/fields/PasswordField'
import PrimaryButton from '../components/buttons/PrimaryButton'
import LoginFooter from '../components/footers/loginFooter'

const SignupScreen = () => {

    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [isEmailValid, setIsEmailValid] = useState(true)
    const [isPasswordValid, setIsPasswordValid] = useState(true)
    const [isValid, setIsValid] = useState(false)

    const isAllowed = false

    const handleEmail = (mail) => {
        setEmail(mail)
        setIsEmailValid(true)
        setIsPasswordValid(true)
    }
    
    const handlePassword = (pass) => {
        setPassword(pass)
        setIsEmailValid(true)
        setIsPasswordValid(true)
    }

    const handlePress = () => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

        if(fullName === '')
        {
            alert('Full name cannot be empty.')
        }
        else
        {
            if(reg.test(email) === true)
            {
                setIsEmailValid(true)
                if(password.length > 5)
                {
                    // both are okay
                    setIsPasswordValid(true)
                    alert('proceed peasent.')
                }
                else
                {
                    // password is invalid
                    setIsPasswordValid(false)
                }
            }
            else
            {
                // email is invalid
                setIsEmailValid(false)
            }
        }
    }

    return <View style={styles.container}>
        <Image
            source={require('../../assets/signupIllustration.png')}
            style={styles.loginIllustrationContainer}
        />
        <Text style={{
            fontSize: 25,
            fontWeight: 'bold',
            marginVertical: 10
        }}>Sign Up</Text>
        <NameField
            onInputChange={name => setFullName(name)}
        />
        <EmailField
            onInputChange={mail => handleEmail(mail)}
            shouldShakeField={!isEmailValid}
        />
        <PasswordField
            onInputChange={pass => handlePassword(pass)}
            shouldShakeField={!isPasswordValid}
        />
        <Text style={styles.tncContainer}>By signing up, you agree to our Terms & Conditions and Privacy Policy.</Text>
        <PrimaryButton
            text={'Continue'}
            allowed={isAllowed}
            handlePress={handlePress}
        />
        <LoginFooter
        />
    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight+30,
        paddingHorizontal: 30,
    },
    loginIllustrationContainer: {
        height: 300,
        width: 'auto',
        aspectRatio: 1000/666,
        alignSelf: 'center'
    },
    tncContainer: {
        marginTop: 40,
        marginBottom: 30
    }
})

export default SignupScreen ;