import React from 'react';
import {Button, View,Text} from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {Profile} from '../components/Profile';
import { createStackNavigator } from '@react-navigation/stack';
import {BookScreen} from './BookScreen';
import {BookListScreen} from './BookListScreen';
import {CartScreen} from './CartScreen';
import {OrderScreen} from './OrderScreen';
import { SafeAreaProvider} from 'react-native-safe-area-context';
const Stack = createStackNavigator();
function BookList({navigation}) {
  return <BookListScreen navigation={navigation} />;
}

function MyCartScreen({ navigation }) {
  return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>My Cart</Text>
        </View>
    );
}

function MyProfileScreen({navigation}) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Profile navigation={navigation}/>
        </View>
    );
}

const Drawer = createDrawerNavigator();
export function HomeScreen(){
    return (
            <Drawer.Navigator initialRouteName="Home">
                <Drawer.Screen name="Books" component={BookList} />
                <Drawer.Screen name="MyCart" component={CartScreen} />
                <Drawer.Screen name="MyOrder" component={OrderScreen} />
                <Drawer.Screen name="MyProfile" component={MyProfileScreen} />
            </Drawer.Navigator>
    );
}