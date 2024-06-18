import React, { useState, useEffect, useCallback } from 'react';
import { TouchableOpacity, SafeAreaView, ScrollView, StyleSheet, Text, View, Alert } from 'react-native';
import Header from '../../components/Header/headerIndex';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import LoadingScreen from '../Loading/loading';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Transaction {
  id: string;
  description: string;
  value: number;
  date: string;
  categoryId: string;
  isRecurrent: boolean;
}

const HomeScreen: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [balance, setBalance] = useState<number | null>(null);
  const [ganhos, setGanhos] = useState<number>(0);
  const [gastos, setGastos] = useState<number>(0);
  const navigation = useNavigation();

  const fetchBalance = async () => {
    const token = await AsyncStorage.getItem('userToken');
    try {
      const response = await fetch('http://localhost:5208/User', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      const responseBody = await response.json();
      if (response.status === 200) {
        setBalance(responseBody.balance);
      } else {
        console.error('Erro na resposta do servidor:', responseBody);
      }
    } catch (error) {
      console.error('Erro ao buscar saldo:', error);
      Alert.alert('Erro', `Não foi possível se conectar ao servidor. Detalhes: ${error}`);
    }
  };

  const fetchTransaction = async () => {
    const token = await AsyncStorage.getItem('userToken');
    try {
      const response = await fetch('http://localhost:5208/Transaction', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const responseBody = await response.json();
      if (responseBody && Array.isArray(responseBody)) {
        setTransactions(responseBody.slice(0, 4));
        calculateGanhosEGastos(responseBody);
      } else {
        console.error('Unexpected response format:', responseBody);
        Alert.alert('Erro', 'Resposta inesperada ao buscar transações.');
      }
    } catch (error) {
      console.error('Erro ao buscar transações:', error);
      Alert.alert('Erro', `Não foi possível se conectar ao servidor. Detalhes: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  const calculateGanhosEGastos = (transactions: Transaction[]) => {
    let ganhosTotal = 0;
    let gastosTotal = 0;
    transactions.forEach(transaction => {
      if (transaction.value > 0) {
        ganhosTotal += transaction.value;
      } else {
        gastosTotal += transaction.value;
      }
    });
    setGanhos(ganhosTotal);
    setGastos(gastosTotal);
  };

  useFocusEffect(
    useCallback(() => {
      fetchBalance();
      fetchTransaction();
    }, [])
  );

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <Header />
        <View style={styles.balanceContainer}>
          <Text style={styles.balanceLabel}>Saldo geral</Text>
          <Text style={styles.balanceAmount}>R$ {balance?.toFixed(2)}</Text>
        </View>
        <View style={styles.overviewContainer}>
          <View style={styles.overviewItem}>
            <Text style={[styles.overviewAmount, styles.gainsAmount]}>R$ {ganhos.toFixed(2)}</Text>
            <Text style={styles.overviewLabel}>Ganhos</Text>
          </View>
          <View style={styles.overviewItem}>
            <Text style={[styles.overviewAmount, styles.expensesAmount]}>R$ {gastos.toFixed(2)}</Text>
            <Text style={styles.overviewLabel}>Gastos</Text>
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Próximos lançamentos</Text>
          <View style={styles.upcomingItem}>
            <Text style={styles.upcomingTitle}>Conta de telefone</Text>
            <Text style={styles.upcomingDate}>03/MAI</Text>
            <Text style={styles.upcomingAmount}>R$ 67,90</Text>
          </View>
          <View style={styles.upcomingItem}>
            <Text style={styles.upcomingTitle}>Netflix</Text>
            <Text style={styles.upcomingDate}>10/MAI</Text>
            <Text style={styles.upcomingAmount}>R$ 70,00</Text>
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Últimas Movimentações</Text>
          {transactions.length > 0 ? (
            transactions.map(transaction => (
              <View key={transaction.id} style={styles.transactionItem}>
                <Text style={styles.transactionDescription}>{transaction.description}</Text>
                <Text
                  style={[
                    styles.transactionValue,
                    transaction.value < 0 ? styles.negativeValue : styles.positiveValue,
                  ]}
                >
                  R$ {transaction.value.toFixed(2)}
                </Text>
                <Text style={styles.transactionDate}>
                  {new Date(transaction.date).toLocaleDateString()}
                </Text>
              </View>
            ))
          ) : (
            <Text style={styles.noTransactionsText}>Nenhuma transação encontrada.</Text>
          )}
          <TouchableOpacity
            style={[styles.floatingButton, { backgroundColor: '#96CEB4' }]}
            onPress={() => {
              navigation.navigate('Movimentacoes' as never);
            }}
          >
            <Text style={styles.floatingButtonText}>Histórico de Movimentações</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  balanceContainer: {
    backgroundColor: '#ffffff',
    padding: 20,
    marginHorizontal: 20,
    marginTop: -20,
    borderRadius: 10,
    alignItems: 'center', 
    elevation: 2,
  },
  balanceLabel: {
    fontSize: 16,
    color: '#b0b0b0',
  },
  balanceAmount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000000',
  },
  overviewContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 20,
    marginTop: 20,
  },
  overviewItem: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 2,
    flex: 1,
    marginHorizontal: 10,
  },
  overviewAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
  },
  gainsAmount: {
    color: '#27ae60',
  },
  expensesAmount: {
    color: '#e74c3c',
  },
  overviewLabel: {
    fontSize: 14,
    color: '#b0b0b0',
  },
  section: {
    marginTop: 20,
    marginHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 10,
  },
  upcomingItem: {
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
  },
  upcomingTitle: {
    fontSize: 16,
    color: '#000000',
  },
  upcomingDate: {
    fontSize: 14,
    color: '#b0b0b0',
  },
  upcomingAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#e74c3c',
  },
  transactionItem: {
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
  },
  transactionDescription: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  transactionValue: {
    fontSize: 14,
  },
  positiveValue: {
    color: '#27ae60',
  },
  negativeValue: {
    color: '#e74c3c',
  },
  transactionDate: {
    fontSize: 12,
    color: '#777',
    marginTop: 5,
  },
  noTransactionsText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginTop: 20,
  },
  floatingButton: {
    backgroundColor: '#6fcf97',
    width: 270, 
    padding: 10,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 20,
    alignSelf: 'center',
  },
  floatingButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default HomeScreen;
