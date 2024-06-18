import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
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
          <Icon name="logout" color='white' size={25} style={styles.headerIcon} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon name="bells" color='white' size={25} style={styles.headerIcon} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon name="questioncircleo" color='white' size={25} style={styles.headerIcon} />
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
  headerIcon: {
    marginLeft: 10,
  },
});
