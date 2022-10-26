import { NavigationContainer } from "@react-navigation/native"
import { AppStack, AuthStack } from "./stack"

const isSignedIn = false

const App = () => {

    return (
    <NavigationContainer>
      { isSignedIn ? <AppStack /> : <AuthStack /> }
    </NavigationContainer>
    )
}

export default () => {
    return (
        <App />
    )
}