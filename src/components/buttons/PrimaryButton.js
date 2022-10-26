
import React from 'react'
import { Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native'

const PrimaryButton = ({ handlePress, text, allowed, useIndicator }) => {
    return <TouchableOpacity
                style={styles.container}
                activeOpacity={ allowed ? 0.65 : 1 }
                onPress={handlePress}
            >
        {
            useIndicator
            ? <ActivityIndicator size={'large'} color='white' />
            : <Text style={{color: 'white'}}>{text}</Text>
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
        borderRadius: 4,
        backgroundColor: '#0195f7'
    }
})

export default PrimaryButton ;