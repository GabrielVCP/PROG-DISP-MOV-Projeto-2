import React, { useEffect, useState } from 'react';
import { View, ScrollView, Alert, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PropertyCard from '../components/PropertyCard';
import styles from '../styles/styles';

export default function AllProperties({ navigation }) {
  const [properties, setProperties] = useState([]);

  const fetchProperties = async () => {
    try {
      const storedProperties = await AsyncStorage.getItem('properties');
      const properties = storedProperties ? JSON.parse(storedProperties) : [];
      setProperties(properties);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (property) => {
    navigation.navigate('AddProperty', { property });
  };

  const handleDelete = async (id) => {
    Alert.alert(
      'Excluir Imóvel',
      'Tem certeza que deseja excluir este imóvel?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            try {
              const filteredProperties = properties.filter((item) => item.id !== id);
              await AsyncStorage.setItem('properties', JSON.stringify(filteredProperties));
              setProperties(filteredProperties);
            } catch (error) {
              console.error(error);
            }
          },
        },
      ]
    );
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title2}>Todos os Imóveis</Text>
      <View style={styles.propertyList}>
        {properties.map((property) => (
          <PropertyCard
            key={property.id}
            property={property}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </View>
    </ScrollView>
  );
}
