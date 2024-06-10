import React, { useState, useEffect } from 'react';
import { TouchableOpacity, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import Header from '../../components/Header/headerIndex';
import { useNavigation } from '@react-navigation/native';
import LoadingScreen from '../Loading/loading'; // Importando a tela de loading

const HomeScreen: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000); 
    
    return () => clearTimeout(timer);
  }, []);

  const navigation = useNavigation();

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <Header />
        <View style={styles.balanceContainer}>
          <Text style={styles.balanceLabel}>Saldo geral</Text>
          <Text style={styles.balanceAmount}>R$ 2500,00</Text>
        </View>
        <View style={styles.overviewContainer}>
          <View style={styles.overviewItem}>
            <Text style={[styles.overviewAmount, styles.gainsAmount]}>R$ 200,00</Text>
            <Text style={styles.overviewLabel}>Ganhos</Text>
          </View>
          <View style={styles.overviewItem}>
            <Text style={[styles.overviewAmount, styles.expensesAmount]}>R$ 150,00</Text>
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
          <View style={styles.transactionItem}>
            <Text style={styles.transactionText}>Transação 1</Text>
          </View>
          <View style={styles.transactionItem}>
            <Text style={styles.transactionText}>Transação 2</Text>
          </View>
          <View style={styles.transactionItem}>
            <Text style={styles.transactionText}>Transação 3</Text>
          </View>
          <View style={styles.transactionItem}>
            <Text style={styles.transactionText}>Transação 4</Text>
          </View>
          <TouchableOpacity style={[styles.floatingButton, { backgroundColor: '#96CEB4' }]} onPress={() => {
            navigation.navigate('Movimentacoes' as never);
          }}>
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
  transactionText: {
    fontSize: 16,
    color: '#000000',
  },
  floatingButton: {
    backgroundColor: '#6fcf97',
    width: 270, 
    padding: 10,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 20,
  },
  floatingButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
