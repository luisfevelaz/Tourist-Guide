import React, {Component} from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity,ImageBackground } from "react-native";

import {widthPercentageToDP, heightPercentageToDP} from '../resources/dimensiones';

class Home extends Component{

    constructor(props){
        super(props);

        this.state={
            arrayCategory:[],
            arrayCiudades:[]
        }
    }

    getCategorias=async()=>{
        const result = await fetch('http://192.168.100.6:3000/categorias')
            .then((response) => response.json())
            .then((json) => {
                // console.log("JSON: ",JSON.stringify(json));
                this.setState({arrayCategory: json});
            })
            .catch((error) => {
            console.error(error);
            });
    }

    getCiudades=async()=>{
        const result = await fetch('http://192.168.100.6:3000/ciudades')
          .then((response) => response.json())
          .then((json) => {      
              this.setState({arrayCiudades: json});
          })
          .catch((error) => {
            console.error(error);
          });
      }

    componentDidMount(){
        this.getCategorias();
        this.getCiudades();
    }
    
    render(){
        return(
        <ImageBackground source={require('../assets/cielo.jpg')} resizeMode="cover" style={styles.image}>
        <View style={styles.container}>
            {this.state.arrayCategory.length>0 ? (
                <FlatList
                data={this.state.arrayCategory}
                renderItem={({item}) => 
                    <TouchableOpacity style={styles.item}
                    onPress={()=>{
                        this.props.navigation.navigate("Seleccionado",{
                            categoria: item,
                            ciudades: this.state.arrayCiudades
                        });
                    }}>
                        <Text style={styles.texto}>{item.nombre}</Text>
                    </TouchableOpacity>}
                />

            ): (
                <Text style={styles.texto}>Cargando Categorías</Text>
            )}
        </View>
        </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: 'center',
        alignItems:'center',
        justifyContent: 'center'
    },
    texto: {
        color: 'black',
        fontSize: widthPercentageToDP('10%')
    },
    item:{
        margin: heightPercentageToDP('2%'),
        borderRadius: widthPercentageToDP('5%'),
        backgroundColor: 'rgba(161,241,206,0.5)',
        padding: widthPercentageToDP('3%'),
        borderWidth:1,
        borderColor: 'black'
    },
    image:{
        flex: 1,
        justifyContent: "center"
    }
});

export default Home;