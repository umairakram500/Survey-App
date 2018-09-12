import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Button, TextInput,
    Image
} from 'react-native';
import { createDrawerNavigator } from 'react-navigation';


class MyHomeScreen extends React.Component {
    static navigationOptions = {
        drawerLabel: 'Home',
        drawerIcon: ({ tintColor }) => (
            <Image
                source={require('./src/img/Line-Chart-icon.png')}
                style={styles.icon}
            />
        ),
    };

    render() {
        return (
            <View>
                <Button
                    onPress={() => this.props.navigation.navigate('Notifications')}
                    title="Go to notifications"
                />
                <Button
                    onPress={() => this.props.navigation.openDrawer()}
                    title="Open Drawer"
                />
            </View>
        );
    }
}

class MyNotificationsScreen extends React.Component {
    static navigationOptions = {
        drawerLabel: 'Notifications',
        drawerIcon: ({ tintColor }) => (

            <Image
                source={require('./src/img/338473-200.png')}
                style={styles.icon}
            />

        ),
    };

    render() {
        return (
            <View>
                <Button
                    onPress={() => this.props.navigation.goBack()}
                    title="Go back home"
                />
                <Button
                    onPress={() => this.props.navigation.openDrawer()}
                    title="Open Drawer"
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    icon: {
        width: 24,
        height: 24,
    },
});

const MyApp = createDrawerNavigator(
    {
        Home: {
            screen: MyHomeScreen,
        },
        Notifications: {
            screen: MyNotificationsScreen,
        },
    },
    {
        initialRouteName: 'Home'
    }
);

export default MyApp