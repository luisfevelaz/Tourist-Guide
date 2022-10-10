import React, {Component} from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, BackHandler } from "react-native";
import MapView, {Marker} from 'react-native-maps';

import {widthPercentageToDP, heightPercentageToDP} from '../resources/dimensiones';

class Selected extends Component{

    constructor(props){
        super(props);

        this.state={
            categoria: {},
            arrayLugares:[],
            blnShowMap: false,
            decLatitudMapa: 19.425705,
            decLongitudMapa: -99.13605,
            strClaveCd: null
        }
        this.state.categoria = this.props.route.params.categoria;
        this.state.arrayCiudades = this.props.route.params.ciudades;
    }

    backAction = () => {
      this.setState({blnShowMap: false});
      return true;
    };

    getLugares=async()=>{
      const result = await fetch('http://192.168.100.6:3000/lugares')
        .then((response) => response.json())
        .then((json) => {      
            this.setState({arrayLugares: json});
        })
        .catch((error) => {
          console.error(error);
        });
    }


    componentDidMount(){
      this.backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        this.backAction
      );

    }

    componentWillUnmount() {
      this.backHandler.remove();
    }
    
    
    renderMaps(){

        return(
                <View style={styles.container}>
                    <MapView
                    style={styles.mapStyle}
                    initialRegion={{
                        latitude: this.state.decLatitudMapa,
                        longitude: this.state.decLongitudMapa,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                    customMapStyle={mapStyle}>
                    {/* <Marker
                        draggable
                        coordinate={{
                        latitude: 19.00034,
                        longitude: -99.1360595493,
                        }}
                        onDragEnd={
                        (e) => alert(JSON.stringify(e.nativeEvent.coordinate))
                        }
                        title={'Test Marker'}
                        description={'This is a description of the marker'}
                    /> */}
                    </MapView>
                </View>

        );
    }

    renderCiudades(){
      return(
        <View style={styles.container}>
            {this.state.arrayCiudades.length>0 ? (
                <FlatList
                data={this.state.arrayCiudades}
                renderItem={({item}) => 
                    <TouchableOpacity style={styles.item}
                    onPress={()=>{
                        this.setState({
                          blnShowMap: true,
                          decLatitudMapa: parseFloat(item.location.latitud),
                          decLongitudMapa: parseFloat(item.location.longitud)
                        })
                    }}>
                        <Text style={styles.texto}>{item.nombre}</Text>
                    </TouchableOpacity>}
                />

            ): (
                <Text style={styles.texto}>Cargando Ciudades</Text>
            )}
        </View>
      );
    }

    render(){
      if(this.state.blnShowMap == true){
        return(this.renderMaps());
      
      }else{
        return(this.renderCiudades());
      }
      
    }
}

const mapStyle = [
    {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
    {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
    {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
    {
      featureType: 'administrative.locality',
      elementType: 'labels.text.fill',
      stylers: [{color: '#d59563'}],
    },
    {
      featureType: 'poi',
      elementType: 'labels.text.fill',
      stylers: [{color: '#d59563'}],
    },
    {
      featureType: 'poi.park',
      elementType: 'geometry',
      stylers: [{color: '#263c3f'}],
    },
    {
      featureType: 'poi.park',
      elementType: 'labels.text.fill',
      stylers: [{color: '#6b9a76'}],
    },
    {
      featureType: 'road',
      elementType: 'geometry',
      stylers: [{color: '#38414e'}],
    },
    {
      featureType: 'road',
      elementType: 'geometry.stroke',
      stylers: [{color: '#212a37'}],
    },
    {
      featureType: 'road',
      elementType: 'labels.text.fill',
      stylers: [{color: '#9ca5b3'}],
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry',
      stylers: [{color: '#746855'}],
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry.stroke',
      stylers: [{color: '#1f2835'}],
    },
    {
      featureType: 'road.highway',
      elementType: 'labels.text.fill',
      stylers: [{color: '#f3d19c'}],
    },
    {
      featureType: 'transit',
      elementType: 'geometry',
      stylers: [{color: '#2f3948'}],
    },
    {
      featureType: 'transit.station',
      elementType: 'labels.text.fill',
      stylers: [{color: '#d59563'}],
    },
    {
      featureType: 'water',
      elementType: 'geometry',
      stylers: [{color: '#17263c'}],
    },
    {
      featureType: 'water',
      elementType: 'labels.text.fill',
      stylers: [{color: '#515c6d'}],
    },
    {
      featureType: 'water',
      elementType: 'labels.text.stroke',
      stylers: [{color: '#17263c'}],
    },
  ];

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
    },
    mapStyle: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      },
});

export default Selected;