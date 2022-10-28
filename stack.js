import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { AntDesign } from '@expo/vector-icons';

// AppStack

import HomeScreen from "./src/screens/AppStack/HomeScreen";
import PastLeavesScreen from "./src/screens/AppStack/PastLeavesScreen";
import UpcomingLeavesScreen from "./src/screens/AppStack/UpcomingLeavesScreen";
import CreateLeaveScreen from "./src/screens/AppStack/CreateLeaveScreen";
import EditLeaveScreen from "./src/screens/AppStack/EditLeaveScreen";


// AuthStack

import SignupScreen from "./src/screens/AuthStack/SignupScreen";
import LoginScreen from "./src/screens/AuthStack/LoginScreen";
import WelcomeScreen from "./src/screens/AuthStack/WelcomeScreen";

const Stack = createNativeStackNavigator()
const Tab = createMaterialBottomTabNavigator()
const UpcomingStack = createNativeStackNavigator()

function UpcomingLeavesStack() {
    return (
        <UpcomingStack.Navigator>
            <UpcomingStack.Screen name='Home' component={UpcomingLeavesScreen} options={{headerShown: false}} />
            <UpcomingStack.Screen name='CreateLeave' component={CreateLeaveScreen} options={{headerShadowVisible: false}} />
            <UpcomingStack.Screen name='EditLeave' component={EditLeaveScreen} options={{headerShadowVisible: false}} />
        </UpcomingStack.Navigator>
    )
}


export const AppStack = () => {
    return (
        <Tab.Navigator
            barStyle={{ backgroundColor: '#20ad45' }}
            shifting={true}
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                let iconName;
                if (route.name === 'UpcomingLeaves') {
                    iconName = focused ? 'clockcircle' : 'clockcircleo'
                } else if (route.name === 'PastLeaves') {
                    iconName = focused ? 'checkcircle' : 'checkcircleo'
                }
                return <AntDesign name={iconName} size={22} color="white" />
                },
            })}
        >
            <Tab.Screen
                name="UpcomingLeaves"
                component={UpcomingLeavesStack}
                options={{
                    tabBarLabel: 'Upcoming Leaves'
                }}
            />
            <Tab.Screen
                name="PastLeaves"
                component={PastLeavesScreen}
                options={{
                    tabBarLabel: 'Past Leaves'
                }}
                />
        </Tab.Navigator>
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