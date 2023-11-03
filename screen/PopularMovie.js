import { StyleSheet, View, Text } from "react-native-web";
import React from "react";
import { FlatList, TextInput } from "react-native-gesture-handler";
import { Button, Card, Icon } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";

class PopularMovie extends React.Component {
    constructor(props) {
        super();
        this.state = {
            tes: "Menunggu API",
            temp: "",
            cari: "",
            data: []
        };
        this.fetchData();
    }
    fetchData= () =>{
        const options = {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/x-www-form-urlencoded'

            }),
            body: "cari="+this.state.cari
        };
        try{
            fetch('https://ubaya.me/react/160419103/movie.php', options)
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
                onPress={()=> {
                    const { navigation } = this.props;
                    navigation.navigate('DetailMovie',{movie_id:item.movie_id})
                }}
                />
            </Card>
            )}
        />
    }
  render() {
    return (
    <Card>
        <View style={styles.viewRow}>
            <Text>Cari </Text>
            <TextInput style={styles.input}
            onChangeText={(cari)=>this.setState({cari:cari})}
            onSubmitEditing={this.fetchData}
            />
        </View>
      <View>
        <Text>{this.showData(this.state.data)}</Text>   
      </View>
    </Card>
    );
  }
}

export default function (props) { 
    const navigation = useNavigation();
    return <PopularMovie {...props} navigation={navigation}/>
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
  