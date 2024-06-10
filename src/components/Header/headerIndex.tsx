import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { useNavigation } from '@react-navigation/native';
import { launchImageLibrary, ImageLibraryOptions } from 'react-native-image-picker';


export default function Header() {
  const navigation = useNavigation();
  // const [imageUri, setImageUri] = useState<string | null>(null);

  // const handleSelectImage = () => {
  //   const options: ImageLibraryOptions = {
  //     mediaType: 'photo',
  //     maxWidth: 300,
  //     maxHeight: 300,
  //     quality: 1,
  //   };

  //   launchImageLibrary(options, (response) => {
  //     if (response.didCancel) {
  //       console.log('User cancelled image picker');
  //     } else if (response.errorCode) {
  //       console.log('ImagePicker Error: ', response.errorMessage);
  //     } else if (response.assets && response.assets.length > 0 && response.assets[0].uri) {
  //       setImageUri(response.assets[0].uri);
  //     }
  //   });
  // };

  return (
    <View style={styles.headerContainer}>
      <View style={styles.iconsContainer}>
        <TouchableOpacity>
          <Icon name="logout" color='white' size={25} style={styles.headerIcon} onPress={() => {
            navigation.navigate('Login' as never);
          }} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon name="bells" color='white' size={25} style={styles.headerIcon} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon name="questioncircleo" color='white' size={25} style={styles.headerIcon} />
        </TouchableOpacity>
      </View>
      <View style={styles.header}>
        {/* <TouchableOpacity onPress={handleSelectImage}> */}
        <Image source={{ uri: '/Users/mariamuncinelli/FACULDADE/P5_MOBILE/FineasyApp/src/assets/Logo.png' }} style={styles.profileImage} />

        {/* </TouchableOpacity> */}
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
    // borderRadius: 50,
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
