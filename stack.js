import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "./src/screens/AppStack/HomeScreen";
import SignupScreen from "./src/screens/AuthStack/SignupScreen";
import LoginScreen from "./src/screens/AuthStack/LoginScreen";
import WelcomeScreen from "./src/screens/AuthStack/WelcomeScreen";

const Stack = createNativeStackNavigator()

export const AppStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} options={{headerShown: false, animation: 'none'}} />
        </Stack.Navigator>
    )
}

export const AuthStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Welcome" component={WelcomeScreen} options={{headerShown: false, animation: 'none'}} />
            <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false, animation: 'none'}} />
            <Stack.Screen name="Signup" component={SignupScreen} options={{headerShown: false, animation: 'none'}} />
        </Stack.Navigator>
    )
}