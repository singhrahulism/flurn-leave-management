import React, { useEffect, useState } from 'react'
import { Text, View, StyleSheet, StatusBar, Button, FlatList, TouchableOpacity, ActivityIndicator, Modal } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { Calendar } from 'react-native-calendars';
import { changeIsSignedIn, getLeaves } from '../../redux/features/supabaseSlice'
import * as SecureStore from 'expo-secure-store'
import { changeLoading, changeChanges } from '../../redux/features/loadingSlice'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import FloatingActionButton from '../../components/buttons/FloatingActionButton'
import SingleLeave from '../../components/leave/SingleLeave'

import { getCalendarPeriodDates } from '../../components/helperFunctions/getCalendarPeriodDates';
import { getRandomColor } from '../../components/helperFunctions/getRandomColor';

const UpcomingLeavesScreen = () => {

    const dispatch = useDispatch()
    const isLoading = useSelector(state => state.loading.value)
    const isChanged = useSelector(state => state.loading.changes)
    const leaves = useSelector(state => state.supabase.leaves)

    var calendarLeaves = leaves.map(({start_date, end_date}) => ({fromDate: start_date, toDate:end_date, color: getRandomColor()}))

    const [showCalendar, setShowCalendar] = useState(false)

    const getkey = async() => {
        await SecureStore.setItemAsync('access_token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNjY2OTk1Nzc1LCJzdWIiOiJhMDY0MmU3OS00YzMxLTRkNTgtYmE2Ny1mMzQ0YmJmMDUzNDQiLCJlbWFpbCI6InJhaHVsQHRlc3QuY29tIiwicGhvbmUiOiIiLCJhcHBfbWV0YWRhdGEiOnsicHJvdmlkZXIiOiJlbWFpbCIsInByb3ZpZGVycyI6WyJlbWFpbCJdfSwidXNlcl9tZXRhZGF0YSI6eyJuYW1lIjoidW5kZWZpbmVkIn0sInJvbGUiOiJhdXRoZW50aWNhdGVkIiwic2Vzc2lvbl9pZCI6ImYzZTk4OWU3LWZmYjgtNGJkYy04YWExLTkwMDZkNTUxYWNjMSJ9.FDXIxFtHJNRIgNkOoqZVZhSWJpdLG9CMujJnRar1AIs')
    }


    const handleRefresh = () => {
        dispatch(changeLoading(true))
        dispatch(getLeaves())
        .then(() => {
            dispatch(changeLoading(false))
            dispatch(changeChanges(false))
        })
        .catch(() => {
            dispatch(changeLoading(false))
            dispatch(changeChanges(false))
        })
    }

    useEffect(() => {
        console.log('leaves changed...')
    }, [leaves])

    useEffect(() => {
        getkey()
    }, [])

    useEffect(() => {
        if(isChanged)
        {
            handleRefresh()
        }
    }, [isChanged])

    return <View style={styles.container}>
        <View style={styles.headerContainer}>
            <Text style={styles.headingContainer}>Upcoming Leaves</Text>
            <TouchableOpacity
                style={styles.refreshContainer}
                activeOpacity={0.8}
                onPress={handleRefresh}
            >
                {
                    isLoading
                    ? <ActivityIndicator size={'small'} color='white' />
                    : <Text style={{color: 'white'}}>Refresh</Text>
                }
            </TouchableOpacity>
        </View>

        {
            leaves.length === 0
            ? <Text style={styles.noLeavesContainer}>No upcoming leaves! Yaahooo 🥳</Text>
            : <>
            <View style={{flexDirection: 'row-reverse'}}>
                <TouchableOpacity
                    style={styles.showOnCalendar}
                    activeOpacity={0.8}
                    onPress={() => setShowCalendar(true)}
                >
                    <Text style={{color: 'white'}}>View in calendar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.showOnCalendar}
                    activeOpacity={0.8}
                    >
                    <MaterialCommunityIcons name="filter" size={20} color="white" />
                </TouchableOpacity>
            </View>
            </>

        }

        <FlatList
            data = {leaves}
            showsVerticalScrollIndicator={false}
            keyExtractor = {leave => leave.id}
            renderItem = {({item}) => {
                return <SingleLeave startingDate={item.start_date} endingDate={item.end_date} reasonForLeave={item.reason} leaveID={item.id} />
            }}
        />
        <Modal
            transparent
            animationType='slide'
            visible={showCalendar}
            onRequestClose={() => setShowCalendar(false)}
        >
            <View style={styles.calendarContainer} >
                <TouchableOpacity
                    style={styles.dismissContainer}
                    activeOpacity={0.8}
                    onPress={() => setShowCalendar(false)}
                >
                    <Text style={{color: 'white'}}>Dismiss</Text>
                </TouchableOpacity>
                <Calendar
                    markingType='multi-period'
                    markedDates={getCalendarPeriodDates(calendarLeaves)}
                />
            </View>
        </Modal>
        <FloatingActionButton />
    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
        marginTop: 30,
        paddingHorizontal: 20,
        paddingBottom: 55
    },
    headingContainer: {
        fontSize: 25,
        fontWeight: 'bold',
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 25
    },
    refreshContainer: {
        backgroundColor: 'rgba(32, 173, 69, 0.8)',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 4,
        width: 75,
        alignItems: 'center'
    },
    noLeavesContainer: {
        textAlign: 'center',
        marginTop: '70%',
        fontWeight: 'bold',
        color: '#5f66e1'
    },
    showOnCalendar: {
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
        backgroundColor: 'rgba(32, 173, 69, 0.8)',
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 4
    },
    calendarContainer: {
        backgroundColor: 'rgba(0,0,0,0.1)',
        height: '100%',
        justifyContent: 'flex-end'
    },
    dismissContainer: {
        padding: 10,
        margin: 10,
        backgroundColor: 'rgba(32, 173, 69, 0.8)',
        width: 100,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5
    }
})

export default UpcomingLeavesScreen ;