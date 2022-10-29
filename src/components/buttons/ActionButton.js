import React from 'react'
import { Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons';

const ActionButton = ({ title, iconName, handlePress, useIndicator }) => {
    return <TouchableOpacity
                style={styles.container}
                activeOpacity={0.4}
                onPress={handlePress}
            >
        <MaterialCommunityIcons name={iconName} size={20} color="black" />
        {
           useIndicator
           ? <ActivityIndicator style={{marginLeft: 10}} size={'small'} color='black' />
           : <Text style={{marginLeft: 10}}>{title}</Text>
        }
    </TouchableOpacity>
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: 20,
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderWidth: 0.5,
        borderColor: 'rgba(32, 173, 69, 0.8)',
        borderRadius: 10,
        flexDirection: 'row'
    }
})

export default ActionButton ;