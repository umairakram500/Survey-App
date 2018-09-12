import { createSwitchNavigator, createStackNavigator } from 'react-navigation';

import React from 'react';
import {
    ActivityIndicator,
    AsyncStorage,
    StatusBar,
    StyleSheet,
    View,
    Button
} from 'react-native';


import SignInScreen from './src/signinscreen';
import tabs from './App-TabNavigator';
import AuthLoadingScreen from './src/authloading';


export default createSwitchNavigator(
    {
        App: tabs,
        Auth: SignInScreen,
        loading: AuthLoadingScreen
    },
    {
        initialRouteName: 'loading',
    }
);


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    input : {
        width: 200, margin: 10
    }
});
