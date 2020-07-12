import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {LoginScreen} from "./screens/LoginScreen";
import {HomeScreen} from "./screens/HomeScreen";
import {BookScreen} from "./screens/BookScreen";
const Stack = createStackNavigator();
export default function App() {
    return(
        <NavigationContainer>
            <Stack.Navigator initialRouteName={"login"}>
                <Stack.Screen name={"login"} component={LoginScreen}/>
                <Stack.Screen name={"home"} component={HomeScreen}/>
                <Stack.Screen name={"book"} component={BookScreen}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}