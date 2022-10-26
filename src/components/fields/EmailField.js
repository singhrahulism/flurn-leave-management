import React, { useRef } from 'react'
import { Text, View, StyleSheet, TextInput, Animated } from 'react-native'
import { Entypo } from '@expo/vector-icons';

const EmailField = ({ onInputChange, shouldShakeField }) => {

    const shake = useRef(
        new Animated.Value(0)
    ).current

    const shakeField = () => {
        Animated.sequence([
            Animated.timing(shake, {
                toValue: -10,
                duration: 100,
                useNativeDriver: false
            }),
            Animated.timing(shake, {
                toValue: 10,
                duration: 100,
                useNativeDriver: false
            }),
            Animated.timing(shake, {
                toValue: -10,
                duration: 100,
                useNativeDriver: false
            }),
            Animated.timing(shake, {
                toValue: 10,
                duration: 100,
                useNativeDriver: false
            }),
            Animated.timing(shake, {
                toValue: -10,
                duration: 100,
                useNativeDriver: false
            }),
            Animated.timing(shake, {
                toValue: 0,
                duration: 100,
                useNativeDriver: false
            })
        ]).start()
    }

    {
        shouldShakeField && shakeField()
    }

    return <Animated.View style={[styles.container, {left: shake}]}>
        <View style={styles.iconContainer} >
            <Entypo name="email" size={24} color={shouldShakeField ? 'red' : '#7a869a'} />
        </View>
        <TextInput
            style={[styles.nameInputContainer, {borderBottomColor: shouldShakeField ? 'red' : '#dfe1e5'}]}
            placeholder={'Email address'}
            onChangeText={updatedMail => onInputChange(updatedMail)}
        />
    </Animated.View>
}

const styles = StyleSheet.create({
    container: {
        marginTop: 15,
        marginBottom: 5,
        flexDirection: 'row',
        height: 40,
        borderColor: 'red',
    },
    iconContainer: {
        height: 40,
        width: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    nameInputContainer: {
        borderBottomColor: '#dfe1e5',
        borderBottomWidth: 1,
        flex: 1,
        marginLeft: 10
    }
})

export default EmailField ;