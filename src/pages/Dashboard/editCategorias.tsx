import React, { useEffect } from 'react';
import { TouchableOpacity, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import Header from '../../components/Header/headerIndex';
import { useNavigation } from '@react-navigation/native';
import api from '../../services/api';
import axios from 'axios';

const Movimentacoes: React.FC = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <Header />
        <View style={styles.CatContainer}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Lista de Categorias</Text>

            <View style={styles.categoriaItem}>
              <Text style={styles.categoriaText}>Categoria 1</Text>
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => {
                  // adicionar aqui a lógica para remover a categoria
                }}
              >
                <Text style={styles.removeButtonText}>-</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.categoriaSeparator} />
          </View>
        </View>
        <TouchableOpacity style={styles.floatingButton} onPress={() => navigation.navigate('Dashboard' as never)}>
          <Text style={styles.floatingButtonText}>Voltar</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  CatContainer: {
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
  categoriaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
  },
  categoriaText: {
    fontSize: 16,
    color: '#000000',
  },
  removeButton: {
    borderColor: '#FF6D01',
    borderWidth: 1,
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  removeButtonText: {
    color: '#FF6D01',
    fontWeight: 'bold',
  },
  categoriaSeparator: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginVertical: 5,
  },
  floatingButtonText: {
    color: '#96CEB4',
    fontSize: 18,
    fontWeight: 'bold',
  },
  floatingButton: {
    backgroundColor: 'rgba(0, 0, 0, 0)',
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 10,
    alignSelf: 'center',
  },
});

export default Movimentacoes;
