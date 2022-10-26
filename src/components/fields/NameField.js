import React, { useEffect, useRef } from 'react'
import { Text, View, StyleSheet, TextInput, Animated } from 'react-native'
import { AntDesign } from '@expo/vector-icons';

const NameField = ({ onInputChange, shouldShakeField }) => {

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
            <AntDesign name="user" size={24} color="#7a869a" />
        </View>
        <TextInput
            style={styles.nameInputContainer}
            placeholder={'Full Name'}
            onChangeText={updatedName => onInputChange(updatedName)}
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

export default NameField ;