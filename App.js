import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './screen/Home';
import About from "./screen/about";
import Product from './screen/Product';
import ProductDetail from './screen/ProductDetail';
import Setting from './screen/Setting';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createDrawerNavigator } from '@react-navigation/drawer';
import AddProduct from './screen/AddProduct';
import Books from './screen/Books';
import AddBooks from './screen/AddBooks';
const Drawer = createDrawerNavigator();


const Stack = createNativeStackNavigator();

export default function App() {
  function Nav2() {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Product List" component={Product} />
        <Stack.Screen name="ProductDetail" component={ProductDetail} />
      </Stack.Navigator>
    );
  }
  function Nav1() {
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused }) => {
            var iconName;
            if (route.name == 'Home') {
              iconName = 'home';
              var iconColor = (focused) ? 'blue' : 'gray';
            }
            if (route.name == 'About') {
              iconName = 'cube';
              var iconColor = (focused) ? 'blue' : 'gray';
            }
            if (route.name == 'Product') {
              iconName = 'cart';
              var iconColor = (focused) ? 'blue' : 'gray';
            }
            return <Ionicons name={iconName} size={30} color={iconColor} />;
          },
          tabBarActiveTintColor: 'blue',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Home" component={Home}  options={{ headerShown: false }}/>
        <Tab.Screen name="About" component={About} />
        <Tab.Screen name="Product" component={Nav2} options={{ headerShown: false }} />
      </Tab.Navigator>
    )
  }
  
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Dashboard" component={Nav1} options={{ headerShown: true }}  />
        <Drawer.Screen name="Add Product" component={AddProduct} />
        <Drawer.Screen name="Books" component={Books} />
        <Drawer.Screen name="Add Books" component={AddBooks} />
        <Drawer.Screen name="Setting" component={Setting} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}