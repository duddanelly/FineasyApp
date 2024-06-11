import React, { useEffect } from 'react';
import { TouchableOpacity, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import Header from '../../components/Header/headerIndex';
import { useNavigation } from '@react-navigation/native';
import api from '../../services/api';
import axios from 'axios';

const Movimentacoes: React.FC = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const login = async () => {
      try {
        const response = await api.get("/Category");
        console.log("Deu boa:", response.data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response) {
            console.error("Erro no servidor:", error.response.data);
            console.error("Código de status:", error.response.status);
            console.error("Cabeçalhos:", error.response.headers);
          } else if (error.request) {
            console.error("Nenhuma resposta recebida:", error.request);
          } else {
            console.error("Erro:", error.message);
          }
        } else {
          console.error("Erro desconhecido:", error);
        }
      }
    };

    login();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <Header />
        <View style={styles.MovContainer}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Movimentações</Text>
            {/* Exemplo de dados estáticos */}
            <View style={styles.transactionItem}>
              <Text style={styles.transactionText}>Transação 1</Text>
            </View>
            <View style={styles.transactionSeparator} />
            {/* ... outras transações ... */}
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
    alignItems: 'flex-start',
  },
  transactionText: {
    fontSize: 16,
    color: '#000000',
  },
  transactionSeparator: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginVertical: 5,
  },
});

export default Movimentacoes;
