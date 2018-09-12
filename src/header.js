import React, { Component } from 'react';
import {
    Text,
    View
} from 'react-native';

export default class Header extends React.Component {
    render() {
        return (
            <View style={{ justifyContent: 'center', alignItems: 'center', padding: 15, backgroundColor: '#f8931d', width: '100%', elevation: 5 }}>
                <Text style={{ color: '#fff', fontSize: 20, fontWeight: '500' }} >Survey App</Text>
            </View>
        );
    }
}