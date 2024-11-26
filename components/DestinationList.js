import React, { useContext, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { DestinationContext } from '../context/DestinationContext';
import { FontAwesome } from '@expo/vector-icons';

const DestinationList = ({ navigation }) => {
  const { destinations, loading, loadDestinations, toggleFavorite } = useContext(DestinationContext);

  useEffect(() => {
    loadDestinations();
  }, []);

  if (loading) {
    return <ActivityIndicator style={styles.loader} size="large" color="#0000ff" />;
  }

  if (!destinations.length) {
    return (
      <View style={styles.emptyContainer}>
        <Text>No hay destinos disponibles</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('AddDestination')}
        >
          <FontAwesome name="plus" size={20} color="white" />
          <Text style={styles.addButtonText}>Agregar Destino</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const handleFavoriteToggle = (id, isFavorite) => {
    toggleFavorite(id, !isFavorite);
  };

  const getDifficultyTag = (difficulty) => {
    switch (difficulty) {
      case 'easy':
        return { text: 'Fácil', color: 'green' };
      case 'medium':
        return { text: 'Moderada', color: 'yellow' };
      case 'hard':
        return { text: 'Difícil', color: 'violet' };
      default:
        return { text: 'Desconocida', color: 'gray' };
    }
  };

  const sortedDestinations = [...destinations].sort((a, b) => {
    const nameA = typeof a.name === 'string' ? a.name : '';
    const nameB = typeof b.name === 'string' ? b.name : '';

    if (a.isFavorite === b.isFavorite) {
      return nameA.localeCompare(nameB);
    }
    return a.isFavorite ? -1 : 1;
  });

  return (
    <View style={styles.container}>
      <FlatList
        data={sortedDestinations}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          const difficultyTag = getDifficultyTag(item.difficulty || '');
          console.log('Destino procesado:', item);

          return (
            <View style={styles.destinationContainer}>
              <TouchableOpacity
                style={styles.destination}
                onPress={() => navigation.navigate('DestinationDetails', { destination: item })}
              >
                <Text style={styles.destinationName}>
                  {typeof item.name === 'string' ? item.name : 'Nombre no disponible'}
                </Text>
              </TouchableOpacity>
              <View style={[styles.difficultyTag, { backgroundColor: difficultyTag.color }]}>
                <Text style={styles.difficultyText}>{difficultyTag.text}</Text>
              </View>
              <TouchableOpacity
                onPress={() => handleFavoriteToggle(item.id, item.isFavorite)}
                style={styles.favoriteButton}
              >
                <FontAwesome
                  name={item.isFavorite ? 'star' : 'star-o'}
                  size={24}
                  color={item.isFavorite ? 'yellow' : 'gray'}
                />
              </TouchableOpacity>
            </View>
          );
        }}
      />

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddDestination')}
      >
        <FontAwesome name="plus" size={20} color="white" />
        <Text style={styles.addButtonText}>Agregar Destino</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  destinationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    marginBottom: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  destinationName: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
  },
  difficultyTag: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  difficultyText: {
    color: 'white',
    fontWeight: 'bold',
  },
  favoriteButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 30,
    position: 'absolute',
    bottom: 20,
    right: 20,
    elevation: 5,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 5,
  },
});

export default DestinationList;
