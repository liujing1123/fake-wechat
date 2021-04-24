/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import * as React from 'react';
import { View, Button, Text, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// import 'react-native-gesture-handler'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from './src/screen/HomeScreen'
import AdressBookScreen from './src/screen/AdressBookScreen'
import FindScreen from './src/screen/FindScreen'
import MyScreen from './src/screen/Myscreen'
import DetailScreen from './src/screen/DetailScreen'
import FunctionScreen from './src/screen/FunctionScreen'

import BarIcon from './components/BarIcon'
import CommonIcon from './components/CommonIcon'
import Orientation from 'react-native-orientation';

const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();
function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerTitle: '微信',
          // headerTransparent: true,
          headerTitleStyle: { fontSize: 18 },
          headerStyle: { height: 50, backgroundColor: "#EDEDED" },
          headerRight: () => {
            return (
              <View style={{ display: 'flex', flexDirection: 'row', flex: 1, justifyContent: 'space-around', alignItems: 'center' }}>
                <CommonIcon
                  name='icon-search' size={20} color='#000'
                />
                <View style={{ width: 15 }}></View>
                <CommonIcon
                  name='icon-add' size={20} color='#000'
                />
                <View style={{ width: 10 }}></View>
              </View>
            )
          }
        }}
      />
      <HomeStack.Screen
        name="detail"
        component={DetailScreen}
        options={(navigation)=>({
          headerTitle:navigation.route&& navigation.route.params?navigation.route.params.item.name:'',
          // headerTransparent: true,
          headerTitleStyle: { fontSize: 18 },
          headerStyle: { height: 50, backgroundColor: "#EDEDED" },
          headerRight: () => {
            return (
              <View style={{ display: 'flex', flexDirection: 'row', flex: 1, justifyContent: 'space-around', alignItems: 'center' }}>
                <CommonIcon
                  name='icon-ellipses' size={20} color='#000000'
                />
                <View style={{ width: 10 }}></View>
              </View>
            )
          }
        })}
      />
    </HomeStack.Navigator>
  );
}

const AdressBookStack = createStackNavigator();
function AdressBookStackScreen() {
  return (
    <AdressBookStack.Navigator>
      <AdressBookStack.Screen
        name="AdressBook"
        component={AdressBookScreen}
        options={{
          headerTitle:'通讯录',
          // headerTransparent: true,
          headerTitleStyle: { fontSize: 18 },
          headerStyle: { height: 50, backgroundColor: "#EEEEEE" },
          headerRight: () => {
            return (
              <View style={{ display: 'flex', flexDirection: 'row', flex: 1, justifyContent: 'space-around', alignItems: 'center' }}>
                <CommonIcon
                  name='icon-search' size={20} color='#000'
                />
                <View style={{ width: 15 }}></View>
                <CommonIcon
                  name='icon-add' size={20} color='#000'
                />
                <View style={{ width: 10 }}></View>
              </View>
            )
          }
        }} />
      <AdressBookStack.Screen
         name="function"
         component={FunctionScreen}
         options={(navigation)=>({
           headerTitle:navigation.route&& navigation.route.params?navigation.route.params.item.funName:'',
           // headerTransparent: true,
           headerTitleStyle: { fontSize: 18 },
           headerStyle: { height: 50, backgroundColor: "#EDEDED" },
         })} 
         />
    </AdressBookStack.Navigator>
  );
}

const FindStack = createStackNavigator();
function FindStackScreen() {
  return (
    <FindStack.Navigator>
      <FindStack.Screen
        name="Find"
        component={FindScreen}
        options={{
          headerTitle:'发现',
          // headerTransparent: true,
          headerTitleStyle: { fontSize: 18 },
          headerStyle: { height: 50, backgroundColor: "#EEEEEE" },
          headerRight: () => {
            return (
              <View style={{ display: 'flex', flexDirection: 'row', flex: 1, justifyContent: 'space-around', alignItems: 'center' }}>
                <CommonIcon
                  name='icon-search' size={20} color='#000'
                />
                <View style={{ width: 15 }}></View>
                <CommonIcon
                  name='icon-add' size={20} color='#000'
                />
                <View style={{ width: 10 }}></View>
              </View>
            )
          },
        }}
      />
    </FindStack.Navigator>
  );
}


function checkTabVisible(navigation, visibleRouteName) {
  if(navigation.route&&navigation.route.state){
    const routeName = navigation.route.state.routeNames[navigation.route.state.index];
    let tabBarVisible = true;
    if (routeName !== visibleRouteName) {
      tabBarVisible = false;
    }
    return tabBarVisible;
  }
}


export default function App() {
  
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarLabel: route.name === 'Home' ? '微信' : route.name === 'AdressBook' ? '通讯录' : route.name === 'Find' ? '发现' : '我',
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Home') {
              iconName = focused ? 'icon-tab-message-active' : 'icon-tab-message';
            } else if (route.name === 'AdressBook') {
              iconName = focused ? 'icon-tab-address-book-active' : 'icon-tab-address-book';
            } else if (route.name === 'Find') {
              iconName = focused
                ? 'icon-tab-find-active'
                : 'icon-tab-find';
            } else if (route.name === 'My') {
              iconName = focused
                ? 'icon-tab-my-active'
                : 'icon-tab-my';
            }
            // You can return any component that you like here!
            return <BarIcon name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: '#48BD59',
          inactiveTintColor: '#000000',
        }}
      >
        <Tab.Screen
          name="Home"
          options={(navigation) => ({
            tabBarVisible: checkTabVisible(navigation, "Home"),
          })}
          component={HomeStackScreen} />
        <Tab.Screen name="AdressBook"
        options={(navigation) => ({
          tabBarVisible: checkTabVisible(navigation, "AdressBook"),
        })}
        component={AdressBookStackScreen} />
        <Tab.Screen name="Find" component={FindStackScreen} />
        <Tab.Screen name="My" component={MyScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}