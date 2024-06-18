import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../pages/Auth/login';
import Cadastro from '../pages/Auth/cadastro';
import HomeScreen from '../pages/Home/index';
import MainTabs from '../navigation/mainTabs'

const Stack = createStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Cadastro" component={Cadastro} />
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="MainTabs" component={MainTabs} />
    </Stack.Navigator>
  );
}

export default AuthStack;
