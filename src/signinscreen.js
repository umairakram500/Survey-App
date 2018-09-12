import React from 'react';
import {
    AsyncStorage,
    StyleSheet,
    View,
    Button,
    TextInput,
    TouchableOpacity,
    Text,
    Image,
    ToastAndroid,
    Alert,
    Keyboard,
    ActivityIndicator
} from 'react-native';
import Config from './env.json';


export default class SignInScreen extends React.Component {
    static navigationOptions = {
        title: 'Please sign in',
    };

    constructor() {
        super()
        this.state = {
            username: '',
            userPassword: '',
            loading: false
        }

    }

    render() {
        return (
            <View style={styles.container}>

                <Image source={require('./img/logo.png')} style={styles.spLogo} />
                <TextInput
                    placeholder="User Name"
                    style={styles.input}
                    onChangeText={username => this.setState({ username })}
                    autoFocus={false}
                    underlineColorAndroid='#ccc'
                    inlineImageLeft='./img/338473-200.png'
                />
                <TextInput
                    placeholder="Password"
                    secureTextEntry={true}
                    style={styles.input}
                    onChangeText={userPassword => this.setState({ userPassword })}
                    underlineColorAndroid='#ccc'
                />

                <TouchableOpacity
                    onPress={this._signInAsync}
                    style={styles.loginbtn}>
                    <Text style={{ color: 'white' }} >Login</Text>
                </TouchableOpacity>

                {/* <Button title="Sign in!" onPress={this._signInAsync} /> */}
                <View style={styles.footer}>
                    <Text>Powered By <Text style={{ color: '#000' }} >Invictus Solutions Pvt Ltd</Text></Text>
                </View>

                {this.state.loading &&
                    <View style={styles.loading}>
                        <ActivityIndicator size='large' />
                    </View>
                }

            </View>
        );
    }

    _signInAsync = async () => {
        Keyboard.dismiss();
        
        const { username } = this.state;
        const { userPassword } = this.state;

        if (username == '' || userPassword == '') {
            ToastAndroid.show('User Name & Password is required!', ToastAndroid.LONG);
        } else {

            this.setState({ loading: true });
            //Alert.alert(Config.API+Config.LOGIN+username+'/'+userPassword);
            //return false;

            fetch(Config.API + Config.LOGIN + username + '/' + userPassword, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            }).then((response) => response.json())
                .then((responseJson) => {

                    this.setState({ loading: false });
                    
                    if (responseJson.status === false ) {
                        ToastAndroid.show('User Name or Password not valid!', ToastAndroid.LONG);
                    } else {
                        AsyncStorage.setItem('userToken', responseJson.data.username );
                        this.props.navigation.navigate('App');
                        //Alert.alert(JSON.stringify(responseJson));
                    }


                }).catch((error) => {
                    console.error(error);
                });

            //await AsyncStorage.setItem('userToken', 'abc');
            //this.props.navigation.navigate('AuthLoading');
        }


    };
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    loginbtn: {
        backgroundColor: '#f8931d',
        height: 40,
        width: 250,
        // borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 40
    },
    input: {
        height: 40,
        //borderColor: 'gray', 
        //borderWidth: 1,
        //borderRadius: 30,
        width: 250,
        color: '#f8931d',
        fontSize: 14
        //margin: 10,
        //backgroundColor: '#ccc',
        //textAlign: 'center'
    },
    spLogo: {
        width: 150,
        height: 150,
        marginBottom: 40,
    },
    footer: {
        position: 'absolute', left: 0, right: 0, bottom: 0,
        marginBottom: 10,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    searchSection: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    searchIcon: {
        padding: 10,
    },
    input2: {
        flex: 1,
        paddingTop: 10,
        paddingRight: 10,
        paddingBottom: 10,
        paddingLeft: 0,
        backgroundColor: '#fff',
        color: '#424242',
    },
    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        opacity: 0.5,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center'
    }
});
