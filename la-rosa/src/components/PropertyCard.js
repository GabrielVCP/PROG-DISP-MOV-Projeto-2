import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../styles/styles';

export default function PropertyCard({ property, onEdit, onDelete }) {
  if (!property) {
    return (
      <View style={styles.card}>
        <Text style={styles.cardText}>Imóvel inválido</Text>
      </View>
    );
  }

  const { type, bedrooms, bathrooms, price } = property;

  return (
    <View style={styles.card}>
      <Text style={styles.cardText}>Tipo: {type || 'Não informado'}</Text>
      <Text style={styles.cardText}>Dormitórios: {bedrooms || 0}</Text>
      <Text style={styles.cardText}>Banheiros: {bathrooms || 0}</Text>
      <Text style={styles.cardText}>Preço: R$ {price ? parseFloat(price).toFixed(2) : '0.00'}</Text>
      <View style={styles.cardButtonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => onEdit(property)}>
          <Text style={styles.buttonText}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.buttonSecondary]}
          onPress={() => onDelete(property.id)}
        >
          <Text style={styles.buttonText}>Excluir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
