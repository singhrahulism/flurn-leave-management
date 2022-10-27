import React from 'react'
import { Text, View, StyleSheet, StatusBar } from 'react-native'
import FloatingActionButton from '../../components/buttons/FloatingActionButton'
import SingleLeave from '../../components/leave/SingleLeave'

const UpcomingLeavesScreen = () => {
    return <View style={styles.container}>
        <Text style={styles.headingContainer}>Upcoming Leaves</Text>
        <SingleLeave />
        <SingleLeave />
        <FloatingActionButton />
    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
        marginTop: 30,
        paddingHorizontal: 20
    },
    headingContainer: {
        fontSize: 25,
        fontWeight: 'bold',
        marginBottom: 25
    }
})

export default UpcomingLeavesScreen ;