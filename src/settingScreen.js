import React, { Component } from 'react';
import {
    Text,
    View,
    Button,
    StyleSheet,
    TouchableOpacity,
    Alert,
    TextInput,
    Picker,
    AsyncStorage,
    ToastAndroid,
    ScrollView
} from 'react-native';
import Config from './env.json';

import Header from './header';


export default class SettingsScreen extends React.Component {

    constructor() {
        super()
        this.state = {
            SurveyorName: '',
            SurveyorCity: '',
            SurveyorStore: '',
            areas: [],
            stores: []
        }
        this.getSavedData();

    }

    getSavedData = () => {
        AsyncStorage.multiGet(["SurveyorName", "SurveyorCity", "SurveyorStore"]).then(response => {
            //Alert.alert( JSON.parse(response[3][1]) );
            this.setState({
                SurveyorName: response[0][1],
                SurveyorCity: response[1][1],
                SurveyorStore: response[2][1]
            });

            this.getAreasList();
            //this.getStoresList(this.state.SurveyorCity);

        })
    }

    getAreasList = async () => {
        await fetch(Config.API + 'app/areaslist', {
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            }
        }).then((response) => response.json())
            .then((responseJson) => {
                //alert('ok')
                this.setState({ areas: responseJson.areas });
                if (this.state.SurveyorCity == null) {
                    this.setState({ SurveyorCity: responseJson.areas[0].area_id });
                }
                //AsyncStorage.setItem("areas", JSON.stringify(responseJson.areas));
                this.getStoresList(this.state.SurveyorCity)
            })
            .catch((error) => {
                console.error(error)
            });

    }

    getStoresList = (area_id) => {
        fetch(Config.API + 'app/storesList/' + area_id, {
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            }
        }).then((response) => response.json())
            .then((responseJson) => {
                //alert('ok')
                this.setState({
                    stores: responseJson.stores,
                    SurveyorStore: responseJson.stores[0].store_id
                });
                //this.setState({ SurveyorStore: responseJson.stores[0].store_id });
                AsyncStorage.setItem("SurveyorStore", responseJson.stores[0].store_id);
            })
            .catch((error) => {
                console.error(error)
            });
    }

    _onStoreSelect = (store_id, index) => {
        Alert.alert(store_id + " => " + this.state.stores[index].name);
        //this.setState({ SurveyorStore: store_id });
        AsyncStorage.multiSet([
            ["SurveyorStore", store_id],
            ["SurveyorStoreName", this.state.stores[index].name]
        ]);

        ToastAndroid.show(this.state.stores[index].name + ' Store saved!', ToastAndroid.SHORT);
    }

    _onCityselect = (area_id, index) => {
        this.setState({ SurveyorCity: area_id });
        AsyncStorage.multiSet([
            ["SurveyorCity", area_id],
            ["SurveyorCityName", this.state.areas[index].area]
        ]);
        this.getStoresList(area_id);
    }



    onSumbit = () => {
        //Alert.alert(this.state.SurveyorCity);
        // AsyncStorage.setItem("SurveyorStore", 1234)
        // AsyncStorage.getItem("SurveyorStore")
        // .then( response => {
        //     ToastAndroid.show( JSON.stringify(response) , ToastAndroid.SHORT);
        // })
        // return false;
        AsyncStorage.multiGet(["SurveyorName", "SurveyorCity", "SurveyorCityName", "SurveyorStore", "SurveyorStoreName"]).then(response => {


            //let msg = response[0][1] + "=>(" + response[1][1] + ":" + response[2][1] + "):("+response[3][1] + ":" + response[4][1]+")";

            ToastAndroid.show(JSON.stringify(response), ToastAndroid.SHORT);

        })

    }

    render() {
        return (

            <View style={styles.container}>
                <Header />
                <ScrollView>
                    <Text style={styles.pageTitle} >Select Store</Text>

                    <View style={styles.containerWrpr}>


                        <View style={styles.form}>

                            <Text style={styles.label}>Surveyor Name</Text>
                            <TextInput
                                placeholder="Enter Name"
                                style={[styles.formField, styles.input]}
                                onChangeText={SurveyorName => { this.setState({ SurveyorName }); AsyncStorage.setItem("SurveyorName", SurveyorName); }}
                                autoFocus={false}
                                underlineColorAndroid='transparent'
                                value={this.state.SurveyorName}
                            />

                            <Text style={styles.label}> Select City</Text>
                            <View style={styles.formField} >
                                <Picker
                                    selectedValue={this.state.SurveyorCity}
                                    style={styles.picker}
                                    onValueChange={this._onCityselect.bind(this)}
                                    mode='dropdown'>
                                    {this.state.areas.map((item, key) => (
                                        <Picker.Item label={item.area} value={item.area_id} key={key} />)
                                    )}
                                </Picker>
                            </View>

                            <Text style={styles.label}>Select Store</Text>
                            <View style={[styles.formField, { marginBottom: 15 }]} >
                                <Picker
                                    selectedValue={this.state.SurveyorStore}
                                    style={styles.picker}
                                    onValueChange={this._onStoreSelect.bind(this)}
                                    mode='dropdown'
                                >
                                    {this.state.stores.map((item, key) => (
                                        <Picker.Item label={item.name + " " + (item.address != null ? item.address : "")} value={item.store_id} key={key} />)
                                    )}
                                </Picker>
                            </View>
                            <Button style={{ marginTop: 15 }} title="Save & Take Survey" color="#444" onPress={this.onSumbit} />

                        </View>


                    </View>
                </ScrollView>
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