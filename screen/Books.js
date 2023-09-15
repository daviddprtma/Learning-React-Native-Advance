import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button,Image } from 'react-native';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { dataBuku } from '../classes/Buku';

export default function Books() {
  return (
    <ScrollView>
      <Text style={styles.txtJudul}>Daftar Info Buku Terbaru</Text>
      <FlatList
        data={dataBuku}
        renderItem={({ item }) => (
            <View style={styles.vparent2}>
             <Text style={styles.txtNama}>{item.nama}</Text>
             <Image
                style={styles.imgBuku}
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
  vparent2:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth : 1,
    borderColor: 'grey',
    margin : 10,
    borderRadius:20
  },
  imgBuku: {
    width: 300,
    height: 200,
    marginRight:10,
    marginBottom : 10,
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
  txtJudul:{
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  }
});
