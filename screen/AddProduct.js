import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button,Image, Alert } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { DATA } from '../classes/Resep';

export default function AddProduct(props) {
    const [nama, onChangeName] = React.useState("");
    const[desk, onChangeDesk] = React.useState("");
    const [foto, onChangePhoto] = React.useState("");  
    const [url, onSubmitUrl] = React.useState("https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty-300x240.jpg")
  return (
    <View>
        <Text>Nama</Text>
      <TextInput
      style={styles.input}
      onChangeText={onChangeName}
        value={nama}
        placeholder='Nama Masakan'
      />
      <Text>Deskripsi</Text>
      <TextInput
        style={styles.input2}
        onChangeText={onChangeDesk}
        value={desk}
        placeholder='Deskripsi'
        multiline={true}
        numberOfLines={4}
        maxLength={100}
      />
      <Text>Foto</Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangePhoto}
        onSubmitEditing={(event)=>
            onSubmitUrl(foto)
        }
        value={foto}
        placeholder='url'
      />
      <Image
        style={styles.imgResep}
        source={{uri: url}}
      />

      <Button
        title='SIMPAN'
        onPress={()=>{
            var id = DATA.length+1;
            DATA.push({id:id,nama:nama,desk:desk,photo:url});
            Alert.alert("Sukses","Data berhasil disimpan");
            props.navigation.goBack(null);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input:{
      height:40,
      borderWidth:1,
      padding:10,
  },
  input2:{
    height:120,
    borderWidth:1,
    padding:10,
},
imgResep: {
    width: 300,
    height: 200,
    marginRight:10,
    marginBottom : 10,
  },
});
