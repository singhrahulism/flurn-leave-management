import React from 'react'
import { Text, View, StyleSheet, StatusBar } from 'react-native'

const UpcomingLeavesScreen = () => {
    return <View style={styles.container}>
        <Text style={styles.headingContainer}>Upcoming Leaves</Text>
    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
        marginTop: 30,
        paddingHorizontal: 20,
        borderColor: 'red',
        borderWidth: 1
    },
    headingContainer: {
        fontSize: 25,
        fontWeight: 'bold'
    }
})

export default UpcomingLeavesScreen ;