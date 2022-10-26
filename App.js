import { NavigationContainer } from "@react-navigation/native"
import { AppStack, AuthStack } from "./stack"
import { Provider } from "react-redux" 
import store from "./src/redux/store"

const isSignedIn = true

const App = () => {

    return (
    <NavigationContainer>
      { isSignedIn ? <AppStack /> : <AuthStack /> }
    </NavigationContainer>
    )
}

export default () => {
    return (
        <Provider store={store}>
            <App />
        </Provider>
    )
}