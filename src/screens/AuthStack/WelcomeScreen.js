import React from 'react'
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const WelcomeScreen = () => {

    const navigation = useNavigation()

    return <View style={styles.container}>
        <Image
            style={styles.welcomeIllustrationContainer}
            source={require('../../../assets/welcomeIllustration.png')}
        />
        <TouchableOpacity style={styles.continueContainer} activeOpacity={0.85} onPress={() => navigation.navigate('Signup')} >
            <Text style={{fontSize: 16, color: 'white', marginRight: 5}}>Get Started</Text>
            <MaterialIcons name="keyboard-arrow-right" size={20} color="white" />
        </TouchableOpacity>
    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    welcomeIllustrationContainer: {
        height: 250,
        width: 'auto',
        aspectRatio: 1000/666,
        alignSelf: 'center'
    },
    continueContainer: {
        height: 50,
        width: '75%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#20ad45',
        borderRadius: 5,
        flexDirection: 'row'
    }
})

export default WelcomeScreen ;