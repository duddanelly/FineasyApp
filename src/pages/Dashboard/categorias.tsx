import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  SafeAreaView, ScrollView, Alert
} from 'react-native';
import Header from '../../components/Header/headerIndex';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddCategoryScreen: React.FC = () => {
  const navigation = useNavigation();
  // const { token } = useAuth();
  const [categoryName, setCategoryName] = useState('');
  const [categoryColor, setCategoryColor] = useState('#6A0DAD');

  const defaultColors = ['#a55eea', '#f54291', '#FF6D01', '#2DBEFC', '#50c878', '#FBBC04'];
  


  const handleAddCategory = async () => {
    console.log(await AsyncStorage.getItem('userToken'))
    const token = await AsyncStorage.getItem('userToken');
    if (!categoryName) {
      Alert.alert('Erro', 'Por favor, insira o nome da categoria.');
      return;
    }
    if (!token) {
      Alert.alert('Erro', 'Usuário não autenticado.');
      return;
    }

    try {
      console.log("lalalalala", token)
      console.log('Tentando adicionar categoria:', { description: categoryName, color: categoryColor });

      const response = await fetch('http://localhost:5208/Category', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ description: categoryName, color: categoryColor }),
      });

      console.log('Resposta do servidor:', response);

      if (response.ok) {
        if (response.headers.get('content-length') === '0') {
          console.warn('A resposta do servidor está vazia.');
          Alert.alert('Erro', 'A resposta do servidor está vazia. Verifique sua conexão.');
          return;
        }

        const responseData = await response.json();
        console.log('Categoria adicionada com sucesso:', responseData);
        Alert.alert('Sucesso', 'Categoria adicionada com sucesso!');
        navigation.navigate('Dashboard' as never);
      } else if (response.status === 401) {
        console.error('Erro na resposta do servidor: Não autorizado');
        Alert.alert('Erro', 'Não autorizado. Verifique suas credenciais.');
      } else {
        const errorData = await response.text();
        console.error('Erro na resposta do servidor:', errorData);
        Alert.alert('Erro', errorData || 'Algo deu errado.');
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
      Alert.alert('Erro', `Não foi possível se conectar ao servidor. Detalhes: `);
    }
  };

  const handleChangeCategoryName = (name: string) => {
    console.log('Novo valor de categoryName:', name);
    setCategoryName(name);
  };

  const handleSelectColor = (color: string) => {
    console.log('Nova cor selecionada:', color);
    setCategoryColor(color);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <Header />
        <View style={styles.formContainer}>
          <Text style={styles.formTitle}>Adicionar Categoria</Text>
          <Text style={styles.label}>Nome da Categoria</Text>
          <TextInput
            style={styles.input}
            placeholder="Adicione o nome da categoria"
            placeholderTextColor="#999"
            value={categoryName}
            onChangeText={handleChangeCategoryName}
          />
          <Text style={styles.label}>Cor da Categoria</Text>
          <View style={styles.colorPickerContainer}>
            {defaultColors.map((color, index) => (
              <TouchableOpacity key={index} onPress={() => handleSelectColor(color)}>
                <View
                  style={[
                    styles.colorPreview,
                    { backgroundColor: color },
                    categoryColor === color && styles.selectedColor,
                  ]}
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <TouchableOpacity style={styles.addButton} onPress={handleAddCategory}>
          <Text style={styles.addButtonText}>Adicionar</Text>
        </TouchableOpacity>

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
    backgroundColor: '#F2F5F7',
  },
  formContainer: {
    backgroundColor: '#FFF',
    margin: 20,
    padding: 20,
    borderRadius: 10,
    marginTop: -20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  formTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#96CEB4',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#F2F5F7',
    borderRadius: 25,
    paddingHorizontal: 20,
    fontSize: 16,
    color: '#333',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#DDD',
  },
  colorPickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  colorPreview: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginVertical: 5,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedColor: {
    borderColor: '#6fcf97',
  },
  addButton: {
    backgroundColor: '#1E90FF',
    width: 200,
    justifyContent: 'center',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  addButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
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

export default AddCategoryScreen;
