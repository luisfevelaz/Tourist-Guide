import React, {Component} from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";

import {widthPercentageToDP, heightPercentageToDP} from '../resources/dimensiones';
import {FlatListSlider} from 'react-native-flatlist-slider';

class Place extends Component{

    constructor(props){
        super(props);

        this.state={
            arrayVideos: [],
            place: {},
            arrayPrueba: [{title: 'Uno'},{title: 'Dos'},{title: 'Tres'}]
        }

        this.state.place = this.props.route.params.place;
    }

    getVideos=async()=>{
        const result = await fetch(``)
        .then((response) => response.json())
        .then((json) => {      
            // console.log("Array Videos: ", JSON.stringify(json,null,2));
            let array = json.items;
            let final = [];

            array.map((element,index)=>{
                final.push({
                    imagen: element.snippet.thumbnails.high.url,
                    id: element.id.videoId,
                    desc: element.snippet.title
                });
            })
            this.setState({arrayVideos: final},()=>{
                console.log(JSON.stringify(this.state.arrayVideos,null,2));
            });
        })
        .catch((error) => {
          console.error(error);
        });
    }

    componentDidMount(){
    //     console.log(JSON.stringify(this.props));
        this.getVideos();
    }


    render(){
        if(this.state.place.nombre != undefined){
            return(
            <View style={styles.container}>
                <Text style={styles.texto}>{this.state.place.nombre}</Text>
                <View>
                    <Text>Descripción: </Text>
                </View>
                <View style={{marginTop: widthPercentageToDP('25%')}}>
                    <View style={styles.container2}>
                        <Text>Videos: </Text>
                    </View>
                    {
                        (this.state.arrayVideos.length > 0 ? 
                    (
                        <FlatListSlider

                            data={this.state.arrayVideos} 
                            imageKey={'imagen'}
                            onPress={item => alert(JSON.stringify('Pressed item: '))}
                        />
                    ) : null)
                    }
                </View>
                
            </View>
            );
        }else{
            return(
                <View style={styles.container}>
                    <Text>Cargando datos...</Text>
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems:'center',
        backgroundColor: '#FAF393',
        marginBottom: heightPercentageToDP('5%')
    },
    container2: {
        alignItems:'center',
        backgroundColor: '#FAF393'
    },
    texto: {
        color: 'black',
        fontSize: widthPercentageToDP('10%')
    },
    title:{
        color: 'black',
        fontSize: widthPercentageToDP('5%')
    },
    slide:{
        backgroundColor: 'blue',
        height: heightPercentageToDP('25%'),
        width: widthPercentageToDP('30%')
    },
    item:{
        margin: heightPercentageToDP('2%'),
        borderRadius: widthPercentageToDP('5%'),
        backgroundColor: '#35F1C6',
        padding: widthPercentageToDP('3%'),
        borderWidth:1,
        borderColor: 'black'
    }
});

export default Place;