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
 
 class SomeComponent extends Component{
 
   constructor(props) {
     super(props);
     this.state = {
       myText: 'xcvvcvvccv!',
       gestureName: 'none',
       backgroundColor: '#fff'
     };
   }
  
   onSwipeUp(gestureState) {
     this.setState({myText: 'QR: You swiped up!'});
   }
  
   onSwipeDown(gestureState) {
     this.setState({myText: 'CAM: You swiped down!'});
   }
  
   onSwipeLeft(gestureState) {
     this.setState({myText: 'BACK: You swiped left!'});
   }
  
   onSwipeRight(gestureState) {
     this.setState({myText: 'REPEAT AUDIO: You swiped right!'});
   }
  
   onSwipe(gestureName, gestureState) {
     const {SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT} = swipeDirections;
     this.setState({gestureName: gestureName});
     switch (gestureName) {
       case SWIPE_UP:
         this.setState({backgroundColor: 'red'});
         break;
       case SWIPE_DOWN:
         this.setState({backgroundColor: 'green'});
         break;
       case SWIPE_LEFT:
         this.setState({backgroundColor: 'blue'});
         break;
       case SWIPE_RIGHT:
         this.setState({backgroundColor: 'yellow'});
         break;
     }
   }
  
   render() {
  
     const config = {
       velocityThreshold: 0.3,
       directionalOffsetThreshold: 50
     };
  
     return (
       <GestureRecognizer
         onSwipe={(direction, state) => this.onSwipe(direction, state)}
         onSwipeUp={(state) => this.onSwipeUp(state)}
         onSwipeDown={(state) => this.onSwipeDown(state)}
         onSwipeLeft={(state) => this.onSwipeLeft(state)}
         onSwipeRight={(state) => this.onSwipeRight(state)}
         config={config}
         style={{
           flex: 1,
           backgroundColor: this.state.backgroundColor
         }}
         >
         <Text>{this.state.myText}</Text>
         <Text>onSwipe callback received gesture: {this.state.gestureName}</Text>
       </GestureRecognizer>
     );
   }
 }
 
 
 
 
 const Stack = createStackNavigator();
 
 const Home = ({navigation})=>{  
   return(    
     <SomeComponent></SomeComponent>
   )
 }
 
 
 
 function MyStack() {
   
   return (
     <SomeComponent></SomeComponent>
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
 