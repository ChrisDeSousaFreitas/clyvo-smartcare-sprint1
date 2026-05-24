import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './src/screens/HomeScreen';
import CadastroPetScreen from './src/screens/CadastroPetScreen';
import HistoricoScreen from './src/screens/HistoricoScreen';
import SmartCollarScreen from './src/screens/SmartCollarScreen';
import AgendamentoScreen from './src/screens/AgendamentoScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Home"
        screenOptions={{
          headerStyle: { backgroundColor: '#1A2B4C' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Clyvo Care' }} />
        <Stack.Screen name="CadastroPet" component={CadastroPetScreen} options={{ title: 'Perfil do Pet' }} />
        <Stack.Screen name="Historico" component={HistoricoScreen} options={{ title: 'Histórico Longitudinal' }} />
        <Stack.Screen name="SmartCollar" component={SmartCollarScreen} options={{ title: 'Coleira Inteligente' }} />
        <Stack.Screen name="Agendamento" component={AgendamentoScreen} options={{ title: 'Agendamento Preventivo' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}