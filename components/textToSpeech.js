/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React, {Component} from 'react';
 import {
   SafeAreaView,
   Button,
   ScrollView,
   StatusBar,
   StyleSheet,
   Text,
   View,
   Image,
   AppRegistry,
   TouchableOpacity,
   Linking
 } from 'react-native';
 
 //Library for TextToSpeech
 import Tts from 'react-native-tts';
 
 
 class textToSpeech extends Component {

    constructor() {
          super();
          this.qrText=CodeQrText;
          Tts.setDefaultLanguage('es-ES');
          Tts.setDefaultPitch(.9);
          Tts.setDefaultRate(0.55);
          Tts.speak(this.qrText);
          Tts.speak("Botón superior para repetir audio");
          Tts.speak("Botón inferior para menú principal");
          
        }
 
        speak() {
          return(
            Tts.speak(this.qrText)
          )
        }


   render(){
     return (

      <View style={styles.container}>
      <View style={styles.buttonsWrapper}>
        <View style={styles.buttonItem}>
          
          <TouchableOpacity onPress={() => this.speak() } style={styles.item1}>
          <Image source={require('./icons/repeat.png')}style={styles.image1}/>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.props.navigation.reset({
            index: 0,
            routes: [{name: 'HelpVision'}]
          }) } style={styles.item1}>
            <Image source={require('./icons/go-back-arrow.png')}style={styles.image1}/>
          </TouchableOpacity>
        </View>
      </View>
    </View>
     )
   }
 }

 const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#000000'
  },
  buttonsWrapper:{
    paddingHorizontal: 20,
    paddingVertical: 40
  },
  image1:{
    height: 200,
    width: 200
  },
  mainTitle:{
    fontSize:40,
    fontFamily:'Roboto',
    letterSpacing: 5.84,
    paddingHorizontal: 45
  },
  buttonItem:{
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
textItem:{
    fontWeight: 'bold',
    fontSize: 50,
    textAlign: 'center'
},

});

 export default textToSpeech;