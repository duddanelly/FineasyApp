import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../pages/Home/index';
import Movimentacoes from '../pages/Home/movimentacoes';
import Loading from '../pages/Loading/loading'

const Stack = createStackNavigator();

function HeaderStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="Movimentacoes" component={Movimentacoes} />
      <Stack.Screen name="Loading" component={Loading} />
    </Stack.Navigator>
  );
}

export default HeaderStack;
