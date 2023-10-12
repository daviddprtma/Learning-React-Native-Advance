import React,{Component} from "react";
import {StyleSheet,View } from "react-native";
import {LinearProgress,Button,Text,Chip } from "@rneui/base";
import Question from "../classes/Question";
import AsyncStorage from "@react-native-async-storage/async-storage";

class Quiz extends Component{
    batas=10
    topScore = 0;
    topUser = "";

    toHHMMSS (v) {
            var sec_num = parseInt(v, 10); 
            var hours   = Math.floor(sec_num / 3600);
            var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
            var seconds = sec_num - (hours * 3600) - (minutes * 60);
        
            if (hours   < 10) {hours   = "0"+hours;}
            if (minutes < 10) {minutes = "0"+minutes;}
            if (seconds < 10) {seconds = "0"+seconds;}
            return hours+':'+minutes+':'+seconds;
        }

        
        checkAnswer(s) {
            var temp2;
            var temp4=false;
            var temp3=this.state.skor;
            if (s == this.state.quiz[this.state.nomor].answer) {
                temp3=this.state.skor + 100;
                }else
                {
                    temp3=this.state.skor - 50;
                }
            temp2=this.state.nomor+1;
            if(temp2>=this.state.quiz.length) 
            {
                this.setState(
                    this.state = {
                        selesai: true,
                        skor: temp3
                    }
                )
                this.cekScore();
            }
            else{
            this.setState(
                this.state = {
                    count:this.batas,
                    nomor:temp2,
                    skor:temp3,
                })
            }
        }

        restartGame(){
            this.state.count = this.batas;
            this.state.nomor = 0;
            this.state.skor = 0;
            this.state.selesai = false;
        }


    state={

                   quiz : [
                           new Question('Not a member of Avenger ', 'Ironman',
                            'Spiderman', 'Thor', 'Hulk Hogan', 'Hulk Hogan'),
                           new Question("Not a member of Teletubbies", 'Dipsy',
                            'Patrick', 'Laalaa', 'Poo', 'Patrick'),
                           new Question("Not a member of justice league", 'batman',
                            'superman', 'flash', 'aquades', 'aquades')
                       ],
        nomor:0,
        skor:0,
        selesai:false,
        count:this.batas,
        oneSecInterval : setInterval(() => {

            if(this.state.count==0)
                {
                    if(this.state.nomor==(this.state.quiz.length-1))
                    {
                    this.setState(
                        this.state = {
                            count:this.batas,
                            nomor:0,
                            selesai:true
                        })
                    }else
                    {
                    this.setState(
                        this.state = {
                            count:this.batas,
                            nomor:this.state.nomor+1
                        })
                    }
                    
                }

                this.setState(
                    this.state = {
                    count:this.state.count-1
                    })
            }, 1000) 
            
    }

    cekScore = async() =>{
        try{
            const value = await AsyncStorage.getItem('topscore');
            const vals = await AsyncStorage.getItem('topuser');
            this.topScore = value;
            this.topUser = vals;

            if(parseInt(value) < this.state.skor){
                try{
                    await AsyncStorage.setItem('topscore', this.state.skor.toString());
                    await AsyncStorage.setItem('topuser', global.activeuser);
                    this.topScore = await AsyncStorage.getItem('topscore');
                    this.topUser = await AsyncStorage.getItem('topuser');
                }
                catch(e){
                    alert("Tes" + e);
                }
            }
        }
        catch(e){
            alert(e);
        }
    }

    render(){
      if(this.state.selesai==true)
      {
        return <View style={styles.vparent}>
            <Text h3>{global.activeuser} Your score: {this.state.skor} </Text>
            <Text >High Score: {this.topScore}</Text>
            <Text >User High Score: {this.topUser}</Text>
            <Chip
			type="outline"
                title={this.state.skor}
              />    
            <Button title={"Main Lagi"} onPress={()=> this.restartGame()} type="outline"/>
        </View>
      }
      else
      {
        return(<View>
        <LinearProgress animation={false}
        value={1-(this.state.count/this.batas)}
         color="primary" />
        <Text >{this.toHHMMSS(this.state.count)}  Skor={this.state.skor}</Text> 

        <Text h3>{this.state.quiz[this.state.nomor].question}</Text>
        <View style={styles.vparent}>
        <Button onPress={()=>this.checkAnswer(this.state.quiz[this.state.nomor].option_a)} title={"A." + this.state.quiz[this.state.nomor].option_a} type="outline"/>
        <Button onPress={()=>this.checkAnswer(this.state.quiz[this.state.nomor].option_b)} title={"B." + this.state.quiz[this.state.nomor].option_b} type="outline"/>
        <Button onPress={()=>this.checkAnswer(this.state.quiz[this.state.nomor].option_c)} title={"C." + this.state.quiz[this.state.nomor].option_c} type="outline"/>
        <Button onPress={()=>this.checkAnswer(this.state.quiz[this.state.nomor].option_d)} title={"D." + this.state.quiz[this.state.nomor].option_d} type="outline"/>
        </View>

      </View>)
      
    }}

}


const styles = StyleSheet.create({
    vparent:{
      flex: 1,
      justifyContent: 'center',
    }
});

    
export default Quiz