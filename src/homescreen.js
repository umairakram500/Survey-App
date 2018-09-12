import React, { Component } from 'react';
import {
    Text,
    View,
    Button,
    StyleSheet,
    TouchableOpacity,
    Alert,
    AsyncStorage,
    ToastAndroid
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Header from './header';

export default class HomeScreen extends React.Component {

    constructor(){
        super();
        this.state = {
                SurveyorName: '',
                SurveyorCityName : '',
                SurveyorStoreName : ''
            };
        AsyncStorage.multiGet(["SurveyorName", "SurveyorCityName", "SurveyorStoreName"]).then(response => {
            if(response[0][1] == null || response[1][1] == null || response[2][1] == null ){
                this.goToNew('Settings');
            }
            
            this.setState({
                SurveyorName: response[0][1],
                SurveyorCityName : response[1][1],
                SurveyorStoreName : response[2][1]
            })

        });
        //ToastAndroid.show('Home page!', ToastAndroid.SHORT);
    }

    render() {
        return (

            <View style={styles.container}>
                <Header />
                <Text style={styles.pageTitle} >Survey Store Details</Text>

                <View style={styles.containerWrpr}>
                    <View style={styles.row} >
                        <View style={styles.rowIcon}>
                            <Ionicons name='ios-person' size={80} color='#ccc' />
                        </View>
                        <View style={styles.text} >
                            <Text style={styles.title} >Surveryer Name</Text>
                            <Text style={styles.name} >{this.state.SurveyorName}</Text>
                        </View>
                    </View>

                    <View style={styles.row} >
                        <View style={styles.rowIcon}>
                            <Ionicons name='ios-pin' size={70} color='#ccc' />
                        </View>

                        <View style={styles.text} >
                            <Text style={styles.title} >Area Name</Text>
                            <Text style={styles.name} >{this.state.SurveyorCityName}</Text>
                        </View>
                    </View>

                    <View style={styles.row}>
                        <View style={styles.rowIcon}>
                            <Ionicons name='ios-basket' size={60} color='#ccc' />
                        </View>
                        <View style={styles.text} >
                            <Text style={styles.title} >Store Name</Text>
                            <Text style={styles.name} >{this.state.SurveyorStoreName}</Text>
                        </View>

                        <View style={{
                            width: 60, height: 90, justifyContent: 'center', alignItems: 'center', position: 'absolute', right: 0
                        }}>
                            <TouchableOpacity onPress={() => this.goToNew('Settings')}>
                                <Ionicons name='ios-build' size={30} color='#444' />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <TouchableOpacity onPress={() => this.goToNew('new')} >
                        <View
                            style={[styles.row, {backgroundColor:'#ddd', elevation: 0}]} >
                            <View style={{
                                width: 60, height: 70, justifyContent: 'center', alignItems: 'center'
                            }}>
                                <Ionicons name='ios-add-circle' size={50} color='#444' />
                            </View>
                            <View style={{ paddingLeft: 10 }} >
                                <Text style={{ fontSize: 20, color: '#444', marginTop: 20 }} >Take New Survey</Text>
                            </View>
                            <View style={{
                                width: 60, height: 70, justifyContent: 'center', alignItems: 'center', position: 'absolute', right: 0
                            }}>
                                <Ionicons name='ios-arrow-forward' size={30} color='#444' />
                            </View>
                        </View>
                    </TouchableOpacity>

                </View>
            </View>
        );
    }

    goToNew = (goto) => {
        //Alert.alert(goto);
        this.props.navigation.navigate(goto);
    };

}


const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    containerWrpr: {
        flex: 1, 
        padding: 15
    },
    row: {
        flexDirection: 'row', 
        backgroundColor: '#fff', 
        borderRadius: 5, 
        paddingLeft: 20, 
        elevation: 5, 
        marginBottom: 15 
    },
    rowIcon: {
        width: 60, 
        height: 90, 
        justifyContent: 'center', 
        alignItems: 'center'
    },
    text: { paddingLeft: 10 },
    title: {
        fontSize: 18, 
        color: '#444', 
        marginTop: 20 
    },
    name: { fontSize: 16 },
    pageTitle: {
        fontSize: 18,
        color: '#444',
        padding: 10,
        borderColor: '#ccc',
        //borderBottomWidth: 1,
        backgroundColor: '#f5f4f4',
        elevation: 5
    },

});