import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { Text, View, StyleSheet, TouchableOpacity, Platform, ToastAndroid } from 'react-native'
import { useDispatch } from 'react-redux';
import { changeChanges, changeLoading } from '../../redux/features/loadingSlice';
import { deleteLeave } from '../../redux/features/supabaseSlice';
import { getDateDifference } from '../helperFunctions/getDateDifference';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const SingleLeave = ({ startingDate, endingDate, reasonForLeave, leaveID, isPastLeave }) => {

    let dateDifference = getDateDifference(startingDate, endingDate)

    const dispatch = useDispatch()
    const navigation = useNavigation()

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

    const handleEdit = () => {
        navigation.navigate('EditLeave', { prevStartDate: startingDate, prevEndDate: endingDate, leaveID: leaveID })
    }
    
    const handleDelete = () => {
        dispatch(changeLoading(true))
        dispatch(deleteLeave({leaveID}))
        .then(() => {
            dispatch(changeChanges(true))
            Platform.OS === 'ios' ? alert('Leave deleted successfully.') : ToastAndroid.show("Leave deleted successfully", ToastAndroid.SHORT)
        })
        .catch(error => {
            console.log('-> Error while deleting')
            dispatch(changeLoading(false))
            console.log(error)
        })
    }

    return <View style={styles.container}>
        <View style={styles.detailsContainer}>
            <Text style={styles.totalDaysContainer}>{dateDifference} days application</Text>
            {
                startingDate === endingDate
                ? <Text style={styles.toFromContainer}>{d1w}, {d1d} {d1m}</Text>
                : <Text style={styles.toFromContainer}>{d1w}, {d1d} {d1m} - {d2w}, {d2d} {d2m}</Text>
            }
            <Text style={[styles.reasonContainer, { color: reasonForLeave ? 'rgba(32, 173, 69, 0.8)' : 'rgba(255, 0, 0, 0.4)' }]}>
                {reasonForLeave ? reasonForLeave : 'No Reason specified'}
            </Text>
        </View>
        {
            !isPastLeave &&
            <View style={styles.actionContainer}>
                <TouchableOpacity
                    style={[styles.actionIconContainer, {backgroundColor: 'rgba(0, 255, 0, 0.15)'}]}
                    activeOpacity={0.4}
                    onPress={handleEdit}
                >
                    <MaterialCommunityIcons name="pencil" size={20} color="black" />
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.actionIconContainer, {backgroundColor: 'rgba(255, 0, 0, 0.15)'}]}
                    activeOpacity={0.4}
                    onPress={handleDelete}
                >
                    <MaterialCommunityIcons name="delete" size={20} color="black" />
                </TouchableOpacity>
            </View>
        }
    </View>
}

const styles = StyleSheet.create({
    container: {
        borderColor: '#d6d6d6',
        borderWidth: 1,
        marginVertical: 10,
        borderRadius: 100/10,
        flexDirection: 'row',
        padding: 10
    },
    detailsContainer: {
        height: '100%',
        flex: 9,
    },
    actionContainer: {
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