import React, {Component} from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { Card } from "react-native-elements";
import ValidationComponent from "react-native-form-validator";
import { FlatList } from "react-native-gesture-handler";
import { DatePickerModal } from 'react-native-paper-dates';
import DropDownPicker from "react-native-dropdown-picker";

export default class EditMovie extends ValidationComponent{
    constructor(props){
        super(props);
        this.state = {  
            title:"",
            homepage:"",
            overview:"",
            runtime:"100",
            release_date:"",
            isDateTimePickerVisible:false,
            genres:[],
             dd_items:[{genre_name: 'Action', genre_id: '1'},
                       {genre_name: 'Horror', genre_id: '2'},
                       {genre_name: 'Family', genre_id: '3'},
                      ],
            dd_value:'',
            dd_open:false,
            is_addgenre:false,
        }
    }

    setOpen = open =>  {
        this.setState({
            dd_open:open
        });
    }
    setValue=callback=> {
        this.setState(state => ({
            dd_value: callback(state.value),
            is_addgenre:true

        }));
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
                var data = resjson.data;
                this.setState(
                    this.state = {
                        is_fetched: true,
                        title: data.title,
                        homepage:data.homepage,
                        overview:data.overview,
                        runtime: data.runtime
                })
            });
        }
        catch(e){
            console.log(e);
        }
    }

    showDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: true });
      };
    
hideDateTimePicker = () => {
this.setState({ isDateTimePickerVisible: false });
};
    
handleDatePicked = date => {
this.setState(
  { 
      release_date: date.date.getFullYear() + "-" +
                  (date.date.getMonth()+1)  + "-" +
                  date.date.getDate()  
      
  }
  );
this.hideDateTimePicker();
};

submitData = () => {
    const options = {
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/x-www-form-urlencoded'
        }),
        body: "title="+this.state.title + "&" + 
        "homepage=" + this.state.homepage + "&" +
        "overview=" + this.state.overview + "&" +
        "&release_date=" + this.state.release_date + "&" + 
        "runtime=" + this.state.runtime + "&" + 
        "movie_id=" + this.state.movie_id
    };
    try{
        fetch('https://ubaya.me/react/160419103/updatemovie.php', options)
        .then((response) => response.json())
        .then((resjson) => {
            if(resjson.result==='success'){
                alert('sukses');
            }
        });
    }
    catch(e){
        console.log(e);
    }
}

    _onPressButton = () => {
        if(this.validate({
            title: {required: true},
            homepage : {required:true, website:true},
            overview : {minlength:50}
        }))
        {
            this.submitData();
        }
    }

    fetchDataDD = () => {
        const options = {
          method: 'POST',
          headers: new Headers({
            'Content-Type': 'application/x-www-form-urlencoded'
          }),
          body: "movie_id="+this.state.movie_id
        };
          try {
            fetch('https://ubaya.me/react/160419103/genre_list.php',
            options)
              .then(response => response.json())
              .then(resjson =>{
                var data=resjson.data;
                this.setState(
                  this.state = {
                     dd_items:data
                  })
              });
          } catch (error) {
            console.log(error);
          } 
        }
        addGenre = () => {           
            const options = {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/x-www-form-urlencoded'
            }),
            body: "genre_id="+this.state.dd_value+"&"+
                    "movie_id="+this.state.movie_id
            };
            try {
                fetch('https://ubaya.me/react/160419103/addmoviegenre.php',
                options)
                .then(response => response.json())
                .then(resjson =>{
                    console.log(resjson);
                    if(resjson.result==='success') alert('sukses')
                    this.setState(
                            this.state = {
                                is_fetched:false,
                                is_addgenre:false
                    })
                });
            } catch (error) {
                console.log(error);
            } 
            }

            deleteGenre(idgenre){
                const options = {
                 method: 'POST',
                 headers: new Headers({
                  'Content-Type': 'application/x-www-form-urlencoded'
                 }),
                 body: "genre_id="+idgenre+"&"+
                    "movie_id="+this.state.movie_id
                };
                 try {
                  fetch('http://ubaya.me/react/160419103/deletemoviegenre.php',
                  options)
                   .then(response => response.json())
                   .then(resjson =>{
                    console.log(resjson);
                    if(resjson.result==='success') alert('sukses')
                    this.setState(
                       this.state = {
                          is_fetched:false,
                          is_addgenre:false
                    })
                   });
                 } catch (error) {
                  console.log(error);
                 }
                }
    render(){
        if(this.state.is_addgenre) this.addGenre();
        if(!this.state.is_fetched){
            this.state.movie_id = this.props.route.params.movie_id;
            this.fetchData();
            return <Text>Waiting JSON...</Text>
        }
        return(
            <Card>
            <View>
                <Card.Title>Update Movie</Card.Title>
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
                <Text>Genre:</Text>
                <FlatList
                    data={this.state.genres}
                    keyExtractor={(item) => item.genre_name}
                    renderItem={({item}) => (
                        <View>
                            <Text>{item.genre_name}
                            <Button
                            onPress={() => this.deleteGenre(item.genre_id)}
                            title="X"
                            />
                            </Text>
                        </View>
                    )}
                />

                <DropDownPicker
                    schema={{
                    label: 'genre_name',
                    value: 'genre_id'
                    }}
                    open={this.state.dd_open}
                    value={this.state.dd_value}
                    items={this.state.dd_items}
                    setOpen={this.setOpen}
                    setValue={this.setValue}
                />

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