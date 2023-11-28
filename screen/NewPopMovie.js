import React from "react";
import {  View, Button, Text, TextInput, StyleSheet} from "react-native";
import {Card} from "react-native-elements";
import ValidationComponent from "react-native-form-validator";
import { DatePickerModal } from 'react-native-paper-dates';

export default class NewPopMovie extends ValidationComponent{
    constructor(props){
        super(props);
        this.state = {
            title: "",
            homepage: "",
            overview: "",
            release_date: "",
            runtime: 0,
            isDateTimePickerVisible:false
        }
    }

    _onPressButton = () => {
        this.validate({
            title: {required: true},
            homepage: {website:true},
            overview: {minlength: 50}
        }); 
    }

    showDateTimePicker = () => {
        this.setState({
            isDateTimePickerVisible: true
        });
    };

    hideDateTimePicker = () => {
        this.setState({
            isDateTimePickerVisible: false
        });
    };

    handleDatePicked = date => {
        this.setState({
            release_date: date.date.getFullYear() + "-" + (date.date.getMonth()+1) + "-" + date.date.getDate()
        });
        this.hideDateTimePicker();
    }

    submitData = () => {
        const options = {
            method: "POST",
            headers: new Headers({
                'Content-Type': 'application/x-www-form-urlencoded'
            }),
            body: "title="+this.state.title+"&"+
                  "homepage="+this.state.homepage+"&"+
                  "overview="+this.state.overview+"&"+
                  "release_date="+this.state.release_date+"&"+
                  "runtime="+this.state.runtime
        };

        try{
            fetch('http://ubaya.me/react/160419103/newmovie.php',options)
            .then(response=>response.json())
            .then(resJson=>{
                console.log(resJson);
                if(resJson.result==='success'){
                    alert("sukses");
                }
            })
        }   
        catch(error){
            console.log(error);
        }   
    }

    _onPressButton = () => {
        if(this.validate({
            title: {required: true},
            homepage: {required: true, website:true},
            overview: {minlength: 50}
        }));
        {
            this.submitData();
        }
    }

    render(){
        return(
            <Card>
            <View>
                <Card.Title>Buat Movie Baru</Card.Title>
                <Card.Divider></Card.Divider>
                <Text>Title</Text>
                <TextInput
                ref="title"
                onChangeText={(title) => this.setState({title})}
                value={this.state.title}
                style={{borderWidth:1, borderColor: "black", marginBottom: 20}}
                />
                <Text>Homepage</Text>
                <TextInput
                style={{borderWidth:1, borderColor: "black", marginBottom: 20}}
                onChangeText={(homepage)=>this.setState({homepage})}
                value={this.state.homepage}
                />
                <Text>Overview</Text>
                <TextInput
                multiline
                numberOfLines={4}
                style={{borderWidth:1, borderColor: "black", marginBottom: 50}}
                onChangeText={(overview)=>this.setState({overview})}
                value={this.state.overview}
                />
                <Text>Release Date</Text>
                <View style={styles.container}>
                    <Text style={styles.input2}>{this.state.release_date}</Text>
                    <Button  title="..." onPress={this.showDateTimePicker}/>
                </View>
                <DatePickerModal
                    locale="en"
                    mode="single"
                    visible={this.state.isDateTimePickerVisible}
                    onDismiss={this.hideDateTimePicker}
                    date={this.state.release_date}
                    onConfirm={this.handleDatePicked}
                />
                <Text>Runtime</Text>
                <View style={styles.container}>
                <TextInput style={styles.input} ref="runtime" onChangeText={(runtime) => this.setState({runtime})} value={this.state.runtime}/>
                </View>
                <Card.Divider></Card.Divider>
                <Button 
                onPress={this._onPressButton}
                title="Submit"
                />
                <Text>{this.getErrorMessages()}</Text>
            </View>
            </Card>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection:"row",
        justifyContent:"flex-start",
        margin:3
    },
    input:{
      height:40,
      borderWidth:1,
      padding:10,
  },
  input2:{
    width: 200,
    height:40,
    borderWidth:1,
    borderColor: "black",
  },
  imgBuku: {
      width: 300,
      height: 200,
      marginRight:10,
      marginBottom : 10,
  },
  slider: {
    width: 200,
    height: 40,
    flexGrow: 1,
    borderWidth: 1,
    borderColor: "black",
    borderStyle: "solid"
  },
  });
  