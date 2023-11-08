import React, {Component} from "react";
import { FlatList, Text, View, StyleSheet } from "react-native";
import { Card } from "react-native-elements";

class DetailPopularActor extends React.Component{
    constructor(){
        super();
        this.state = {
            person_id: 0,
            is_fetched: false,
            data: {}
        };
    }

    fetchData(){
        const options = {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/x-www-form-urlencoded'
            }),
            body: "id="+this.state.person_id
        };
        try{
            fetch('https://ubaya.me/react/160419103/detailactor.php', options)
            .then((response) => response.json())
            .then((resjson) => {
                this.setState(
                    this.state = {
                        data: resjson.data,
                        is_fetched: true
                })
            });

        }
        catch(e){
            console.log(e);
        }
    }

    render(){
        if(!this.state.is_fetched){
            this.state.person_id = this.props.route.params.person_id;
            this.fetchData();
            return <Text>Waiting JSON...</Text>
        }
        else{
        return(
            <View>
            <Card>
                <Card.Title>{this.state.data.person_name}</Card.Title>
                <Card.Divider/>
                <Card.Image 
                source={this.state.data.url}
                styles={style.center}>
                </Card.Image>
                <Text>Character: </Text>
                <FlatList
                    data={this.state.data.movies}
                    keyExtractor={(item) => item.character_name}
                    renderItem={({item}) => (
                        <View>
                        <Text>{item.character_name}</Text>
                        </View>
                    )}
                />
            </Card>
            </View>
        )
        }
    }
}

export default DetailPopularActor;

const style = StyleSheet.create({
    center:{
        display: "block",
        marginLeft: "auto",
        marginRight: "auto",
        width: 200,
        height: 200
    }
  });
  
  