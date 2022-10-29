import React, { useEffect, useState } from 'react'
import { Text, View, StyleSheet, StatusBar, TouchableOpacity, ActivityIndicator, Modal, Image, ScrollView, Platform, ToastAndroid } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native';
import { Calendar } from 'react-native-calendars';
import { getLeaves } from '../../redux/features/supabaseSlice'
import { changeLoading, changeChanges } from '../../redux/features/loadingSlice'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import FloatingActionButton from '../../components/buttons/FloatingActionButton'
import ViewLeaves from '../../components/leave/ViewLeaves';

import { getCalendarPeriodDates } from '../../components/helperFunctions/getCalendarPeriodDates';
import { getRandomColor } from '../../components/helperFunctions/getRandomColor';

const LeavesScreen = () => {

    const dispatch = useDispatch()
    const navigation = useNavigation()
    const isLoading = useSelector(state => state.loading.value)
    const isChanged = useSelector(state => state.loading.changes)
    const leaves = useSelector(state => state.supabase.leaves)
    const leavesDuration = useSelector(state => state.supabase.leavesDuration)

    const today = new Date().toISOString().replace(/T.*/,'').split('-').join('-')
    const pastLeaves = leaves.filter(function (leave) {
        return ( new Date(leave.end_date)).getTime() <= ( new Date(today)).getTime()
    })
    const upcomingLeaves = leaves.filter(function (leave) {
        return ( new Date(leave.end_date)).getTime() > ( new Date(today)).getTime()
    })

    const [showCalendar, setShowCalendar] = useState(false)
    
    var calendarLeaves = leaves.map(({start_date, end_date}) => ({fromDate: start_date, toDate:end_date, color: getRandomColor()}))

    const handleRefresh = () => {
        dispatch(changeLoading(true))
        dispatch(getLeaves())
        .then(() => {
            Platform.OS === 'ios' ? null : ToastAndroid.show('Refreshed', ToastAndroid.SHORT)
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
        if(isChanged)
        {
            handleRefresh()
        }
    }, [isChanged])

    useEffect(() => {
        dispatch(changeLoading(true))
        dispatch(getLeaves())
        .then(() => {
            dispatch(changeLoading(false))
        })
        .catch(() => {
            dispatch(changeLoading(false))
        })
    }, [])

    return <View style={styles.container}>
        <View style={styles.headerContainer}>
            <Image
                source={require('../../../assets/mainLogo.png')}
                style={styles.headerImageContainer}
            />
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

        <View>
        <View style={styles.actionHeader}>
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
                onPress={() => navigation.navigate('FilterLeaves')}
            >
                <View style={{flexDirection: 'row'}}>
                    <MaterialCommunityIcons name="filter" size={20} color="white" />
                    <Text style={{color: 'white'}}>  {leavesDuration}  </Text>
                </View>
            </TouchableOpacity>
        </View>
        <ScrollView style={styles.leavesContainer} showsVerticalScrollIndicator={false} >
            <ViewLeaves title={'Upcoming Leaves'} leaves={upcomingLeaves} />
            <ViewLeaves title={'Past Leaves'} leaves={pastLeaves} pastLeaves={true} />
        </ScrollView>
        </View>

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
    headerImageContainer: {
        height: 50,
        width: 'auto',
        aspectRatio: 1047/500
    },
    headingContainer: {
        fontSize: 25,
        fontWeight: 'bold',
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 5
    },
    actionHeader: {
        flexDirection: 'row-reverse'
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
    leavesContainer: {
        marginTop: 20,
        marginBottom: 30
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
    },
    dropdown: {
        margin: 16,
        height: 50,
        borderBottomColor: 'gray',
        borderBottomWidth: 0.5,
      },
      icon: {
        marginRight: 5,
      },
      placeholderStyle: {
        fontSize: 16,
      },
      selectedTextStyle: {
        fontSize: 16,
      },
      iconStyle: {
        width: 20,
        height: 20,
      },
      inputSearchStyle: {
        height: 40,
        fontSize: 16,
      },
})

export default LeavesScreen ;