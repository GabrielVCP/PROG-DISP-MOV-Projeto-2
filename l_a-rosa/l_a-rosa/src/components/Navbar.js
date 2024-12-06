import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Weather from './Weather';
import styles from '../styles/styles';

const Navbar = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.navbar}>
      <TouchableOpacity onPress={() => navigation.navigate('Index')} style={styles.logoContainer}>
        <Text style={styles.logo}>L.A.Rosa</Text>
      </TouchableOpacity>
      <Weather />
    </View>
  );
};

export default Navbar;
