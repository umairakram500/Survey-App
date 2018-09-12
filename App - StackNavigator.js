import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    TextInput,
    Button
  } from 'react-native';

import { createStackNavigator } from 'react-navigation';

import Register from "./src/register";
import Login from "./src/login";
import Profile from "./src/profile";

const RootStack = createStackNavigator(
  {
    register: Register,
    login: Login,
    profile : Profile
  },
  {
    initialRouteName: 'profile',
  }
);

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}