import  React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Home from '../screens/Home';
import Selected from '../screens/Selected';

const Stack = createNativeStackNavigator();

const MainStack = () =>{
    return(
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                name='Inicio'
                component = {Home}
                />
                <Stack.Screen
                name='Seleccionado'
                component = {Selected}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default MainStack;