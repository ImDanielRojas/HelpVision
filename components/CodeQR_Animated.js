/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React, {Component, useEffect } from 'react';
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
   Dimensions,
   Linking
 } from 'react-native';
 
 //Libraries QR Code scanner and Camera
 import QRCodeScanner from 'react-native-qrcode-scanner';
 //import { RNCamera } from 'react-native-camera';
 
import Tts from 'react-native-tts';


//import Icon from "react-native-vector-icons/Ionicons";

//import { Icon, InlineIcon } from '@iconify/react';
//import iosQrScanner from '@iconify-icons/ion/ios-qr-scanner';


//import * as Animatable from "react-native-animatable";

const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;

console.disableYellowBox = true;

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

  makeSlideOutTranslation(translationType, fromValue) {
    return {
      from: {
        [translationType]: SCREEN_WIDTH * -0.18
      },
      to: {
        [translationType]: fromValue
      }
    };
  }

  render() {
    return (
      <QRCodeScanner
        showMarker
        onRead={this.onRead}
        cameraStyle={{ height: SCREEN_HEIGHT }}
        customMarker={
          <View style={styles.rectangleContainer}>
            <View style={styles.topOverlay}>
              <Text style={{ flex: 1, fontSize: 18, padding: 32, color: '#FFF' }}>
              Escanee el código QR para saber{"\n"}la clase del contenedor.
              </Text>
            </View>

            <View style={{ flexDirection: "row" }}>
              <View style={styles.leftAndRightOverlay} />

              <View style={styles.rectangle}>
              </View>

              <View style={styles.leftAndRightOverlay} />
            </View>

            <View style={styles.bottomOverlay} />
          </View>
        }
      />
    );
  }
}

const overlayColor = "rgba(0,0,0,0.5)"; // this gives us a black color with a 50% transparency

const rectDimensions = SCREEN_WIDTH * 0.65; // this is equivalent to 255 from a 393 device width
const rectBorderWidth = SCREEN_WIDTH * 0.005; // this is equivalent to 2 from a 393 device width
const rectBorderColor = "red";

const scanBarWidth = SCREEN_WIDTH * 0.46; // this is equivalent to 180 from a 393 device width
const scanBarHeight = SCREEN_WIDTH * 0.0025; //this is equivalent to 1 from a 393 device width
const scanBarColor = "#22ff00";

const iconScanColor = "blue";

const styles = {
  rectangleContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent"
  },

  rectangle: {
    height: rectDimensions,
    width: rectDimensions,
    borderWidth: rectBorderWidth,
    borderColor: rectBorderColor,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent"
  },

  topOverlay: {
    flex: 1,
    height: SCREEN_WIDTH,
    width: SCREEN_WIDTH,
    backgroundColor: overlayColor,
    justifyContent: "center",
    alignItems: "center"
  },

  bottomOverlay: {
    flex: 1,
    height: SCREEN_WIDTH,
    width: SCREEN_WIDTH,
    backgroundColor: overlayColor,
    paddingBottom: SCREEN_WIDTH * 0.25
  },

  leftAndRightOverlay: {
    height: SCREEN_WIDTH * 0.65,
    width: SCREEN_WIDTH,
    backgroundColor: overlayColor
  },

  scanBar: {
    marginTop:280,
    //justifyContent: 'center', //Centered vertically
    //alignItems: 'center', // Centered horizontally
    width: scanBarWidth,
    height: scanBarHeight,
    backgroundColor: scanBarColor
  }
};

export default QRScanner;