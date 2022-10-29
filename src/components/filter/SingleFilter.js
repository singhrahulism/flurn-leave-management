import React from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'

const SingleFilter = ({ title, selected, handlePress }) => {
    return <TouchableOpacity
        style={[styles.container, {
            borderColor: selected ? 'rgba(32, 173, 69, 0.8)' : '#cecece',
            borderWidth: selected ? 2.5 : 1
        }]}
        activeOpacity={0.7}
        onPress={handlePress}
    >
        <Text style={{
            color: selected ? 'rgba(32, 173, 69, 0.8)' : 'black',
            fontWeight: selected ? 'bold' : null
        }}>{title}</Text>
    </TouchableOpacity>
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flexDirection: 'row',
        borderRadius: 5,
        marginBottom: 20,
        paddingVertical: 15,
        paddingHorizontal: 10
    }
})

export default SingleFilter ;