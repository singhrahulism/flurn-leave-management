import React from 'react'
import { Text, View, StyleSheet, FlatList } from 'react-native'
import SingleLeave from './SingleLeave'

const ViewLeaves = ({ title, leaves, pastLeaves }) => {

    return <View style={styles.container}>
        <View
            style={{borderLeftColor: 'rgba(32, 173, 69, 0.8)', borderLeftWidth: 4}}
        >
            <Text style={styles.headingContainer}>  {title}</Text>
        </View>
        <View style={{height: 10}} />
        {
            leaves.length
            ?
            leaves.map((item) => (
                <SingleLeave
                    key={item.id}
                    isPastLeave={pastLeaves}
                    startingDate={item.start_date}
                    endingDate={item.end_date}
                    reasonForLeave={item.reason}
                    leaveID={item.id}
                />))
            : <Text style={styles.noLeavesContainer}>Yaahooo 🥳! No leaves.</Text>
        }
    </View>
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 30
    },
    headingContainer: {
        fontSize: 23,
        fontWeight: 'bold',
    },
    noLeavesContainer: {
        marginLeft: 18
    }
})

export default ViewLeaves ;