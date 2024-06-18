import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Platform } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '../../context/AuthContext'; 

export default function Header() {
  const navigation = useNavigation();
  const { setToken } = useAuth();

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userToken');
      setToken(null);
      navigation.navigate('Login' as never);
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  };

  return (
    <View style={styles.headerContainer}>
      <View style={styles.iconsContainer}>
        <TouchableOpacity onPress={handleLogout}>
          <Image 
            source={{ uri: '/Users/mariamuncinelli/FACULDADE/P5_MOBILE/FineasyApp/src/assets/icons8-logout-50.png' }} 
            style={styles.logoutIcon} 
          />
        </TouchableOpacity>
      </View>
      <View style={styles.header}>
        <Image source={{ uri: '/Users/mariamuncinelli/FACULDADE/P5_MOBILE/FineasyApp/src/assets/porcobranco.png' }} style={styles.profileImage} />
        <Text style={styles.welcomeText}>Seja bem vindo ao</Text>
        <Text style={styles.userName}>Fineasy!</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: '#6fcf97',
    padding: 30,
    alignItems: 'center',
  },
  iconsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: '100%',
    position: 'absolute',
    top: Platform.OS === 'ios' ? getStatusBarHeight() : 0,
    right: 10,
  },
  header: {
    alignItems: 'center',
  },
  profileImage: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  welcomeText: {
    fontSize: 18,
    color: '#ffffff',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  logoutIcon: {
    width: 25, // ajuste conforme necessário
    height: 25, // ajuste conforme necessário
    marginLeft: 10,
  },
});
