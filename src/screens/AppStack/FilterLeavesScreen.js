import React, { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Text, View, StyleSheet, StatusBar, TouchableOpacity, TextInput, Platform, ToastAndroid } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import { changeLeavesDuration, getLeaves, filterLeaves } from '../../redux/features/supabaseSlice';
import { changeLoading } from '../../redux/features/loadingSlice';
import SelectCalendar from '../../components/calendar/SelectCalendar';
import ApplyLeaveButton from '../../components/buttons/ApplyLeaveButton';
import { getDateDifference } from '../../components/helperFunctions/getDateDifference';
import { MaterialIcons } from '@expo/vector-icons';
import SingleFilter from '../../components/filter/SingleFilter';

const FilterLeavesScreen = () => {

    const navigation = useNavigation()
    const dispatch = useDispatch()

    const isLoading = useSelector(state => state.loading.value)

    const [startingDate, setStartingDate] = useState('')
    const [endingDate, setEndingDate] = useState('')

    const [isAllSelected, setIsAllSelected] = useState(false)
    const [isCurrentMonthSelected, setIsCurrentMonthSelected] = useState(false)
    const [isLastMonthSelected, setIsLastMonthSelected] = useState(false)
    const [isLastSixMonthSelected, setIsLastSixMonthSelected] = useState(false)
    const [isLastOneYearSelected, setIsLastOneYearSelected] = useState(false)
    const [isCustomSelected, setIsCustomSelected] = useState(false)
    const [isStartingDateSelected, setIsStartingDateSelected] = useState(false)
    const [isEndingDateSelected, setIsEndingDateSelected] = useState(false)
    

    const filterMethod = [
        'all',
        'currentMonth',
        'lastMonth',
        'lastSixMonth',
        'lastOneYear',
        'startingDate',
        'endingDate',
        'custom'
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

    const lastDay = [
        '31', '28', '31', '30', '31', '30', '31', '31', '30', '31', '30', '31'
    ]

    const handlePress = () => {
        var startdate = ''
        var enddate = ''
        var leaveDuration = ''

        if(isAllSelected)
        {
            dispatch(changeLoading(true))
            dispatch(getLeaves())
            .then(() => {
                dispatch(changeLeavesDuration('All leaves'))
                dispatch(changeLoading(false))
                navigation.goBack()
            })
            .catch(() => {
                dispatch(changeLoading(false))
                Platform.OS === 'ios'
                ? alert('Cannot filter leaves at the moment')
                : ToastAndroid.show('Cannot filter leaves at the moment', ToastAndroid.LONG)
                navigation.goBack()
            })
        }
        else if(isCurrentMonthSelected)
        {
            leaveDuration = 'Current Month'
            enddate = new Date().toISOString().replace(/T.*/,'').split('-').join('-')
            startdate = enddate.slice(0, 8)+'01'
            var d=lastDay[startdate.slice(5, 7)-1]
            enddate = enddate.slice(0,8)+d

        }
        else if(isLastMonthSelected)
        {
            leaveDuration = 'Last Month'
            const today = new Date().toISOString().replace(/T.*/,'').split('-').join('-')
            const dd = today.slice(8, 10)
            const mm = today.slice(5, 7)
            const yy = today.slice(0, 4)

            var d='01'
            var m=mm
            var y=yy
            if(mm === '01')
            {
                m = '12'
                y = y-1
            }
            else
            {
                m = m-1
                if(m < 10)
                {
                    m = '0'+m
                }
            }
            startdate = `${y}-${m}-${d}`
            var d=lastDay[mm]
            enddate = startdate.slice(0,8)+d
        }
        else if(isLastSixMonthSelected)
        {
            leaveDuration = 'Last 6 Months'
            var ld = new Date().toISOString().replace(/T.*/,'').split('-').join('-')
            var sd = ld.slice(0, 8)+'01'
            const yy = ld.slice(0, 4)
            const mm = ld.slice(5, 7)
            const dd = ld.slice(8, 10)
            var d = '01'
            var y = yy
            var m = mm
            if(mm < 7)
            {
                y -= 1
                m = 12-(6-mm)
            }
            else
            {
                m -= 6
                if(m < 10)
                {
                    m = '0'+m
                }
            }
            startdate = y+'-'+m+'-'+d
            m = mm
            y = yy
            if(mm === '01')
            {
                m = '12'
                y = y-1
            }
            else
            {
                m = m-1
                if(m < 10)
                {
                    m = '0'+m
                }
            }
            d=lastDay[mm]
            enddate = `${y}-${m}-${d}`
        }
        else if(isLastOneYearSelected)
        {
            leaveDuration = 'Last 1 year'
            const today = new Date().toISOString().replace(/T.*/,'').split('-').join('-')
            enddate = today
            var yy = today.slice(0, 4)-1
            var rem = today.slice(4, 10)
            startdate = `${yy}${rem}`
        }
        else if(isStartingDateSelected && isEndingDateSelected)
        {
            startdate = startingDate
            enddate = endingDate
            leaveDuration = 'Custom'
        }
        if(isAllSelected === false)
        {
    
            dispatch(changeLoading(true))
            dispatch(filterLeaves({startdate, enddate}))
            .then(() => {
                dispatch(changeLeavesDuration(leaveDuration))
                dispatch(changeLoading(false))
                navigation.goBack()
            })
            .catch(() => {
                dispatch(changeLoading(false))
                console.log(' -> cannot filter leaves at the moment...')
                Platform.OS === 'ios'
                ? alert('Cannot filter leaves at the moment')
                : ToastAndroid.show('Cannot filter leaves at the moment', ToastAndroid.LONG)
                navigation.goBack()
            })
        }
    }

    const changeStates = (filterMethod) => {
        setIsAllSelected(false)
        setIsCurrentMonthSelected(false)
        setIsLastMonthSelected(false)
        setIsLastSixMonthSelected(false)
        setIsLastOneYearSelected(false)
        setIsStartingDateSelected(false)
        setIsEndingDateSelected(false)
        switch(filterMethod)
        {
            case 'all':
                setIsAllSelected(true)
                break
            case 'currentMonth':
                setIsCurrentMonthSelected(true)
                break
            case 'lastMonth':
                setIsLastMonthSelected(true)
                break
            case 'lastSixMonth':
                setIsLastSixMonthSelected(true)
                break
            case 'lastOneYear':
                setIsLastOneYearSelected(true)
                break
            case 'startingDate':
                setIsStartingDateSelected(true)
                break
            case 'endingDate':
                setIsStartingDateSelected(true)
                setIsEndingDateSelected(true)
                break
        }
    }

    useEffect(() => {
        navigation.setOptions({
            headerShown: false
        })
    })
    
    useEffect(() => {
        if(startingDate)
        {
            if( (new Date(startingDate)).getTime() > (new Date(endingDate)).getTime() )
            {
                setEndingDate('')
            }

        }
    }, [startingDate])
    
    return <View style={styles.container}>
        <TouchableOpacity activeOpacity={0.7} style={styles.backButtonContainer} onPress={() => navigation.goBack()}>
            <MaterialIcons name="keyboard-arrow-left" size={30} color="#4e4e4e" />
        </TouchableOpacity>
        <Text style={styles.headingContainer}>Filter Leaves</Text>
        <Text style={{marginBottom: 30}}>Select an option to filter your leaves ⚡</Text>
        <SingleFilter title={'All'} selected={isAllSelected} handlePress={() => changeStates(filterMethod[0])} />
        <SingleFilter title={'Current Month'} selected={isCurrentMonthSelected} handlePress={() => changeStates(filterMethod[1])} />
        <SingleFilter title={'Last Month'} selected={isLastMonthSelected} handlePress={() => changeStates(filterMethod[2])} />
        <SingleFilter title={'Last 6 Months'} selected={isLastSixMonthSelected} handlePress={() => changeStates(filterMethod[3])} />
        <SingleFilter title={'Last 1 Year'} selected={isLastOneYearSelected} handlePress={() => changeStates(filterMethod[4])} />

        <View style={styles.selectCalendarContainer}>
            <SelectCalendar
                title={'From'}
                setNewDate={date => {
                    setStartingDate(date)
                    changeStates(filterMethod[5])
                }}
                isActive={true}
                date={startingDate}
                isSelected={isStartingDateSelected}
                noLimit={true}
            />
            <View style={{width: 8}} />
            <SelectCalendar
                title={'To'}
                setNewDate={date => {
                    setEndingDate(date)
                    changeStates(filterMethod[6])
                }}
                isActive={startingDate}
                minimumDate={startingDate}
                date={endingDate}
                isSelected={isEndingDateSelected}
            />
        </View>
        
        <ApplyLeaveButton
            text={'Continue'}
            allowed={
                isAllSelected || isCurrentMonthSelected || isLastMonthSelected || isLastSixMonthSelected || isLastOneYearSelected || isCustomSelected || (startingDate && endingDate)
            }
            handlePress={
                isAllSelected || isCurrentMonthSelected || isLastMonthSelected || isLastSixMonthSelected || isLastOneYearSelected || isCustomSelected || (startingDate && endingDate)
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
        marginVertical: 20
    },
    selectCalendarContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
})

export default FilterLeavesScreen ;