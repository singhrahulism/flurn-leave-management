import React, { useState } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, Modal } from 'react-native'
import { FontAwesome } from '@expo/vector-icons';
import { Calendar } from 'react-native-calendars';

const SelectCalendar = ({ title, setNewDate, isActive, minimumDate, date, isSelected, noLimit }) => {

    const today = new Date().toLocaleDateString().slice(0, 10)

    const [showCalendar, setShowCalendar] = useState(false)
    const [selectedDate, setSelectedDate] = useState('')

    const weekDay = [
        'Sun',
        'Mon',
        'Tue',
        'Wed',
        'Thu',
        'Fri',
        'Sat',
    ]

    const setDate = (date) => {
        const d = new Date(date)
        let day = d.getDay()
        const newDate = date+', '+weekDay[day]
        setSelectedDate(newDate)
        setNewDate(date)
    }

    const handlePress = () => {
        setShowCalendar(true)
    }

    // console.log('minimumDate: ', minimumDate)

    return <TouchableOpacity
                activeOpacity={isActive ? 0.6 : 1}
                style={[styles.container, {
                    borderColor: isSelected ? 'rgba(32, 173, 69, 0.8)' : '#cecece',
                    borderWidth: isSelected ? 2.5 : 1
                }]}
                onPress={isActive ? handlePress: null}
            >
        <View style={{flex: 8}}>
            <Text style={[styles.titleContainer, { color: isActive ? (isSelected ? 'rgba(32, 173, 69, 0.8)' : 'black') : '#cecece'}]}>
                {title}
            </Text>
            <Text style={[styles.dateContainer, {color: isActive ? (isSelected ? 'rgba(32, 173, 69, 0.8)' : 'black') : '#cecece'}]}>
                {
                    date === ''
                    ? 'Select date'
                    : date
                }
            </Text>
        </View>
        <View style={{flex: 2, justifyContent: 'flex-end', alignItems: 'center', paddingBottom: 6}}>
            <FontAwesome name="calendar-plus-o" size={20} color={isActive ? 'black' : '#cecece'} />
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
                {
                    noLimit
                    ?
                    <Calendar
                        onDayPress={day => {
                            setDate(day.dateString)
                            setShowCalendar(false)
                        }}
                    />
                    :
                    <Calendar
                        minDate={minimumDate ? minimumDate : today}
                        onDayPress={day => {
                            setDate(day.dateString)
                            setShowCalendar(false)
                        }}
                    />
                }
            </View>
        </Modal>
    </TouchableOpacity>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // marginTop: 20,
        borderWidth: 1,
        borderColor: '#cecece',
        borderRadius: 4,
        paddingTop: 2,
        paddingHorizontal: 6,
        paddingBottom: 4,
        flexDirection: 'row'
    },
    titleContainer: {
        fontSize: 12,
        fontWeight: 'bold'
    },
    dateContainer: {
        marginVertical: 4,
        marginLeft: 1
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

export default SelectCalendar ;