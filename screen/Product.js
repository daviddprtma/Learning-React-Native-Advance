import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,Button, FlatList,Image } from 'react-native';
import ProductDetail from './ProductDetail';
import { DATA } from '../classes/Resep';
import { ScrollView } from 'react-native-gesture-handler';
export default function Product({navigation}) {
  return (
    <ScrollView>
      <Text>Ini Product</Text>
      <Button
      title='Go to About Page'
      onPress={()=>navigation.navigate("About")}></Button>
      <Button
        title='Product 1' onPress={()=>navigation.navigate("ProductDetail",{id:1})}></Button>
       <Button
        title='Product 2' onPress={()=>navigation.navigate("ProductDetail",{id:2})}></Button>

      <FlatList
      data={DATA}
      renderItem={({ item }) => (
          <View style={styles.vparent2}>
           <Text style={styles.txtNama}>{item.nama}</Text>
           <Image
              style={styles.imgResep}
              source={{uri:item.photo}}
           />
           <Text  style={styles.txtDesk} >{item.desk}</Text>
          </View>
      )}
      />

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtNama:{
    fontSize:20,
    color:"blue"
  },
  txtDesk:{
    marginLeft:15,
    marginRight:15,
    marginBottom:10,
    fontSize:12,
    color:'grey'
  },
  vparent:{
    flex: 1,
    justifyContent: 'center',
  },
  vparent2:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth : 1,
    borderColor: 'grey',
    margin : 10,
    borderRadius:20
  },
  imgResep: {
    width: 300,
    height: 200,
    marginRight:10,
    marginBottom : 10,
  },

});
