import  React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Home from '../screens/Home';
import Selected from '../screens/Selected';
import Place from '../screens/Place';

const Stack = createNativeStackNavigator();

const MainStack = () =>{
    return(
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                name='Inicio'
                component = {Home}
                options={{
                    title: 'Inicio',
                    headerStyle: {
                      backgroundColor: 'rgba(132,232,182,0.6)',
                      textAlign: 'center'
                    },
                    headerTitleStyle: {
                      fontWeight: 'bold',
                      textAlign:'center'
                    },
                  }}
                />
                <Stack.Screen
                name='Seleccionado'
                component = {Selected}
                options ={({route}) => ({
                    title: `Categoría: ${route.params.categoria.nombre}`,
                    headerStyle: {
                        backgroundColor: 'rgba(132,232,182,0.6)',
                        textAlign: 'center'
                    },
                    headerTintColor: '#000',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                        textAlign:'center'
                    },
                    
                })}
                />
                <Stack.Screen
                name='Lugar'
                component = {Place}
                options={{
                    title: 'Descripción',
                    headerStyle: {
                      backgroundColor: 'rgba(132,232,182,0.6)',
                      textAlign: 'center'
                    },
                    headerTitleStyle: {
                      fontWeight: 'bold',
                      textAlign:'center'
                    },
                  }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default MainStack;