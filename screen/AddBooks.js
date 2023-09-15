import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Button,TextInput,Image,Alert } from 'react-native';
import { dataBuku } from '../classes/Buku';

export default function AddBooks(props) {
    const [nama, onChangeName] = React.useState("");
    const[desk, onChangeDesk] = React.useState("");
    const [foto, onChangePhoto] = React.useState("");  
    const [url, onSubmitUrl] = React.useState("https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty-300x240.jpg")
  return (
    <View>
        <Text>Judul Buku</Text>
      <TextInput
      style={styles.input}
      onChangeText={onChangeName}
        value={nama}
        placeholder='Masukkan Judul Buku'
      />
      <Text>Deskripsi Buku</Text>
      <TextInput
        style={styles.input2}
        onChangeText={onChangeDesk}
        value={desk}
        placeholder='Masukkan Deskripsi Buku'
        multiline={true}
        numberOfLines={4}
      />
      <Text>Cover</Text>
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
        style={styles.imgBuku}
        source={{uri: url}}
      />

      <Button
        title='SIMPAN'
        onPress={()=>{
            var id = dataBuku.length+1;
            dataBuku.push({id:id,nama:nama,desk:desk,photo:url});
            Alert.alert("Sukses","Data Buku berhasil disimpan");
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
imgBuku: {
    width: 300,
    height: 200,
    marginRight:10,
    marginBottom : 10,
},
});
