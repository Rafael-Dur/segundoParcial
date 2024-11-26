import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { DestinationProvider } from './context/DestinationContext';
import DestinationList from './components/DestinationList';
import EditDestination from './components/EditDestination';
import DestinationDetails from './components/DestinationDetails';
import AddDestination from './components/AddDestination';

const Stack = createStackNavigator();

export default function App() {
  return (
    <DestinationProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="DestinationList">
          <Stack.Screen
            name="DestinationList"
            component={DestinationList}
            options={{ title: 'Destinos' }}
          />
          <Stack.Screen
            name="DestinationDetails"
            component={DestinationDetails}
            options={{ title: 'Detalles del Destino' }}
          />
          <Stack.Screen
            name="EditDestination"
            component={EditDestination}
            options={{ title: 'Editar Destino' }}
          />
          <Stack.Screen
            name="AddDestination"
            component={AddDestination}
            options={{ title: 'Agregar Nuevo Destino' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </DestinationProvider>
  );
}
