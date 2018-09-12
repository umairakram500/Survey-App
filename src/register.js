import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    Button, TextInput
} from 'react-native';

//type Props = {};
export default class Register extends Component {
    constructor(props){
        super(props)
        this.state = {
            userName:'',
            userEmail:'',
            userPassword:''
        }
    }

    userRegister = () => {
        //alert('Ok')
        const {userName} = this.state;
        const {userEmail} = this.state;
        const {userPassword} = this.state;
        fetch('http://192.168.1.110/reactapi/register.php',{
            method: 'post',
            headers:{
                //'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body:JSON.stringify({name:userName, email:userEmail, password:userPassword})
        })
        .then((response) => response.json())
        .then((responseJson) => {
            //alert('ok')
            alert(JSON.stringify(responseJson))
        })
        .catch((error) => {
            console.error(error)
        });

        //alert(JSON.stringify({name:userName, email:userEmail, password:userPassword}))
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput 
                    placeholder="Enter Name"
                    style={styles.input}
                    onChangeText={userName => this.setState({userName})}
                />
                <TextInput 
                    placeholder="Enter Email"
                    style={styles.input}
                    onChangeText={userEmail => this.setState({userEmail})}
                />
                <TextInput 
                    placeholder="Enter Password"
                    style={styles.input}
                    onChangeText={userPassword => this.setState({userPassword})}
                />
                
                <Button title="Signup" 
                color="magenta"
                onPress={this.userRegister}
                />
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
    input : {
        width: 200, margin: 10
    }
});
