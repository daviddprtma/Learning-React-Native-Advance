import { StyleSheet, View, Text } from "react-native-web";
import React from "react";
import { FlatList } from "react-native-gesture-handler";
import { Button, Card, Icon, Image } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";

class PopularActor extends React.Component {
    constructor(props) {
        super();
        this.state = {
            tes: "Menunggu API",
            data: []
        };
        this.fetchData();
    }
    fetchData= () =>{
        try{
            fetch('https://ubaya.me/react/160419103/popularactor.php')
            .then((response) => response.json())
            .then((resjson) => {
                this.setState(
                    this.state = {
                        data: resjson.data
                })
            });
        }
        catch(e){
            console.log(e);
        }
    }
    showData(data){
        return <FlatList
            data={data}
            keyExtractor={(item) => item.person_id.toString()}
            renderItem={({item}) => (
                <Card>
                    <Image
                    source={{uri: item.url}}
                    style={{width: 200, height: 200}}
                    />
                <Text style={{marginBottom: 10}}>{item.person_name}</Text>
                <Button 
                icon={<Icon name='rowing' color='#ffffff' />}
                buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                title='Detail'
                onPress={()=> {
                    const { navigation } = this.props;
                    navigation.navigate('DetailPopularActor',{person_id:item.person_id})
                }}
                />
                </Card>
            )}
        />
    }
  render() {
    return (
      <View style={styles.viewRow}>
        <Text>{this.showData(this.state.data)}</Text>   
      </View>
    );
  }
}

export default function(props){
    const navigation = useNavigation();
    return <PopularActor {...props} navigation={navigation} />
}

const styles = StyleSheet.create({
    viewRow: {
      flexDirection: "row",
      justifyContent: "flex-end",
      alignItems: "center",
      paddingRight:50,
      margin:3
    },
    input: {
        height: 40,
        width: 200,
        borderWidth: 1,
        padding: 10
    }
  });
  
  