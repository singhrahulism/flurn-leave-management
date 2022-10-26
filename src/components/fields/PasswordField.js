import React, { useState, useRef } from 'react'
import { Text, View, StyleSheet, TextInput, TouchableHighlight, TouchableOpacity, Animated } from 'react-native'
import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

const PasswordField = ({ onInputChange, value, shouldShakeField }) => {

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

    const [isHidden, setIsHidden] = useState(true)

    const handleIsHidden = () => {
        setIsHidden(isHidden ? false : true)
    }

    return <Animated.View style={[styles.container, {left: shake}]}>
        <View style={{flexDirection: 'row'}}>
        <View style={styles.iconContainer} >
            <Feather name="lock" size={24} color={shouldShakeField ? 'red' : '#7a869a'} />
        </View>
        <TextInput
            secureTextEntry={isHidden}
            style={[styles.nameInputContainer, {borderBottomColor: shouldShakeField ? 'red' : '#dfe1e5'}]}
            placeholder={'Password'}
            onChangeText={updatedPass => onInputChange(updatedPass)}
        />
        <TouchableOpacity
            activeOpacity={0.6}
            style={styles.eyeContainer}
            onPress={handleIsHidden}
        >
            {
            isHidden
            ? <Ionicons name="eye-off" size={24} color="black" />
            : <Ionicons name="eye" size={24} color="black" />
            }
        </TouchableOpacity>
        </View>
        <View style={styles.errorContainer}>
            {
                shouldShakeField &&
                <Text style={{color: 'red'}}>
                    Password should be atleast 6 characters.
                </Text>
            }
        </View>
    </Animated.View>
}

const styles = StyleSheet.create({
    container: {
        marginTop: 15,
        height: 40,
    },
    iconContainer: {
        height: 40,
        width: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    nameInputContainer: {
        borderBottomWidth: 1,
        flex: 1,
        marginLeft: 10,
        paddingRight: 42
    },
    eyeContainer: {
        position: 'absolute',
        right: 0,
        height: '100%',
        width: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },
    errorContainer: {
        paddingTop: 5,
        paddingLeft: 50
    }
})

export default PasswordField ;