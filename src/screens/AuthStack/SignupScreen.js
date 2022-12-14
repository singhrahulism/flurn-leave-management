import React, { useState } from 'react'
import { Text, View, StyleSheet, StatusBar, Image } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { signup } from '../../redux/features/supabaseSlice'
import { changeLoading } from '../../redux/features/loadingSlice'

import NameField from '../../components/fields/NameField'
import EmailField from '../../components/fields/EmailField'
import PasswordField from '../../components/fields/PasswordField'
import PrimaryButton from '../../components/buttons/PrimaryButton'
import LoginFooter from '../../components/footers/loginFooter'


const SignupScreen = () => {

    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isEmailValid, setIsEmailValid] = useState(true)
    const [isPasswordValid, setIsPasswordValid] = useState(true)

    const dispatch = useDispatch()
    const isLoading = useSelector(state => state.loading.value)

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

    const handlePress = (mail, pass, name) => {
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
                    // email and password are okay
                    // do signup dispatch here
                    setIsPasswordValid(true)
                    dispatch(changeLoading(true))
                    dispatch(signup({
                        email: mail,
                        password: pass,
                        "data": {
                            "name": name
                        }
                        
                    }))
                    .then(() => {
                        dispatch(changeLoading(false))
                    })
                    .catch(() => {
                        dispatch(changeLoading(false))
                    })
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

    return <View style={styles.container} behavior="padding">
        <View>
            <Image
                source={require('../../../assets/signupIllustration.png')}
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
                allowed={fullName && email && password}
                handlePress={fullName && email && password ? () => {handlePress(email, password, fullName)} : null}
                useIndicator={isLoading}
            />
        </View>
        <View>
            <LoginFooter />
        </View>
    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight+30,
        paddingHorizontal: 30,
        justifyContent: 'space-between'
    },
    loginIllustrationContainer: {
        height: 260,
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