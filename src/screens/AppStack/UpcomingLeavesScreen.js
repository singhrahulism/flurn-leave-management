import React, { useEffect } from 'react'
import { Text, View, StyleSheet, StatusBar, Button, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { changeIsSignedIn, getLeaves } from '../../redux/features/supabaseSlice'
import * as SecureStore from 'expo-secure-store'
import { changeLoading, changeChanges } from '../../redux/features/loadingSlice'

import FloatingActionButton from '../../components/buttons/FloatingActionButton'
import SingleLeave from '../../components/leave/SingleLeave'

const UpcomingLeavesScreen = () => {

    const dispatch = useDispatch()
    const isLoading = useSelector(state => state.loading.value)
    const isChanged = useSelector(state => state.loading.changes)
    const leaves = useSelector(state => state.supabase.leaves)

    const getkey = async() => {
        await SecureStore.setItemAsync('access_token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNjY2OTUxNTEwLCJzdWIiOiJhMDY0MmU3OS00YzMxLTRkNTgtYmE2Ny1mMzQ0YmJmMDUzNDQiLCJlbWFpbCI6InJhaHVsQHRlc3QuY29tIiwicGhvbmUiOiIiLCJhcHBfbWV0YWRhdGEiOnsicHJvdmlkZXIiOiJlbWFpbCIsInByb3ZpZGVycyI6WyJlbWFpbCJdfSwidXNlcl9tZXRhZGF0YSI6eyJuYW1lIjoidW5kZWZpbmVkIn0sInJvbGUiOiJhdXRoZW50aWNhdGVkIiwic2Vzc2lvbl9pZCI6ImQ3YjU5OWYzLTc4NzEtNDU3Ni1hZDM4LTQzZjgxNmRiMmQ4NCJ9.AjHNu6AQPKHmkqlpX-v_QbmvVCtetUKJu0Z1JdqCaRc')
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

    // useEffect(() => {
    //     dispatch(getLeaves())
    // }, [])

    useEffect(() => {
        getkey()
    }, [])

    useEffect(() => {
        if(isChanged)
        {
            handleRefresh()
        }
    }, [isChanged])

    console.log(leaves[0])

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
    }
})

export default UpcomingLeavesScreen ;