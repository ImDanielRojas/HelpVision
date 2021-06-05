/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component } from 'react';
import QRScanner from './components/CodeQR';
import textToSpeech from './components/textToSpeech';
import type {Node} from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';


const Stack = createStackNavigator();

const Home = ({navigation})=>{
  return(
    <View style={styles.container}>
      <View style={styles.buttonsWrapper}>
        <View style={styles.buttonItem}>
          
          <TouchableOpacity onPress={() => navigation.navigate('QR') } style={styles.item}>
            <Text style={styles.textItem}> QR </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.item}>
            <Text style={styles.textItem}>CÀMERA</Text>
          </TouchableOpacity>

        </View>
      </View>
    </View>
  )
}


function MyStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="HelpVision" component={Home} />
        <Stack.Screen name="QR" component={QRScanner} />
        <Stack.Screen name="TextToSpeech" component={textToSpeech} />        
      </Stack.Navigator>
    </NavigationContainer>
  );
}


const App: () => Node = () => {

  return (
    MyStack()
  );
};





const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#E1FBFF'
  },
  buttonsWrapper:{
    paddingHorizontal: 20,
  },
  mainTitle:{
    fontSize:40,
    fontFamily:'Roboto',
    letterSpacing: 5.84,
    paddingHorizontal: 45
  },
  buttonItem:{
  },
  item:{
    backgroundColor: '#A9E594',
    borderRadius: 10,
    height: 280,
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center'
},
textItem:{
    fontWeight: 'bold',
    fontSize: 50
},

});

export default App;
