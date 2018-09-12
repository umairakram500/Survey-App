import React from 'react';
import {
    AsyncStorage,
    Text,
    View,
    Button,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    Alert
} from 'react-native';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';

// screens
import Header from './src/header';
import HomeScreen from './src/homescreen';
import SettingsScreen from './src/settingScreen';
import NewSurvey from './src/newSurvery';
import Logout from './src/logout';



export default createBottomTabNavigator(
    {
        Home: HomeScreen,
        Settings: SettingsScreen,
        new: NewSurvey,
        logout: Logout
    },
    {
        navigationOptions: ({ navigation }) => ({

            tabBarIcon: ({ focused, tintColor }) => {
                const { routeName } = navigation.state;
                let iconName;
                // if (routeName === 'Home') {
                //     iconName = `ios-home${focused ? '' : '-outline'}`;
                // } else if (routeName === 'Settings') {
                //     iconName = `ios-options${focused ? '' : '-outline'}`;
                // }

                switch (routeName) {
                    case 'Home':
                        iconName = `ios-home${focused ? '' : '-outline'}`;
                        break;
                    case 'Settings':
                        iconName = `ios-options${focused ? '' : '-outline'}`;
                        break;

                    case 'new':
                        iconName = `ios-person-add${focused ? '' : '-outline'}`;
                        break;
                    case 'logout':
                        iconName = `ios-power${focused ? '' : '-outline'}`;
                        break;

                }

                // You can return any component that you like here! We usually use an
                // icon component from react-native-vector-icons
                return <Ionicons name={iconName} size={35} color={tintColor} />;
            },
        }),
        tabBarOptions: {
            activeTintColor: '#fff',
            inactiveTintColor: '#fff',
            activeBackgroundColor: '#fba644',
            //inactiveBackgroundColor: '#f8931d',
            showLabel: false,
            labelStyle: {
                fontSize: 14,
            },
            style: {
                backgroundColor: '#f8931d',

                height: 60
            },
            tabStyle: {
                borderRightWidth: 1,
                borderRightColor: '#f9bf7c',
                paddingTop: 10,
                paddingBottom: 10,
            }
        },
        animationEnabled : true
    }
);