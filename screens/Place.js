import React, {Component} from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ImageBackground } from "react-native";

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
            <ImageBackground source={require('../assets/cielo.jpg')} resizeMode="cover" style={styles.image}>
            <View style={styles.container}>
                <View style={{marginBottom: heightPercentageToDP('5%'), backgroundColor: 'rgba(161,241,206,0.5)', borderRadius: 10, padding: widthPercentageToDP('3%'), marginTop: heightPercentageToDP('2%')}}>
                    <Text style={styles.texto}>{this.state.place.nombre}</Text>
                </View>
                <View>
                    <Text style={styles.tituloParrafo}>Descripción: </Text>
                </View>
                <View style={styles.parrafo}>
                    <Text style={{textAlign:'justify', color:'black'}}>
                        {this.state.place.descripcion != undefined ? this.state.place.descripcion : ''}
                    </Text>
                </View>
                <View style={{marginTop: widthPercentageToDP('5%')}}>
                    <View style={styles.container2}>
                        <Text style={styles.tituloParrafo}>Videos: </Text>
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
            </ImageBackground>
            );
        }else{
            return(
                <ImageBackground source={require('../assets/cielo.jpg')} resizeMode="cover" style={styles.image}>
                <View style={styles.container}>
                    <Text>Cargando datos...</Text>
                </View>
                </ImageBackground>
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems:'center',
        marginBottom: heightPercentageToDP('5%'),
        paddingHorizontal: widthPercentageToDP('5%')
    },
    container2: {
        alignItems:'center',
    },
    texto: {
        color: 'white',
        fontWeight: 'bold',
        textShadowColor: 'black',
        textShadowOffset:{width: widthPercentageToDP('1%'), height: widthPercentageToDP('1%')},
        textShadowRadius: 2,
        textAlign: 'center',
        fontSize: widthPercentageToDP('10%')
    },
    title:{
        color: 'black',
        fontSize: widthPercentageToDP('5%')
    },
    tituloParrafo:{
        color: 'black',
        fontWeight: 'bold',
        fontSize: widthPercentageToDP('5%')
    },
    slide:{
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
    },
    image:{
        flex: 1,
        justifyContent: "center"
    },
    parrafo:{
        backgroundColor: 'rgba(161,241,206,0.5)',
        borderRadius: 10,
        padding: widthPercentageToDP('4%'),
        textAlign: 'justify',
    }
});

export default Place;