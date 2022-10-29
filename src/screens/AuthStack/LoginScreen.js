import React, { useState } from 'react'
import { Text, View, StyleSheet, StatusBar, Image} from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../redux/features/supabaseSlice'
import { changeLoading } from '../../redux/features/loadingSlice'

import EmailField from '../../components/fields/EmailField'
import PasswordField from '../../components/fields/PasswordField'
import PrimaryButton from '../../components/buttons/PrimaryButton'
import SignupFooter from '../../components/footers/signupfooter'

const SignupScreen = () => {

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

    const handlePress = () => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

        if(reg.test(email) === true)
        {
            setIsEmailValid(true)
            if(password.length > 5)
            {
                // email and password are okay
                // do login dispatch here
                setIsPasswordValid(true)
                dispatch(changeLoading(true))
                dispatch(login({
                    email: email,
                    password: password
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

    return <View style={styles.container}>
        <View>
            <Image
                source={require('../../../assets/loginIllustration.png')}
                style={styles.loginIllustrationContainer}
            />
            <Text style={{
                fontSize: 25,
                fontWeight: 'bold',
                marginVertical: 10
            }}>Login</Text>
            <EmailField
                onInputChange={mail => handleEmail(mail)}
                shouldShakeField={!isEmailValid}
            />
            <PasswordField
                onInputChange={pass => handlePassword(pass)}
                shouldShakeField={!isPasswordValid}
            />
            <View style={{height: 50}} />
            <PrimaryButton
                text={'Login'}
                allowed={email && password}
                handlePress={email && password ? handlePress : null}
                useIndicator={isLoading}
            />
        </View>
        <View>
            <SignupFooter />
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