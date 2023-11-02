import { StyleSheet, View, Text } from "react-native-web";
import React from "react";
import { FlatList } from "react-native-gesture-handler";
import { Button, Card, Icon, Image } from "react-native-elements";

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
                </Card>
            )}
        />
    }
  render() {
    return (
      <View>
        <Text>{this.showData(this.state.data)}</Text>   
      </View>
    );
  }
}

export default PopularActor;
  