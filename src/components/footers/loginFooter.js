import React from 'react'
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'

const LoginFooter = () => {

    const navigation = useNavigation()
    const FONTSIZE = 14

    return <View style={styles.container}>
        <View style={{flexDirection: 'row'}}>
            <Text style={{color: '#888888', fontSize: FONTSIZE}}>
                Joined us before?&nbsp;
            </Text>
            <TouchableOpacity
                activeOpacity={0.65}
                onPress={() => navigation.navigate('LoginEmail')}
            >
                <Text style={{color: '#0195f7', fontSize: FONTSIZE}}>Login.</Text>
            </TouchableOpacity>
        </View>
    </View>
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        position: 'absolute',
        alignSelf: 'center',
        bottom: 0,
        justifyContent :'center',
        alignItems: 'center',
        paddingVertical: 15
    }
})

export default LoginFooter ;