import React, {Component} from "react";
import { Card} from 'react-native-elements';
import { StyleSheet, View, Text, Button, TextInput,NativeModules } from "react-native";

class Login extends Component {
    constructor(props) {
        super(props);
    }

    render(){
        return (
            <Card>
                <Card.Title>Silahkan Login</Card.Title>
                <Card.Divider/>
                <View style={styles.viewRow}>
                    <Text>Username</Text>
                    <TextInput style={styles.input}/>   
                </View>
                
                <View style={styles.viewRow}>
                    <Text>Password</Text>
                    <TextInput secureTextEntry={true} style={styles.input}/>   
                </View>

                <View style={styles.viewRow}>
                    <Button style={styles.button} title="Submit"/>
                </View>
            </Card>
        )
    }
}
    
export default Login;
    

const styles = StyleSheet.create({
    input: {
    height: 40,
    width:200,
    borderWidth: 1,
    padding: 10,
    },
    button: {
        height: 40,
        width:200,  
    },
    viewRow:{
        flexDirection:"row",
        justifyContent:"flex-end",
        alignItems: 'center',
        paddingRight:50,
        margin:3
    }
})