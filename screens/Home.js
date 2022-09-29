import React, {Component} from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";

import {widthPercentageToDP, heightPercentageToDP} from '../resources/dimensiones';

class Home extends Component{

    constructor(props,{navigation}){
        super(props);

        this.state={
            arrayCategory:[{nombre:"Deportes"},{nombre:"Museos"},{nombre:"Teatros"}]
        }
    }
    componentDidMount(){
        console.log("\n\nHola");
    }
    
    render(){
        return(
        <View style={styles.container}>
            {this.state.arrayCategory.length>0 ? (
                <FlatList
                data={this.state.arrayCategory}
                renderItem={({item}) => 
                    <TouchableOpacity style={styles.item}
                    onPress={()=>{
                        this.props.navigation.navigate("Seleccionado");
                    }}>
                        <Text style={styles.texto}>{item.nombre}</Text>
                    </TouchableOpacity>}
                />

            ): (
                <Text style={styles.texto}>Cargando Categorías</Text>
            )}
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

export default Home;