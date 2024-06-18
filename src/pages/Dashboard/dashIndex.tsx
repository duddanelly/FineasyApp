import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, StatusBar, Alert } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import Header from '../../components/Header/headerIndex';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const screenWidth = Dimensions.get('window').width;

interface Transaction {
  id: string;
  description: string;
  value: number;
  date: string;
  category: {
    id: string;
    description: string;
    color: string;
  };
  isRecurrent: boolean;
}

interface Categoria {
  id: string;
  description: string;
  color: string;
  totalValue?: number;
}

const chartConfig = {
  backgroundGradientFrom: "#1E2923",
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: "#08130D",
  backgroundGradientToOpacity: 0.5,
  color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
  strokeWidth: 2, 
  barPercentage: 0.5,
  useShadowColorFromDataset: false 
};

const Dashboard = () => {
  const navigation = useNavigation();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [chartData, setChartData] = useState<any[]>([]);

  const fetchTransaction = async () => {
    const token = await AsyncStorage.getItem('userToken');
    try {
      const response = await fetch('http://localhost:5208/Transaction', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      const responseBody = await response.json();
      if (response.status === 200) {
        setTransactions(responseBody);
      } else {
        console.error('Erro na resposta do servidor:', responseBody);
        Alert.alert('Erro', 'Algo deu errado ao buscar as transações.');
      }
    } catch (error) {
      console.error('Erro ao buscar transações:', error);
      Alert.alert('Erro', `Não foi possível se conectar ao servidor. Detalhes: ${error}`);
    }
  };

  const fetchCategorias = async () => {
    const token = await AsyncStorage.getItem('userToken');
    try {
      const response = await fetch('http://localhost:5208/Category', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
      const responseBody = await response.json();
      if (response.status === 200) {
        setCategorias(responseBody);
      } else {
        console.error('Erro na resposta do servidor:', responseBody);
      }
    } catch (error) {
      console.error('Erro ao buscar categorias:', error);
      Alert.alert('Erro', `Não foi possível se conectar ao servidor. Detalhes: ${error}`);
    }
  };

  useEffect(() => {
    fetchCategorias();
    fetchTransaction();
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchCategorias();
      fetchTransaction();
    }, [])
  );

  useEffect(() => {
    if (transactions.length > 0 && categorias.length > 0) {
      prepareChartData();
    }
  }, [transactions, categorias]);

  const prepareChartData = () => {
    const categoryMap: { [key: string]: Categoria } = categorias.reduce((acc, categoria) => {
      acc[categoria.id] = {
        ...categoria,
        totalValue: 0
      };
      return acc;
    }, {} as { [key: string]: Categoria });

    transactions.forEach(transaction => {
      if (categoryMap[transaction.category.id]) {
        categoryMap[transaction.category.id].totalValue! += Math.abs(transaction.value);
      }
    });

    const data = Object.values(categoryMap).map(categoria => {
      const population = typeof categoria.totalValue === 'number' ? parseFloat(categoria.totalValue.toFixed(2)) : 0;
    
      return {
        name: categoria.description,
        population: population,
        color: categoria.color,
        legendFontColor: '#7F7F7F',
        legendFontSize: 15
      };
    });
    
    setChartData(data);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Header />
      <View style={styles.DashContainer}>
        <Text style={styles.sectionTitle}>Dashboard</Text>
        <View style={styles.dashboard}>
          <TouchableOpacity style={styles.buttonAddIncome} onPress={() => {
            navigation.navigate('AdicionarGanho' as never);
          }}>
            <Text style={styles.buttonText}>Adicionar ganhos</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonAddExpense} onPress={() => {
            navigation.navigate('AdicionarGastos' as never);
          }}>
            <Text style={styles.buttonText}>Adicionar gastos</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.chartContainer}>
        <Text style={styles.chartTitle}>Despesas por categoria</Text>
        <PieChart
          data={chartData}
          width={screenWidth}
          height={220}
          chartConfig={chartConfig}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
          absolute
        />
        <TouchableOpacity
          style={styles.categoryButton}
          onPress={() => {
            navigation.navigate('EditCategoria' as never);
          }}
        >
          <Text style={styles.categoryButtonText}>Categorias</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.floatingButton}
          onPress={() => {
            navigation.navigate('Categoria' as never);
          }}
        >
          <Text style={styles.floatingButtonText}>+</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.reloadButton} onPress={() => {
        fetchCategorias();
        fetchTransaction();
      }}>
        <Text style={styles.reloadButtonText}>Recarregar Dados</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  header: {
    backgroundColor: '#aedecf',
    paddingVertical: 20,
    alignItems: 'center',
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginBottom: 10,
  },
  welcomeText: {
    fontSize: 16,
    color: '#333',
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  dashboard: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
  },
  buttonAddIncome: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
  },
  buttonAddExpense: {
    backgroundColor: '#F44336',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  chartContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 10,
    marginVertical: 10,
    alignItems: 'center',
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  categoryButton: {
    bottom: -35,
    backgroundColor: '#aedecf',
    padding: 10,
    borderRadius: 5,
    alignSelf: 'flex-start'
  },
  categoryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  floatingButton: {
    position: 'relative',
    bottom: 10,
    right: 30,
    backgroundColor: '#aedecf',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
  },
  floatingButtonText: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
  DashContainer: {
    backgroundColor: '#ffffff',
    padding: 15,
    marginHorizontal: 10,
    marginTop: -20,
    borderRadius: 10,
    elevation: 2,
    marginVertical: 5,
  },
  sectionTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#96CEB4',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  reloadButton: {
    backgroundColor: '#aedecf',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    margin: 10,
  },
  reloadButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Dashboard;
