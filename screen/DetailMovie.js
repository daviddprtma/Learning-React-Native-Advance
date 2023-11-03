import React, {Component} from "react";
import { FlatList, Text, View } from "react-native";
import { Card } from "react-native-elements";

class DetailMovie extends React.Component{
    constructor(){
        super();
        this.state = {
            movie_id: 0,
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
            body: "id="+this.state.movie_id
        };
        try{
            fetch('https://ubaya.me/react/160419103/detailmovie.php', options)
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
            this.state.movie_id = this.props.route.params.movie_id;
            this.fetchData();
            return <Text>Waiting JSON...</Text>
        }
        else{
        return(
            <View>
            <Card>
                <Card.Title>{this.state.data.title}</Card.Title>
                <Card.Divider/>
                <Card.Image source={{uri: 'http://placekitten.com/200/150'}}>
                </Card.Image>
                <Text style={{marginBottom: 10}}>
                    {this.state.data.overview}
                </Text>
                <Text style={{marginBottom: 10}}>
                   Website: {this.state.data.homepage}
                </Text>
                <Text style={{marginBottom: 10}}>
                    Release Date: {this.state.data.release_date}
                </Text>
                <Text>Genre: </Text>
                <FlatList
                    data={this.state.data.genres}
                    keyExtractor={(item) => item.genre_name}
                    renderItem={({item}) => (
                        <View>
                        <Text>{item.genre_name}</Text>
                        </View>
                    )}
                />
            </Card>
            </View>
        )
        }
    }
}

export default DetailMovie;