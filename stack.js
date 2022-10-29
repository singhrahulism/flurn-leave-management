import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

// AppStack

import HomeScreen from "./src/screens/AppStack/HomeScreen";
import AccountScreen from "./src/screens/AppStack/AccountScreen";
import UpcomingLeavesScreen from "./src/screens/AppStack/UpcomingLeavesScreen";
import CreateLeaveScreen from "./src/screens/AppStack/CreateLeaveScreen";
import EditLeaveScreen from "./src/screens/AppStack/EditLeaveScreen";
import FilterLeavesScreen from "./src/screens/AppStack/FilterLeavesScreen";
import LeavesScreen from "./src/screens/AppStack/LeavesScreen";
import ChangePasswordScreen from "./src/screens/AppStack/ChangePassword";

// AuthStack

import SignupScreen from "./src/screens/AuthStack/SignupScreen";
import LoginScreen from "./src/screens/AuthStack/LoginScreen";
import WelcomeScreen from "./src/screens/AuthStack/WelcomeScreen";

const Stack = createNativeStackNavigator()
const Tab = createMaterialBottomTabNavigator()
const LeaveStack = createNativeStackNavigator()
const UserStack = createNativeStackNavigator()

function LeavesStack() {
    return (
        <LeaveStack.Navigator>
            <LeaveStack.Screen name='Leaves' component={LeavesScreen} options={{headerShown: false}} />
            <LeaveStack.Screen name='Home' component={UpcomingLeavesScreen} options={{headerShown: false}} />
            <LeaveStack.Screen name='CreateLeave' component={CreateLeaveScreen} options={{headerShadowVisible: false}} />
            <LeaveStack.Screen name='EditLeave' component={EditLeaveScreen} options={{headerShadowVisible: false}} />
            <LeaveStack.Screen name='FilterLeaves' component={FilterLeavesScreen} options={{headerShadowVisible: false}} />
        </LeaveStack.Navigator>
    )
}

function AccountStack() {
    return (
        <UserStack.Navigator>
            <UserStack.Screen name='Account' component={AccountScreen} options={{headerShown: false}} />
            <UserStack.Screen name='ChangePassword' component={ChangePasswordScreen} options={{headerShown: false}} />
        </UserStack.Navigator>
    )
}

export const AppStack = () => {
    return (
        <Tab.Navigator
            barStyle={{ backgroundColor: '#20ad45' }}
            shifting={true}
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused }) => {
                let iconName;
                if (route.name === 'UpcomingLeaves' || route.name == 'UpcomingLeave1') {
                    iconName = focused ? 'clockcircle' : 'clockcircleo'
                } else if (route.name === 'PastLeaves') {
                    iconName = focused ? 'user-circle' : 'user-circle-o'
                }
                if(iconName === 'user-circle' || iconName === 'user-circle-o')
                {
                    return <FontAwesome name={iconName} size={22} color="white" />
                }
                else
                {
                    return <AntDesign name={iconName} size={22} color="white" />
                }
                },
            })}
        >
            <Tab.Screen
                name="UpcomingLeaves"
                component={LeavesStack}
                options={{
                    tabBarLabel: 'Leaves'
                }}
            />
            <Tab.Screen
                name="PastLeaves"
                component={AccountStack}
                options={{
                    tabBarLabel: 'Account'
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