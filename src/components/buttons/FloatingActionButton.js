import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import { Octicons } from '@expo/vector-icons';

const FloatingActionButton = () => {

    const navigation = useNavigation()

    const handlePress = () => {
        navigation.navigate('CreateLeave')
    }

    return <TouchableOpacity style={styles.container} activeOpacity={0.75} onPress={handlePress} >
        <Octicons name="plus" size={24} color="white" />
    </TouchableOpacity>
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 15,
        right: 15,
        backgroundColor: '#20ad45',
        height: 60,
        width: 60,
        borderRadius: 60/2,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default FloatingActionButton ;