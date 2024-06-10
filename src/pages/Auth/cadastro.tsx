import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const CadastroScreen: React.FC = () => {
  const navigation = useNavigation();

  const handleSignUp = () => {
    // Lógica de cadastro
  };



  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Image source={{ uri: '/Users/mariamuncinelli/FACULDADE/P5_MOBILE/Fineasy/src/assets/Logo' }} style={styles.logo} />
        <Text style={styles.appName}>FINEASY</Text>
      </View>
      <Text style={styles.signUpText}>Cadastro</Text>
      <TextInput style={styles.input} placeholder="Insira seu email" placeholderTextColor="#999" />
      <TextInput style={styles.input} placeholder="Insira sua senha" placeholderTextColor="#999" secureTextEntry />
      <TextInput style={styles.input} placeholder="Confirme sua senha" placeholderTextColor="#999" secureTextEntry />
      <TouchableOpacity style={styles.signUpButton}>
        <Text style={styles.signUpButtonText} onPress={() => {
          navigation.navigate('Login' as never);
        }} >Registrar</Text>
      </TouchableOpacity>
      <Text style={styles.loginText}>
        Já possui conta? <Text style={styles.loginLink} onPress={() => {
          navigation.navigate('Login' as never);
        }}>Faça o Login</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F5F7',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 10,
  },
  appName: {
    fontSize: 18,
    color: '#96CEB4',
    fontWeight: 'bold',
  },
  signUpText: {
    fontSize: 32,
    color: '#96CEB4',
    marginBottom: 30,
    fontWeight: 'bold',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    paddingHorizontal: 20,
    fontSize: 16,
    color: '#333',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  signUpButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#96CEB4',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  signUpButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loginText: {
    color: '#333',
  },
  loginLink: {
    color: '#7D9D91',
    textDecorationLine: 'underline',
  },
});

export default CadastroScreen;
