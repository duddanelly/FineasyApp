import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Dashboard from '../pages/Dashboard/dashIndex';
import Categoria from '../pages/Dashboard/categorias';
import AdicionarGanho from '../pages/AdicionarGanhos/ganhosIndex';
import AdicionarGastos from '../pages/AdicionarGastos/gastosIndex';
import EditCategoria from '../pages/Dashboard/editCategorias';

const Stack = createStackNavigator();

function DashboardStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Dashboard" component={Dashboard} />
      <Stack.Screen name="Categoria" component={Categoria} />
      <Stack.Screen name="AdicionarGanho" component={AdicionarGanho} />
      <Stack.Screen name="AdicionarGastos" component={AdicionarGastos} />
      <Stack.Screen name="EditCategoria" component={EditCategoria} />
    </Stack.Navigator>
  );
}

export default DashboardStack;
