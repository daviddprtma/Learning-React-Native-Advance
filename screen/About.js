import { StyleSheet, Text, View, Button, Image, ImageBackground } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

export default function About() {
  return (
    <ScrollView >
    <View style={styles.vparent}>

    <ScrollView horizontal={true} >
        <View style={styles.vparent2}>
      <ImageBackground
          style={styles.imgkucing}
    source={{uri:
          'http://placekitten.com/300/400?image=1'}}
      >
          <Image
          style={styles.missingSign}
          source={require('../assets/missing.png')} />
      </ImageBackground>  

      <ImageBackground
          style={styles.imgkucing}
    source={{uri:
          'http://placekitten.com/300/400?image=2'}}
      >
          <Image
          style={styles.missingSign}
          source={require('../assets/missing.png')} />
      </ImageBackground>  

      <ImageBackground
          style={styles.imgkucing}
    source={{uri:
          'http://placekitten.com/300/400?image=3'}}
      >
          <Image
          style={styles.missingSign}
          source={require('../assets/missing.png')} />
      </ImageBackground>  

      <ImageBackground
          style={styles.imgkucing}
    source={{uri:
          'http://placekitten.com/300/400?image=4'}}
      >
          <Image
          style={styles.missingSign}
          source={require('../assets/missing.png')} />
      </ImageBackground>  
      </View> 
      </ScrollView>

      <ScrollView horizontal={true} >
        <View style={styles.vparent2}>
      <ImageBackground
          style={styles.imgkucing}
    source={{uri:
          'http://placekitten.com/300/400?image=5'}}
      >
          <Image
          style={styles.missingSign}
          source={require('../assets/missing.png')} />
      </ImageBackground>  

      <ImageBackground
          style={styles.imgkucing}
    source={{uri:
          'http://placekitten.com/300/400?image=6'}}
      >
          <Image
          style={styles.missingSign}
          source={require('../assets/missing.png')} />
      </ImageBackground>  

      <ImageBackground
          style={styles.imgkucing}
    source={{uri:
          'http://placekitten.com/300/400?image=7'}}
      >
          <Image
          style={styles.missingSign}
          source={require('../assets/missing.png')} />
      </ImageBackground>  

      <ImageBackground
          style={styles.imgkucing}
    source={{uri:
          'http://placekitten.com/300/400?image=8'}}
      >
          <Image
          style={styles.missingSign}
          source={require('../assets/missing.png')} />
      </ImageBackground>  
      </View> 
      </ScrollView>

   <ImageBackground
      style={styles.imgkucing}
source={{uri:
      'http://placekitten.com/300/400?image=2'}}
   >
      <Image
      style={styles.missingSign}
      source={require('../assets/missing.png')} />
   </ImageBackground>  

   <ImageBackground
      style={styles.imgkucing}
source={{uri:
      'http://placekitten.com/300/400?image=3'}}
   >
      <Image
      style={styles.missingSign}
      source={require('../assets/missing.png')} />
   </ImageBackground>  

   <ImageBackground
      style={styles.imgkucing}
source={{uri:
      'http://placekitten.com/300/400?image=4'}}
   >
      <Image
      style={styles.missingSign}
      source={require('../assets/missing.png')} />
   </ImageBackground>  
   </View> 
  </ScrollView>
  );    
}

const styles = StyleSheet.create({
  vparent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgKucing: {
    width: 300,
    height: 400,
  },
  missingSign:{
    width: 300,
    height: 140
  },
  vparent2:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
});
