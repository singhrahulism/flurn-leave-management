import React, { useEffect } from 'react'
import { Text, View, StyleSheet, StatusBar, Button, FlatList } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { getLeaves } from '../../redux/features/supabaseSlice'

import FloatingActionButton from '../../components/buttons/FloatingActionButton'
import SingleLeave from '../../components/leave/SingleLeave'

const UpcomingLeavesScreen = () => {

    const dispatch = useDispatch()
    const leaves = useSelector(state => state.supabase.leaves)

    useEffect(() => {
        console.log('leaves changed...')
    }, [leaves])

    useEffect(() => {
        dispatch(getLeaves())
    }, [])

    console.log(leaves[0])

    return <View style={styles.container}>
        <Text style={styles.headingContainer}>Upcoming Leaves</Text>

        <FlatList
            data = {leaves}
            keyExtractor = {leave => leave.id}
            renderItem = {({item}) => {
                return <SingleLeave startingDate={item.start_date} endingDate={item.end_date} reasonForLeave={item.reason} />
            }}
        />

        <FloatingActionButton />
    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
        marginTop: 30,
        paddingHorizontal: 20
    },
    headingContainer: {
        fontSize: 25,
        fontWeight: 'bold',
        marginBottom: 25
    }
})

export default UpcomingLeavesScreen ;