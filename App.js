import React, { Component, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, NativeModules } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './screen/Home';
import About from './screen/About';
import Product from './screen/Product';
import ProductDetail from './screen/ProductDetail';
import Setting from './screen/Setting';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createDrawerNavigator, DrawerContentScrollView,DrawerItem,DrawerItemList } from '@react-navigation/drawer';
import AddProduct from './screen/AddProduct';
import Books from './screen/Books';
import AddBooks from './screen/AddBooks';
import Quiz from './screen/Quiz';
import Login from './screen/Login';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PopularMovie from './screen/PopularMovie';
import PopularActor from './screen/PopularActor';
import DetailMovie from './screen/DetailMovie';
import DetailPopularActor from './screen/DetailPopularActor';
const Drawer = createDrawerNavigator();


const Stack = createNativeStackNavigator();
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

const cekLogin = async () => {
  try {
    const value = await AsyncStorage.getItem('username')
    // alert(value);
    global.activeuser = value;
    if (value !== null) {
      return true;
    }
  } catch (e) {
    // error reading value
  }
}


const doLogout = async () => {
  try{
    await AsyncStorage.removeItem('username');
    alert('Logout Success');
    NativeModules.DevSettings.reload(); 
  }
  catch(e){
  }
}
function CustomDrawerContent(props){ 
  return(
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem label={()=> <Text>Logout</Text>} onPress={()=>doLogout()}/>
      </DrawerContentScrollView>
  )
}


function NavMovie() {
  return(
    <Stack.Navigator>
      <Stack.Screen name='PopularMovie' component={PopularMovie} options={{headerShown: false}}/>
      <Stack.Screen name='DetailMovie' component={DetailMovie}/>
    </Stack.Navigator>
  );
}

function NavActor() {
  return(
    <Stack.Navigator>
      <Stack.Screen name='PopularActor' component={PopularActor} options={{headerShown: false}}/>
      <Stack.Screen name='DetailPopularActor' component={DetailPopularActor}/>
    </Stack.Navigator>
  );
} 

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      islogin: false
    }

    cekLogin().then((item) => {
      if(item !=null){
        this.setState(
          this.state = {
            islogin: true
          }
        )
      }
    })
  }
 
  render(){
    if(!this.state.islogin)
    {
      return(
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name='Login' component={Login} />
          </Stack.Navigator>
        </NavigationContainer>
      )
    }
    else{
  return (
    <NavigationContainer>
      <Drawer.Navigator drawerContent={props=> <CustomDrawerContent {...props}/>}>
        <Drawer.Screen name="Dashboard" component={Nav1} options={{ headerShown: true }}  />
        <Drawer.Screen name="Add Product" component={AddProduct} />
        <Drawer.Screen name="Books" component={Books} />
        <Drawer.Screen name="Add Books" component={AddBooks} />
        <Drawer.Screen name="Setting" component={Setting} />
        <Drawer.Screen name="Quiz" component={Quiz} />
        <Drawer.Screen name='Popular Movie' component={NavMovie}/>
        <Drawer.Screen name='Popular Actor' component={NavActor}/>
      </Drawer.Navigator>
    </NavigationContainer>
  );
    }
  }
}