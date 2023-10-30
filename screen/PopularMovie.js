import { StyleSheet, View, Text } from "react-native-web";
import React from "react";
import { FlatList } from "react-native-gesture-handler";
import { Button, Card, Icon } from "react-native-elements";

class PopularMovie extends React.Component {
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
            fetch('https://ubaya.me/react/160419103/movie.php')
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
            keyExtractor={(item) => item.movie_id.toString()}
            renderItem={({item}) => (
                <Card>
                <Card.Title>{item.title}</Card.Title>
                <Card.Divider/>
                <Card.Image source={{uri:'http://placekitten.com/200/150'}}>
                </Card.Image>
                <Text style={{marginBottom: 10}}>{item.overview}</Text>
                <Button 
                icon={<Icon name='rowing' color='#ffffff' />}
                buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                title='Detail'
                />
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

export default PopularMovie;


  