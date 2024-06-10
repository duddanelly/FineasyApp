import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const LoginScreen: React.FC = () => {
  const navigation = useNavigation();

  const handleLogin = () => {
    // Lógica de login
  };

  const handleForgotPassword = () => {
    // Lógica de recuperação de senha
  };

  const handleSignUp = () => {
    // navigation.navigate('SignUp');
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Image source={{ uri: '/Users/mariamuncinelli/FACULDADE/P5_MOBILE/FineasyApp/src/assets/Logo.png' }} style={styles.logo} />
        <Text style={styles.appName}>FINEASY</Text>
      </View>
      <Text style={styles.loginText}>Login</Text>
      <TextInput style={styles.input} placeholder="Insira seu email" placeholderTextColor="#999" />
      <TextInput style={styles.input} placeholder="Insira sua senha" placeholderTextColor="#999" secureTextEntry />
      <TouchableOpacity onPress={handleForgotPassword}>
        <Text style={styles.forgotPasswordText}>Esqueceu sua senha?</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText} onPress={() => {
          navigation.navigate('HomeScreen' as never);
        }} >Faça o login</Text>
      </TouchableOpacity>
      <Text style={styles.signUpText}>
        Não possui conta? <Text style={styles.signUpLink} onPress={() => {
          navigation.navigate('Cadastro' as never);
        }}>Faça o Autocadastro</Text>
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
  loginText: {
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
  forgotPasswordText: {
    color: '#7D9D91',
    marginBottom: 30,
  },
  loginButton: {
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
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  signUpText: {
    color: '#333',
  },
  signUpLink: {
    color: '#7D9D91',
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;
