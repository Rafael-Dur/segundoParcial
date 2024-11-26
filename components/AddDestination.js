import React, { useState, useContext } from 'react';
import { View, TextInput, Button, StyleSheet, Text, TouchableOpacity, Alert } from 'react-native';
import { DestinationContext } from '../context/DestinationContext';

const AddDestination = ({ navigation }) => {
  const { addDestination } = useContext(DestinationContext);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [difficulty, setDifficulty] = useState('');

  const handleSave = async () => {
    if (!name || !description || !difficulty) {
      Alert.alert('Error', 'Por favor completa todos los campos antes de guardar.');
      return;
    }

    try {
      await addDestination(name, description, difficulty);
      Alert.alert('Éxito', 'Destino agregado con éxito.');
      navigation.navigate('DestinationList');
    } catch (error) {
      console.error('Error al agregar el destino:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Agregar Nuevo Destino</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre del Destino"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Descripción del lugar"
        value={description}
        onChangeText={setDescription}
      />
      <Text style={styles.label}>Nivel de Dificultad</Text>
      <View style={styles.checkboxContainer}>
        <TouchableOpacity
          style={[styles.checkbox, difficulty === 'easy' && styles.checkboxSelected]}
          onPress={() => setDifficulty('easy')}
        >
          <Text style={styles.checkboxText}>Fácil</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.checkbox, difficulty === 'medium' && styles.checkboxSelected]}
          onPress={() => setDifficulty('medium')}
        >
          <Text style={styles.checkboxText}>Moderada</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.checkbox, difficulty === 'hard' && styles.checkboxSelected]}
          onPress={() => setDifficulty('hard')}
        >
          <Text style={styles.checkboxText}>Difícil</Text>
        </TouchableOpacity>
      </View>
      <Button title="Guardar" onPress={handleSave} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 15,
  },
  checkbox: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  checkboxSelected: {
    backgroundColor: '#ddd',
  },
  checkboxText: {
    fontSize: 16,
  },
});

export default AddDestination;
