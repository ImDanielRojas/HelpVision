/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React, {Component } from 'react';
 import QRScanner from './components/CodeQR_Animated';
 import textToSpeech from './components/textToSpeech';
 import ComputerVision from './components/ComputerVision';
 import type {Node} from 'react';
 import { createStackNavigator } from '@react-navigation/stack';
 
 import {
   StyleSheet,
   Text,
   View,
   Image,
   TouchableOpacity,
 } from 'react-native';
 import { NavigationContainer } from '@react-navigation/native';

//Library for TextToSpeech
import Tts from 'react-native-tts';

import * as tf from '@tensorflow/tfjs';
import { bundleResourceIO, decodeJpeg } from "@tensorflow/tfjs-react-native";
import yolo from './components/yoloProcessing/index.js';


loadTTSAndModel = async () =>  {

  await Tts.setDefaultLanguage('es-ES');
  Tts.setDefaultPitch(.9);
  Tts.setDefaultRate(0.55);
  //"es-es-x-ana-local"
  //"es-es-x-eed-network"
  Tts.speak("Botón superior para escáner QR");
  Tts.speak("Botón inferior para cámara inteligente");

  // Wait for tf to be ready.
  await tf.setBackend('rn-webgl')
  //await tf.ready();
  Tts.speak("Tensorflow está preparado");


  
  const weightsIDs = await [require('./assets/group1-shard1of9.bin'),
                  require('./assets/group1-shard2of9.bin'),
                  require('./assets/group1-shard3of9.bin'),
                  require('./assets/group1-shard4of9.bin'),
                  require('./assets/group1-shard5of9.bin'),
                  require('./assets/group1-shard6of9.bin'),
                  require('./assets/group1-shard7of9.bin'),
                  require('./assets/group1-shard8of9.bin'),
                  require('./assets/group1-shard9of9.bin'),
                  ];
  // bundle the model files and load the model:
  const modelJSON = await require("./assets/model.json");
  console.log('About to start loading model');
  
  const model = await yolo.v3tiny(
    bundleResourceIO(modelJSON, weightsIDs)
  );
  //loadedModel.summary();
  console.log('Loading finished');
  Tts.speak("Modelo está preparado");

  return model
}

model = loadTTSAndModel();
const Stack = createStackNavigator();
 
 const Home = ({navigation})=>{
   return(
     <View style={styles.container}>       
       <View style={styles.buttonsWrapper}>  
          
                    
        <TouchableOpacity onPress={() => navigation.navigate('QR') } style={styles.item1}>
          <Image source={require('./icons/qr-code-3.png')}style={styles.image1}/>
          </TouchableOpacity>
           
 
         <TouchableOpacity onPress={() => navigation.navigate('ComputerVision', model=model) } style={styles.item1}>
          <Image source={require('./icons/focus.png')}style={styles.image2}/>
          </TouchableOpacity>
 
         </View>
       </View>
   
   )
 }
 
 
 function MyStack() {
   return (
     <NavigationContainer >
       <Stack.Navigator>
         <Stack.Screen name="HelpVision" component={Home} />
         <Stack.Screen name="QR" component={QRScanner} /> 
         <Stack.Screen name="TextToSpeech" component={textToSpeech} />  
         <Stack.Screen name="ComputerVision" component={ComputerVision} />  
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
     backgroundColor: '#000000'
   },
   buttonsWrapper:{
     paddingHorizontal: 20,
     paddingVertical: 40
   },
   mainTitle:{
     fontSize:40,
     fontFamily:'Roboto',
     letterSpacing: 5.84,
     paddingHorizontal: 45
   },
   buttonItem:{
   },
   image1:{
    height: 250,
    width:250
  },
  image2:{
   height: 250,
   width:250
 },
   item1:{
     backgroundColor: '#FFFFFF',
     borderRadius: 10,
     height: 280,
     marginTop: 15,
     justifyContent: 'center',
     alignItems: 'center'
 },
   item2:{
     backgroundColor: '#979797',
     borderRadius: 10,
     height: 280,
     marginTop: 15,
     justifyContent: 'center',
     alignItems: 'center'
   },
   textItem1:{
       fontWeight: 'bold',
       fontSize: 50,
       color: '#FFFFFF'
   },
   textItem2:{
     fontWeight: 'bold',
     fontSize: 50,
     color: '#6D6D6D'
 },
 });
 
 export default App;