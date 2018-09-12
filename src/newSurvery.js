import React, { Component } from 'react';
import {
    Text,
    View,
    Button,
    StyleSheet,
    TouchableOpacity,
    Alert,
    TextInput,
    Picker
} from 'react-native';

import Header from './header';


export default class NewSurvey extends React.Component {

    constructor() {
        super()
        this.state = {
            name: '',
            cnic: '',
            phone: '',
            city: '',
            remarks: '',
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Header />
                <Text style={styles.pageTitle} >Select Store</Text>

                <View style={styles.containerWrpr}>
                    

                    <View style={styles.form}>

                        <Text style={styles.label}>Full Name</Text>
                        <TextInput
                            style={[styles.formField, styles.input]}
                            onChangeText={name => this.setState({ name })}
                            autoFocus={false}
                            underlineColorAndroid='transparent'
                            inlineImageLeft='./img/338473-200.png'
                        />

                        <Text style={styles.label}>CNIC</Text>
                        <TextInput
                            style={[styles.formField, styles.input]}
                            onChangeText={cnic => this.setState({ cnic })}
                            autoFocus={false}
                            underlineColorAndroid='transparent'
                            inlineImageLeft='./img/338473-200.png'
                        />

                        <Text style={styles.label}>Phone</Text>
                        <TextInput
                            style={[styles.formField, styles.input]}
                            onChangeText={phone => this.setState({ phone })}
                            autoFocus={false}
                            underlineColorAndroid='transparent'
                            inlineImageLeft='./img/338473-200.png'
                        />

                        <Text style={styles.label}>City</Text>
                        <View style={[styles.formField, {marginBottom: 15}]} >
                            <Picker
                                selectedValue={this.state.SurveyorStore}
                                style={styles.picker}
                                onValueChange={(itemValue, itemIndex) => this.setState({ city: itemValue })}
                                mode='dropdown'>
                                <Picker.Item label="Java" value="java" />
                                <Picker.Item label="JavaScript" value="js" />
                            </Picker>
                        </View>

                        <Text style={styles.label}>Remarks</Text>
                        <TextInput
                            style={[styles.formField, styles.input]}
                            onChangeText={remarks => this.setState({ remarks })}
                            autoFocus={false}
                            underlineColorAndroid='transparent'
                            inlineImageLeft='./img/338473-200.png'
                        />

                        <Button style={{marginTop: 15}} title="Submit & Next" color="#444"  />

                    </View>

                </View>



            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    containerWrpr: {
        flex: 1, padding: 15
    },
    pageTitle: {
        fontSize: 18,
        color: '#444',
        padding: 10,
        borderColor: '#ccc',
        //borderBottomWidth: 1,
        backgroundColor: '#f5f4f4',
        elevation: 5
    },
    form: {

    },
    input: {
        paddingLeft: 20
    },
    formField: {
        borderWidth: 1,
        borderColor: '#ccc',
        height: 40,
        borderRadius: 5,
        paddingLeft: 10,
        paddingRight: 10
    },
    picker: {
        //height: 40, 
        width: '100%',
        marginTop: -8,

        //borderWidth: 1,
        //borderColor: '#ccc'
    }, 
    label: {
        marginTop: 10,
        marginBottom: 3,
        fontSize: 14,
        fontWeight: '500'
    }
});