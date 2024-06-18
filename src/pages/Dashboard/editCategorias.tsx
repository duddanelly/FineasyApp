import React, { useEffect, useState } from 'react';
import { TouchableOpacity, SafeAreaView, StyleSheet, Text, View, FlatList, Alert } from 'react-native';
import Header from '../../components/Header/headerIndex';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Categoria {
  id: string;
  user: string;
  description: string;
  color: string;
  dateCreated: string;
}

const EditCategorias: React.FC = () => {
  const navigation = useNavigation();
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const { token } = useAuth();

  useEffect(() => {
    fetchCategorias();
  }, []);

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
      console.log(responseBody)
      if (response.status === 200) {
        console.log("Deu boa:", responseBody);
        setCategorias(responseBody);
      } else {
        console.error('Erro na resposta do servidor:', responseBody);
        // Alert.alert('Erro', response.data || 'Algo deu errado.');
      }
    } catch (error) {
      console.error('Erro ao buscar categorias:', error);
      Alert.alert('Erro', `Não foi possível se conectar ao servidor. Detalhes: ${error}`);
    }
  };

  const removeCategoria = async (categoriaId: string) => {
    try {
      await api.delete(`/Category/${categoriaId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      fetchCategorias();
    } catch (error) {
      console.error('Error removing categoria:', error);
    }
  };

  const renderItem = ({ item }: { item: Categoria }) => (
    <View style={styles.categoriaItem}>
      <View style={[styles.colorCircle, { backgroundColor: item.color }]}></View>
      <Text style={styles.categoriaText}>{item.description}</Text>
      {/* <TouchableOpacity
        style={styles.removeButton}
        onPress={() => removeCategoria(item.id)}
      >
        <Text style={styles.removeButtonText}>-</Text>
      </TouchableOpacity> */}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <View style={styles.CatContainer}>
        <Text style={styles.sectionTitle}>Lista de Categorias</Text>
        <FlatList
          data={categorias}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={() => <View style={styles.categoriaSeparator} />}
        />
      </View>
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => navigation.navigate('Dashboard' as never)}
      >
        <Text style={styles.floatingButtonText}>Voltar</Text>
      </TouchableOpacity>
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
  colorCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    marginRight: 10,
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

export default EditCategorias;
