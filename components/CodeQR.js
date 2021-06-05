/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React, {Component, useEffect, Dimensions } from 'react';
 import {
   SafeAreaView,
   Button,
   ScrollView,
   StatusBar,
   StyleSheet,
   Text,
   View,
   AppRegistry,
   TouchableOpacity,
   Linking
 } from 'react-native';
 
 //Libraries QR Code scanner and Camera
 import QRCodeScanner from 'react-native-qrcode-scanner';
 //import { RNCamera } from 'react-native-camera';
 
 import Tts from 'react-native-tts';
 
 


 class QRScanner extends Component {
  
  constructor() {
    Tts.setDefaultLanguage('es-ES');
    Tts.setDefaultPitch(.9);
    Tts.setDefaultRate(0.55);
    Tts.speak("Escanee el código QR");
    super();
  }

   state ={
     qr: ""
   }
   onRead = e => {

    this.props.navigation.navigate('TextToSpeech', CodeQrText=e.data) 
   }
   
   render(){
     return (
           <QRCodeScanner
              //containerStyle={{width: 1, borderWidth: 1}}
              //cameraStyle={{width: 1, borderWidth: 1}}
              onRead={this.onRead}
              showMarker={true}
              //markerStyle={color='#000'}
              topContent={
                <Text style={styles.centerText}>
                  Escanee el código QR para saber{"\n"}la clase del contenedor.
                </Text>
              }
             //flashMode={RNCamera.Constants.FlashMode.torch}
           />
     )
   }
 }


 const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#E1FBFF'
  },
  buttonsWrapper:{
    paddingTop: 30,
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
preview: {
  flex: 1,
  justifyContent: 'flex-end',
  alignItems: 'center',
},
centerText: {
  flex: 1,
  fontSize: 18,
  padding: 32,
  color: '#000'
},
textBold: {
  fontSize: 20,
  fontWeight: '500',
  color: '#000'
}

});
 
 export default QRScanner;