import React from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { getDateDifference } from '../helperFunctions/getDateDifference';

const SingleLeave = ({ startingDate, endingDate, reasonForLeave }) => {

    let dateDifference = getDateDifference(startingDate, endingDate)
    const weekDay = [
        'Sun',
        'Mon',
        'Tue',
        'Wed',
        'Thu',
        'Fri',
        'Sat',
    ]
    const month = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
    ]
    const d1w = weekDay[(new Date(startingDate)).getDay()]
    const d2w = weekDay[(new Date(endingDate)).getDay()]

    const d1d = startingDate.slice(-2)
    const d2d = endingDate.slice(-2)

    const d1m = month[startingDate.slice(5, 7)-1]
    const d2m = month[endingDate.slice(5, 7)-1]

    return <View style={styles.container}>
        <View style={styles.detailsContainer}>
            <Text style={styles.totalDaysContainer}>{dateDifference} days application</Text>
            <Text style={styles.toFromContainer}>{d1w}, {d1d} {d1m} - {d2w}, {d2d} {d2m}</Text>
            <Text style={styles.reasonContainer}>{reasonForLeave ? reasonForLeave : 'No Reason specified'}</Text>
        </View>
        <View style={styles.actionContainer}>
            <TouchableOpacity
                style={[styles.actionIconContainer, {backgroundColor: 'rgba(0, 255, 0, 0.15)'}]}
                activeOpacity={0.4}
                >
                <MaterialCommunityIcons name="pencil" size={20} color="black" />
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.actionIconContainer, {backgroundColor: 'rgba(255, 0, 0, 0.15)'}]}
                activeOpacity={0.4}
            >
                <MaterialCommunityIcons name="delete" size={20} color="black" />
            </TouchableOpacity>
        </View>
    </View>
}

const styles = StyleSheet.create({
    container: {
        borderColor: '#d6d6d6',
        borderWidth: 1,
        // height: 100,
        marginVertical: 10,
        borderRadius: 100/10,
        flexDirection: 'row',
        padding: 10
    },
    detailsContainer: {
        // borderColor: 'blue',
        // borderWidth: 1,
        height: '100%',
        flex: 9,
    },
    actionContainer: {
        // borderColor: 'blue',
        // borderWidth: 1,
        justifyContent: 'center',
        flex: 2,
        alignItems: 'center'
    },
    totalDaysContainer: {
        fontSize: 12,
        color: '#9e9e9e',
        fontWeight: 'bold'
    },
    toFromContainer: {
        fontSize: 18,
        color: '#03042a',
        fontWeight: 'bold',
        marginVertical: 4
    },
    reasonContainer: {
        color: '#9094de',
        fontWeight: 'bold',
        paddingRight: 10
    },
    actionIconContainer: {
        padding: 8,
        marginVertical: 2,
        borderRadius: 5
    }
})

export default SingleLeave ;