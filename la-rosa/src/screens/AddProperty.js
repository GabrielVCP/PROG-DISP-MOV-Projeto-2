import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../styles/styles';

export default function AddProperty({ route, navigation }) {
  const [type, setType] = useState('');
  const [bedrooms, setBedrooms] = useState('');
  const [bathrooms, setBathrooms] = useState('');
  const [price, setPrice] = useState('');
  const [message, setMessage] = useState('');
  const [editing, setEditing] = useState(false);
  const [propertyId, setPropertyId] = useState(null);

  useEffect(() => {
    if (route.params?.property) {
      const { property } = route.params;
      setType(property.type);
      setBedrooms(String(property.bedrooms));
      setBathrooms(String(property.bathrooms));
      setPrice(String(property.price));
      setEditing(true);
      setPropertyId(property.id);
    }
  }, [route.params]);

  const handleSave = async () => {
    if (type && bedrooms && bathrooms && price) {
      const newProperty = {
        id: editing ? propertyId : Date.now().toString(),
        type,
        bedrooms: parseInt(bedrooms),
        bathrooms: parseInt(bathrooms),
        price: parseFloat(price),
      };

      try {
        const storedProperties = await AsyncStorage.getItem('properties');
        const properties = storedProperties ? JSON.parse(storedProperties) : [];
        if (editing) {
          const updatedProperties = properties.map((item) =>
            item.id === propertyId ? newProperty : item
          );
          await AsyncStorage.setItem('properties', JSON.stringify(updatedProperties));
        } else {
          properties.push(newProperty);
          await AsyncStorage.setItem('properties', JSON.stringify(properties));
        }
        setMessage(editing ? 'Imóvel atualizado com sucesso!' : 'Imóvel cadastrado com sucesso!');
        setType('');
        setBedrooms('');
        setBathrooms('');
        setPrice('');
        setEditing(false);
        navigation.navigate('Index');
      } catch (error) {
        console.error(error);
        setMessage('Erro ao salvar o imóvel.');
      }
    } else {
      setMessage('Por favor, preencha todos os campos.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title2}>{editing ? 'Editar Imóvel' : 'Cadastrar Imóvel'}</Text>
      <TextInput
        style={styles.input}
        placeholder="Tipo de imóvel"
        value={type}
        onChangeText={setType}
      />
      <TextInput
        style={styles.input}
        placeholder="Dormitórios"
        value={bedrooms}
        onChangeText={setBedrooms}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Banheiros"
        value={bathrooms}
        onChangeText={setBathrooms}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Preço"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />
      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Salvar</Text>
      </TouchableOpacity>
      {message ? <Text style={styles.message}>{message}</Text> : null}
    </View>
  );
}
