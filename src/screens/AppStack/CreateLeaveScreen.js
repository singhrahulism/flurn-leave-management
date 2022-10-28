import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Text, View, StyleSheet, StatusBar, TouchableOpacity, TextInput, Platform, ToastAndroid } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import { createLeave } from '../../redux/features/supabaseSlice';
import { changeChanges, changeLoading } from '../../redux/features/loadingSlice';
import SelectCalendar from '../../components/calendar/SelectCalendar';
import ApplyLeaveButton from '../../components/buttons/ApplyLeaveButton';
import { getDateDifference } from '../../components/helperFunctions/getDateDifference';
import { MaterialIcons } from '@expo/vector-icons';

const CreateLeaveScreen = () => {

    const navigation = useNavigation()
    const dispatch = useDispatch()

    const isLoading = useSelector(state => state.loading.value)
    const isChanged = useSelector(state => state.loading.changes)

    const [startingDate, setStartingDate] = useState('')
    const [endingDate, setEndingDate] = useState('')
    const [reason, setReason] = useState('')
    const [totalDays, setTotalDays] = useState(0)

    const handlePress = (start_date, end_date, reason) => {
        console.log('Applying for leave...')
        dispatch(changeLoading(true))
        dispatch(createLeave({start_date, end_date, reason}))
        .then(() => {
            dispatch(changeLoading(false))
            dispatch(changeChanges(true))
            console.log(' -> leave created successfully')
            Platform.OS === 'ios' ? alert('Leave created successfully.') : ToastAndroid.show("Leave created successfully", ToastAndroid.SHORT)
            navigation.goBack()
        })
        .catch(() => {
            dispatch(changeLoading(false))
            console.log(' -> leave created successfully')
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
        <Text style={styles.headingContainer}>New Leave</Text>

        <View style={styles.selectCalendarContainer}>
            <SelectCalendar title={'To'} setNewDate={date => setStartingDate(date)} />
            <View style={{width: 8}} />
            <SelectCalendar title={'From'} setNewDate={date => setEndingDate(date)} />
        </View>
        <View style={styles.reasonContainer}>
            <Text style={{fontSize: 12}}>Reason (optional)</Text>
            <TextInput
                multiline
                style={styles.reasonInputContainer}
                placeholder={'Type reason here.'}
                onChangeText={updatedReason => setReason(updatedReason)}
            />
        </View>
        <ApplyLeaveButton
            text={`Apply for ${totalDays} Days Leave`}
            allowed={totalDays}
            handlePress={totalDays ? () => handlePress(startingDate, endingDate, reason) : null}
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
    },
    reasonContainer: {
        marginTop: 8,
        borderWidth: 1,
        borderColor: '#cecece',
        borderRadius: 4,
        paddingTop: 2,
        paddingHorizontal: 6,
        paddingBottom: 4,
        minHeight: 100
    },
    reasonInputContainer: {
        marginVertical: 4
    }
})

export default CreateLeaveScreen ;