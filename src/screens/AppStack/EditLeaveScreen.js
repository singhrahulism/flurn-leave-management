import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Text, View, StyleSheet, StatusBar, TouchableOpacity, TextInput, Platform, ToastAndroid } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import { editLeave } from '../../redux/features/supabaseSlice';
import { changeChanges, changeLoading } from '../../redux/features/loadingSlice';
import SelectCalendar from '../../components/calendar/SelectCalendar';
import ApplyLeaveButton from '../../components/buttons/ApplyLeaveButton';
import { getDateDifference } from '../../components/helperFunctions/getDateDifference';
import { MaterialIcons } from '@expo/vector-icons';

const EditLeaveScreen = ({ route }) => {

    const { prevStartDate, prevEndDate, leaveID } = route.params

    const navigation = useNavigation()
    const dispatch = useDispatch()

    const isLoading = useSelector(state => state.loading.value)
    const isChanged = useSelector(state => state.loading.changes)

    const [startingDate, setStartingDate] = useState(prevStartDate)
    const [endingDate, setEndingDate] = useState(prevEndDate)
    const [totalDays, setTotalDays] = useState(0)

    const handlePress = () => {

        console.log('Editing leave...')
        dispatch(changeLoading(true))
        dispatch(editLeave({startingDate, endingDate, leaveID}))
        .then(() => {
            dispatch(changeLoading(false))
            dispatch(changeChanges(true))
            navigation.goBack()
        })
        .catch(() => {
            dispatch(changeLoading(false))
            console.log(' -> leave NOT edited...')
            navigation.goBack()
        })
    }

    useEffect(() => {
        navigation.setOptions({
            headerShown: false
        })
    })
    
    useEffect(() => {
        if(startingDate)
        {
            console.log('startingDate', startingDate)
            if( (new Date(startingDate)).getTime() > (new Date(endingDate)).getTime() )
            {
                setEndingDate('')
            }

        }
    }, [startingDate])
    
    useEffect(() => {
        if(endingDate)
        {
            console.log('endingDate', endingDate)
        }
    }, [endingDate])
    
    useEffect(() => {
        if(startingDate && endingDate)
        {
            let total = getDateDifference(startingDate, endingDate)
            setTotalDays(total)
            console.log('total days: ', total)
        }
    }, [startingDate, endingDate])

    return <View style={styles.container}>
        <TouchableOpacity activeOpacity={0.7} style={styles.backButtonContainer} onPress={() => navigation.goBack()}>
            <MaterialIcons name="keyboard-arrow-left" size={30} color="#4e4e4e" />
        </TouchableOpacity>
        <Text style={styles.headingContainer}>Edit Leave</Text>

        <View style={styles.selectCalendarContainer}>
            <SelectCalendar title={'From'} setNewDate={date => setStartingDate(date)} isActive={true} date={startingDate} />
            <View style={{width: 8}} />
            <SelectCalendar title={'To'} setNewDate={date => setEndingDate(date)} isActive={startingDate} minimumDate={startingDate} date={endingDate} />
        </View>
        
        <ApplyLeaveButton
            text={`Edit Leave for ${totalDays} Days`}
            allowed={(startingDate !== prevStartDate || endingDate !== prevEndDate) && endingDate !== '' }
            handlePress={
                totalDays && (startingDate !== prevEndDate || endingDate !== prevEndDate) && endingDate !== '' 
                ? handlePress
                : null
            }
            useIndicator={isLoading}
        />
    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
        marginTop: 30,
        paddingHorizontal: 20
    },
    backButtonContainer: {
        height: 40,
        width: 40,
        backgroundColor: '#cecece',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        paddingRight: 1
    },
    headingContainer: {
        fontSize: 25,
        fontWeight: 'bold',
        marginTop: 20
    },
    selectCalendarContainer: {
        // borderColor: 'red',
        // borderWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
})

export default EditLeaveScreen ;