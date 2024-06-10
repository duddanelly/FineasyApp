import React, { useState } from 'react';
import {SafeAreaView, ScrollView, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import { TextInputMask } from 'react-native-masked-text';
import { useNavigation } from '@react-navigation/native';

const App = () => {
  const navigation = useNavigation();
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');
  const [isRecurring, setIsRecurring] = useState(false);
  const [balance, setBalance] = useState('');

  return (
    <SafeAreaView style={styles.container}>
    <ScrollView contentInsetAdjustmentBehavior="automatic">
      <View style={styles.header}>
        <Text style={styles.headerText}>+</Text>
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
        <TextInput
          style={styles.input}
          placeholder="Adicione sua categoria"
          value={category}
          onChangeText={setCategory}
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
          <Text style={styles.checkboxLabel}>Ganho recorrente</Text>
        </View>

        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>Adicionar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.floatingButton } onPress={() => {
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
    backgroundColor: '#00FF89',
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
});

export default App;
