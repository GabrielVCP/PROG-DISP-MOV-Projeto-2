import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import viacep from '../components/Apicep';
import styles from '../styles/styles';

export default function ConsultaCEP({ navigation }) {
  const [cep, setCep] = useState('');
  const [resultado, setResultado] = useState(null);
  const [error, setError] = useState(null);

  const consultaCep = async (cep) => {
    if (!cep || cep.length < 8) {
      setError('Digite um CEP válido com 8 dígitos.');
      return;
    }
    try {
      const response = await viacep.get(`/${cep}/json/`);
      if (response.data.erro) {
        setError('CEP não encontrado.');
        setResultado(null);
      } else {
        setResultado(response.data);
        setError(null);
      }
    } catch (e) {
      setError('Erro ao consultar o CEP.');
      setResultado(null);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title2}>Consultar CEP</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite o CEP (apenas números)"
        value={cep}
        onChangeText={(texto) => setCep(texto)}
        keyboardType="numeric"
        maxLength={8}
      />
      {error && <Text style={styles.message}>{error}</Text>}
      <TouchableOpacity style={styles.button} onPress={() => consultaCep(cep)}>
        <Text style={styles.buttonText}>Consultar</Text>
      </TouchableOpacity>

      {resultado && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>CEP: {resultado.cep}</Text>
          <Text style={styles.resultText}>Logradouro: {resultado.logradouro}</Text>
          <Text style={styles.resultText}>Bairro: {resultado.bairro}</Text>
          <Text style={styles.resultText}>Cidade: {resultado.localidade}</Text>
          <Text style={styles.resultText}>Estado: {resultado.uf}</Text>
        </View>
      )}
    </View>
  );
}
