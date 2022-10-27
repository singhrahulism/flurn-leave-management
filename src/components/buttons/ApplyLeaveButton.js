
import React from 'react'
import { Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native'

const ApplyLeaveButton = ({ handlePress, text, allowed, useIndicator }) => {
    return <TouchableOpacity
                style={{...styles.container, backgroundColor: allowed ? '#20ad45' : '#bfc2c3'}}
                activeOpacity={ allowed ? 0.85 : 1 }
                onPress={handlePress}
            >
        {
            useIndicator
            ? <ActivityIndicator size={'large'} color='white' />
            : <Text style={{color: allowed ? 'white' : 'grey', fontSize: 16}}>{text}</Text>
        }
    </TouchableOpacity>
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 5,
        height: 60,
        width: '100%',
        borderRadius: 15,
        backgroundColor: '#0195f7',
        marginBottom: 20
    }
})

export default ApplyLeaveButton ;