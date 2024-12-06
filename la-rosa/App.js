import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Index from './src/screens/Index';
import AddProperty from './src/screens/AddProperty';
import AllProperties from './src/screens/AllProperties';
import ConsultaCEP from './src/screens/ConsultaCEP';
import Navbar from './src/components/Navbar';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Index"
        screenOptions={{
          header: () => <Navbar />
        }}
      >
        <Stack.Screen name="Index" component={Index} options={{ title: 'Início' }} />
        <Stack.Screen name="AddProperty" component={AddProperty} options={{ title: 'Cadastrar Imóvel' }} />
        <Stack.Screen name="AllProperties" component={AllProperties} options={{ title: 'Todos os Imóveis' }} />
        <Stack.Screen name="ConsultaCEP" component={ConsultaCEP} options={{ title: 'Consultar CEP' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
