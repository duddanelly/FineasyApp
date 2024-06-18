import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/pages/Home/index';
import Dashboard from './src/pages/Dashboard/dashIndex';
import Login from './src/pages/Auth/login';
import Cadastro from './src/pages/Auth/cadastro';
import Categoria from './src/pages/Dashboard/categorias';
import AdicionarGanho from './src/pages/AdicionarGanhos/ganhosIndex';
import AdicionarGastos from './src/pages/AdicionarGastos/gastosIndex';
import Icon from 'react-native-vector-icons/AntDesign';
import Movimentacoes from './src/pages/Home/movimentacoes'
import Loading from './src/pages/Loading/loading'
import EditCategoria from './src/pages/Dashboard/editCategorias'
import { AuthProvider } from './src/context/AuthContext';

const Tab = createBottomTabNavigator();
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

function HeaderStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Cadastro" component={Cadastro} />
      <Stack.Screen name="Movimentacoes" component={Movimentacoes} />
      <Stack.Screen name="Loading" component={Loading} />
    </Stack.Navigator>
  );
}

function MyTabs() {
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

export default function App() {
  return (
    <AuthProvider>
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
    </AuthProvider>
    
    // <Loading/>
  );


  
}