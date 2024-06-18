import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Modal, FlatList } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { TextInputMask } from 'react-native-masked-text';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Category {
  id: string;
  description: string;
}

const CustomPicker = ({ selectedValue, onValueChange, items }: { selectedValue: string | null, onValueChange: (value: string | null) => void, items: Category[] }) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View>
      <TouchableOpacity style={styles.input} onPress={() => setModalVisible(true)}>
        <Text>{selectedValue ? items.find(item => item.id === selectedValue)?.description : "Selecione uma categoria"}</Text>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <FlatList
              data={items}
              keyExtractor={item => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.modalItem}
                  onPress={() => {
                    onValueChange(item.id);
                    setModalVisible(false);
                  }}
                >
                  <Text>{item.description}</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={styles.modalClose}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const App = () => {
  const navigation = useNavigation();
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [date, setDate] = useState('');
  const [isRecurring, setIsRecurring] = useState(false);
  const [balance, setBalance] = useState('');

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
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
      setCategories(responseBody);
    } catch (error) {
      Alert.alert('Erro', 'Falha ao buscar categorias');
    }
  };

  const handleAddTransaction = async () => {
    const token = await AsyncStorage.getItem('userToken');
    try {

      const [day, month, year] = date.split('/');
      const utcDate = new Date(Date.UTC(parseInt(year), parseInt(month) - 1, parseInt(day))).toISOString();

      const response = await fetch('http://localhost:5208/Transaction', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          value: -Math.abs(parseFloat(balance.replace('R$', '').replace('.', '').replace(',', '.'))), // Negative value
          categoryId: category,
          isRecurrent: isRecurring,
          date: utcDate,
          description: description
        })
      });
      
      if (response.ok) {
        Alert.alert('Sucesso', 'Transação adicionada com sucesso!');
        setDescription('');
        setCategory(null);
        setDate('');
        setIsRecurring(false);
        setBalance('');
      } else {
        Alert.alert('Erro', 'Falha ao adicionar a transação');
      }
    } catch (error) {
      Alert.alert('Erro', 'Falha ao adicionar a transação');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View style={styles.header}>
          <Text style={styles.headerText}>-</Text>
          <TextInputMask
            type={'money'}
            options={{
              precision: 2,
              separator: ',',
              delimiter: '.',
              unit: 'R$ ',
              suffixUnit: ''
            }}
            style={styles.balanceInput}
            placeholder="R$ 0,00"
            value={balance}
            onChangeText={setBalance}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.form}>
          <Text style={styles.label}>Descrição</Text>
          <TextInput
            style={styles.input}
            placeholder="Adicione sua descrição"
            value={description}
            onChangeText={setDescription}
          />

          <Text style={styles.label}>Categoria</Text>
          <CustomPicker
            selectedValue={category}
            onValueChange={setCategory}
            items={categories}
          />

          <Text style={styles.label}>Data</Text>
          <TextInputMask
            type={'datetime'}
            options={{
              format: 'DD/MM/YYYY'
            }}
            style={styles.input}
            placeholder="dd/mm/aaaa"
            value={date}
            onChangeText={setDate}
          />

          <View style={styles.checkboxContainer}>
            <CheckBox
              value={isRecurring}
              onValueChange={setIsRecurring}
            />
            <Text style={styles.checkboxLabel}>Gasto recorrente</Text>
          </View>

          <TouchableOpacity style={styles.addButton} onPress={handleAddTransaction}>
            <Text style={styles.addButtonText}>Adicionar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.floatingButton} onPress={() => {
            navigation.navigate('Dashboard' as never);
          }}>
            <Text style={styles.floatingButtonText}>Voltar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#FF0000',
    paddingVertical: 74,
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 60,
    color: 'white',
    width: 35,
  },
  balanceInput: {
    fontSize: 40,
    color: 'white',
    borderBottomColor: 'white',
    width: 325,
    textAlign: 'right',
    fontWeight: 'bold',
  },
  form: {
    padding: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
    justifyContent: 'center', // Center text vertically
  },
  pickerContainer: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkboxLabel: {
    marginLeft: 10,
    fontSize: 18,
  },
  addButton: {
    backgroundColor: '#1E90FF',
    width: 200,
    justifyContent: 'center',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    alignSelf: 'center',
  },
  addButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  floatingButton: {
    backgroundColor: 'rgba(0, 0, 0, 0)', // Cor transparente
    width: 100,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 10,
    alignSelf: 'center',
  },
  floatingButtonText: {
    color: '#96CEB4',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: 300,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalItem: {
    padding: 10,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    width: '100%',
  },
  modalClose: {
    marginTop: 20,
    color: '#1E90FF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default App;
