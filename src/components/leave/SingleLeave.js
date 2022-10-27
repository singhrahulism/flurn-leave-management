import React from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons';

const SingleLeave = () => {
    return <View style={styles.container}>
        <View style={styles.detailsContainer}>
            <Text style={styles.totalDaysContainer}>3 days application</Text>
            <Text style={styles.toFromContainer}>Tue, 22 Nov - Fri, 25 Nov</Text>
            <Text style={styles.reasonContainer}>Casual</Text>
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