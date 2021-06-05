
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


import { RNCamera } from 'react-native-camera';

import Tts from 'react-native-tts';

const tf = require('@tensorflow/tfjs');
import { bundleResourceIO, decodeJpeg } from "@tensorflow/tfjs-react-native";
import yolo from './yoloProcessing/index.js';

import * as FileSystemExpo from 'expo-file-system';
 
 
const SCREEN_HEIGHT = Dimensions.get("window").height;
const SCREEN_WIDTH = Dimensions.get("window").width;


 class ComputerVision extends Component {
  
  constructor() {
    super();
    this.model = model;

    this.contenedorColorToTTS = {'green': 'Contenedor del vidrio', 'yellow': 'Contenedor de los envases', 'brown': 'Contenedor orgánico', 'blue': 'Contenedor del cartón y papel', 'gray': 'Contenedor del resto'}

    Tts.setDefaultLanguage('es-ES');
    Tts.setDefaultPitch(.9);
    Tts.setDefaultRate(0.55);
    Tts.speak("Enfoque a un contenedor");
  }


   __takePicture = async () => {
    console.log('Photo captured. Processing image...')
    const source: any = await this.camera.takePictureAsync();
    const imageTensor = await this.imageToTensor(source); // prepare the image
    
    console.log('Image processed. Predicting class...')
    const predictions = await this.model.predict(imageTensor, {classNames: ['green', 'yellow', 'brown', 'blue', 'gray'],
                                                          numClasses: 5,
                                                          scoreThreshold: .3,
                                                          inputSize: 416}); // send the image to the model
    console.log('Predictions obtained:')
    console.log(predictions)
    if (predictions.length == 0){
      Tts.speak('No se ha encontrado ningún contenedor')
    }else if (predictions.length == 1){
      console.log('Container class: ', predictions[0].class)
      console.log('score confidence: ', predictions[0].score)
      Tts.speak(this.contenedorColorToTTS[predictions[0].class])
    }else if (predictions.length > 1){
      Tts.speak('Se han detectado varios contenedores. Acérquese por favor.')
    }

  }

  imageToTensor = async(source) => {

    
    // transform image data into a tensor
    const imgB64 = await FileSystemExpo.readAsStringAsync(source.uri, {
        encoding: FileSystemExpo.EncodingType.Base64,
    });
    const imgBuffer = tf.util.encodeString(imgB64, 'base64').buffer;
    const raw = new Uint8Array(imgBuffer)  
    const imageTensor = decodeJpeg(raw);

    console.log('Original image shape:', imageTensor.shape)
  
    
    // calculate square center crop area
    const shorterSide = source.width
    const startingHeight = (source.height - shorterSide) / 2;
    const startingWidth = (source.width - shorterSide) / 2;
    const endingHeight = startingHeight + shorterSide;
    const endingWidth = startingWidth + shorterSide;
  
    // slice and resize the image
    const sliced_img = imageTensor.slice(
      [Math.round(startingHeight),Math.round(startingWidth), 0],
      [Math.round(shorterSide), Math.round(shorterSide), 3]
    );
    console.log('Sliced image shape:',sliced_img.shape)
    const resized_img = tf.image.resizeBilinear(sliced_img, [416, 416]);
    console.log('Input image shape:',resized_img.shape)
    
    // add a fourth batch dimension to the tensor
    const expanded_img = resized_img.expandDims(0);
    
    // normalise the rgb values to 0-1
    return expanded_img.toFloat().div(tf.scalar(255));
  }


  
   
   render(){
    //this.componentDidMount()
       
     return (
        <View style={styles.container}>

           <RNCamera
              ref={ref => {
                this.camera = ref;
              }}
              style={{ height: SCREEN_HEIGHT }}
              type={RNCamera.Constants.Type.back}
              
              //flashMode={RNCamera.Constants.FlashMode.on}
           />

          <View style={styles.topOverlay}>
            <Text style={{ flex: 1, fontSize: 18, padding: 32, color: '#000' }}>
                  Enfoque un contenedor y toque la{"\n"}pantalla para saber su clase.
            </Text>
          </View>

          <TouchableOpacity onPress={() => this.__takePicture() } hitSlop={{top: 1000, bottom: 1000, left: 1000, right: 1000}}></TouchableOpacity>
        </View>
     )
   }
 }


 const styles = StyleSheet.create({
  container:{
    flex: 1,
  },
  invisibleButton:{
    flex:1,
    height: 10
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
},

topOverlay: {
  height: 120,
  position: 'absolute',
  top:0,
  width: SCREEN_WIDTH,
  backgroundColor: "rgba(0,0,0,0.8)",
  justifyContent: "center",
  alignItems: "center",
  
}

});
 
 export default ComputerVision;