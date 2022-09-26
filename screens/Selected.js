import React, {Component} from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";

import {widthPercentageToDP, heightPercentageToDP} from '../resources/dimensiones';

class Selected extends Component{

    constructor(props){
        super(props);

        this.state={
            arrayCategory:[{nombre:"Deportes"},{nombre:"Museos"}]
        }
    }
    componentDidMount(){
        console.log("\n\nHola");
    }
    
    render(){
        return(
        <View style={styles.container}>
            <Text style={styles.texto}>Cargando Categorías</Text>
        </View>
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
        backgroundColor: '#35F1C6',
        padding: widthPercentageToDP('3%'),
        borderWidth:1,
        borderColor: 'black'
    }
});

export default Selected;