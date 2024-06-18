import React, { useEffect, useState } from 'react';
import { TouchableOpacity, SafeAreaView, ScrollView, StyleSheet, Text, View, Alert } from 'react-native';
import Header from '../../components/Header/headerIndex';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Transaction {
  id: string;
  description: string;
  value: number;
  date: string;
  categoryId: string;
  isRecurrent: boolean;
}

const Movimentacoes: React.FC = () => {
  const navigation = useNavigation();
  const [transactions, setTransactions] = useState<Transaction[]>([]);

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

  useEffect(() => {
    fetchTransaction();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <Header />
        <View style={styles.MovContainer}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Movimentações</Text>
            {transactions.length > 0 ? (
              transactions.map(transaction => (
                <View key={transaction.id} style={styles.transactionItem}>
                  <Text style={styles.transactionDescription}>{transaction.description}</Text>
                  <Text style={styles.transactionValue}>R$ {transaction.value.toFixed(2)}</Text>
                  <Text style={styles.transactionDate}>{new Date(transaction.date).toLocaleDateString()}</Text>
                </View>
              ))
            ) : (
              <Text style={styles.noTransactionsText}>Nenhuma transação encontrada.</Text>
            )}
          </View>
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
  MovContainer: {
    backgroundColor: '#ffffff',
    padding: 20,
    marginHorizontal: 20,
    marginTop: -20,
    borderRadius: 10,
    elevation: 2,
  },
  section: {
    marginTop: 10,
    marginHorizontal: 20,
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
  transactionItem: {
    padding: 15,
    marginVertical: 10,
    backgroundColor: '#e7f9f2',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  transactionDescription: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  transactionValue: {
    fontSize: 16,
    color: '#333',
  },
  transactionDate: {
    fontSize: 14,
    color: '#777',
    marginTop: 5,
  },
  noTransactionsText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default Movimentacoes;
