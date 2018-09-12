import React from 'react';
import {
    ActivityIndicator,
    AsyncStorage,
    StatusBar,
    StyleSheet,
    View,
    Image,
    ImageBackground, 
    Alert
} from 'react-native';
import TimerMixin from 'react-timer-mixin';

export default class AuthLoadingScreen extends React.Component {
    constructor(props) {
        super(props);
        this._bootstrapAsync();
        
    }

    // Fetch the token from storage then navigate to our appropriate place
    _bootstrapAsync = async () => {
        const userToken = await AsyncStorage.getItem('userToken');

        // This will switch to the App screen or Auth screen and this loading
        // screen will be unmounted and thrown away.
        setTimeout(() => {
            this.props.navigation.navigate(userToken ? 'App' : 'Auth');
            //Alert.alert(userToken ? 'App' : 'Auth');
        }, 500)
            
        
    };

    // Render any loading content that you like here
    render() {
        return (
            <View style={styles.container}>
                <View>
                    <Image source={require('./img/logo.png')} style={styles.spLogo} />
                </View>
            </View>
        );
    }
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    spLogo: {
        width: 200,
        height: 200
    }
});