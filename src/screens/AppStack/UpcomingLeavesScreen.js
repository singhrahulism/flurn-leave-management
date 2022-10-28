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
        await SecureStore.setItemAsync('access_token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNjY2OTU1NDMxLCJzdWIiOiJhMDY0MmU3OS00YzMxLTRkNTgtYmE2Ny1mMzQ0YmJmMDUzNDQiLCJlbWFpbCI6InJhaHVsQHRlc3QuY29tIiwicGhvbmUiOiIiLCJhcHBfbWV0YWRhdGEiOnsicHJvdmlkZXIiOiJlbWFpbCIsInByb3ZpZGVycyI6WyJlbWFpbCJdfSwidXNlcl9tZXRhZGF0YSI6eyJuYW1lIjoidW5kZWZpbmVkIn0sInJvbGUiOiJhdXRoZW50aWNhdGVkIiwic2Vzc2lvbl9pZCI6IjNlODdlNTk0LWM5ODEtNDEyMS1iZTE0LTMyZTExNmY3NmU0ZiJ9.oEOC-WRQS5qf2YU2NZ_3vUqKRCGJkWQdZLm_yqLVcjE')
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
            leaves.length === 0 &&
            <Text style={styles.noLeavesContainer}>No upcoming leaves! Yaahooo 🥳</Text>

        }

        <FlatList
            data = {leaves}
            showsVerticalScrollIndicator={false}
            keyExtractor = {leave => leave.id}
            renderItem = {({item}) => {
                return <SingleLeave startingDate={item.start_date} endingDate={item.end_date} reasonForLeave={item.reason} leaveID={item.id} />
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
    }
})

export default UpcomingLeavesScreen ;