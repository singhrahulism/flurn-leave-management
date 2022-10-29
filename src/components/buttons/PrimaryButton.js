
import React from 'react'
import { Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native'

const PrimaryButton = ({ handlePress, text, allowed, useIndicator }) => {
    return <TouchableOpacity
                style={{...styles.container, backgroundColor: allowed ? 'rgba(32, 173, 69, 0.8)' : '#bfc2c3'}}
                activeOpacity={ allowed ? 0.65 : 1 }
                onPress={handlePress}
            >
        {
            useIndicator
            ? <ActivityIndicator size={'large'} color='white' />
            : <Text style={{color: allowed ? 'white' : 'grey'}}>{text}</Text>
        }
    </TouchableOpacity>
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 5,
        height: 45,
        width: '100%',
        borderRadius: 4
    }
})

export default PrimaryButton ;