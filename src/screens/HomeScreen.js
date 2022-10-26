import React from 'react'
import { Text, View, StyleSheet } from 'react-native'

const HomeScreen = () => {
    return <View style={styles.container}>
        <Text>This is HomeScreen</Text>
    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default HomeScreen ;