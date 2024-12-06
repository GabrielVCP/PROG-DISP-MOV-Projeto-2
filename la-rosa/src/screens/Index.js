import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../styles/styles';

export default function Index({ navigation }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('AddProperty')}
      >
        <Text style={styles.buttonText}>Cadastrar Imóvel</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, styles.buttonSecondary]}
        onPress={() => navigation.navigate('AllProperties')}
      >
        <Text style={styles.buttonText}>Ver Todos os Imóveis</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, styles.button]}
        onPress={() => navigation.navigate('ConsultaCEP')}
      >
        <Text style={styles.buttonText}>Consultar CEP</Text>
      </TouchableOpacity>
    </View>
  );
}
