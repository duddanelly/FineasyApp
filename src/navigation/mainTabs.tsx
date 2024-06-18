import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AdicionarGanho from '../pages/AdicionarGanhos/ganhosIndex';
import AdicionarGastos from '../pages/AdicionarGastos/gastosIndex';
import Icon from 'react-native-vector-icons/AntDesign';
import HeaderStack from './headerStack'; // Reutilize HeaderStack se necessário
import DashboardStack from './dashboardStack'; // Reutilize DashboardStack se necessário

const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Home"
        component={HeaderStack}
        options={{
          tabBarLabel: () => null,
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Dashboard"
        component={DashboardStack}
        options={{
          tabBarLabel: () => null,
          tabBarIcon: ({ color, size }) => (
            <Icon name="piechart" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Adicionar Ganho"
        component={AdicionarGanho}
        options={{
          tabBarLabel: () => null,
          tabBarIcon: ({ color, size }) => (
            <Icon name="pluscircleo" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Adicionar Gasto"
        component={AdicionarGastos}
        options={{
          tabBarLabel: () => null,
          tabBarIcon: ({ color, size }) => (
            <Icon name="minuscircleo" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default MainTabs;
