import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,Button } from 'react-native';

export default function Home({navigation}) {
  return (
    <View>
      <Text>Selamat pagi {global.activeuser}</Text>
      <Button
      title='Go to About Page'
      onPress={()=>navigation.navigate("About")}></Button>
      <Button
      title='Go to Product Page'
      onPress={()=>navigation.navigate("Product")}></Button>
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
});
