import React from 'react';
import {
    AsyncStorage,
    StyleSheet,
    View,
    Text,
    ToastAndroid
} from 'react-native';


export default class Logout extends React.Component {
    constructor() {
        super();
        this._signOutAsync();
    }

    _signOutAsync = async () => {
        await AsyncStorage.clear();
        ToastAndroid.show('You are logout successfully.', ToastAndroid.LONG);
        this.props.navigation.navigate('Auth');
        
    };

    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Logout!</Text>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
});