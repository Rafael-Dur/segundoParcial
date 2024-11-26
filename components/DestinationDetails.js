import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Dimensions, FlatList, Alert } from 'react-native';
import DeleteDestination from './DeleteDestination';
const { width } = Dimensions.get('window');

const DestinationDetails = ({ route, navigation }) => {
    const { destination: initialDestination } = route.params;
    const [destination, setDestination] = useState(initialDestination);

    useEffect(() => {
        setDestination(initialDestination);
    }, [initialDestination]);

    if (!destination) {
        return <Text>Destino no encontrado.</Text>;
    }

    const handleDeleteSuccess = () => {
        navigation.goBack();
    };

    const handleDeleteError = () => {
        Alert.alert('Error', 'No se pudo eliminar el destino. Intenta nuevamente.');
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
                return { text: 'Desconocido', color: 'gray' };
        }
    };

    const difficultyTag = getDifficultyTag(destination.difficulty);

    const renderContent = () => [
        <Text key="name" style={styles.name}>{destination.name}</Text>,
        <Text key="description" style={styles.description}>{destination.description}</Text>,
        <View key="difficultyTag" style={[styles.difficultyTag, { backgroundColor: difficultyTag.color }]}>
            <Text style={styles.difficultyText}>Nivel de dificultad: {difficultyTag.text}</Text>
        </View>,
        <Button
            key="editButton"
            title="Editar"
            onPress={() => navigation.navigate('EditDestination', { destination })}
        />,
        <DeleteDestination
            key="deleteButton"
            destinationId={destination.id}
            destinationName={destination.name}
            onDeleteSuccess={handleDeleteSuccess}
            onDeleteError={handleDeleteError}
        />,
    ];

    return (
        <FlatList
            data={renderContent()}
            renderItem={({ item }) => <View style={styles.itemContainer}>{item}</View>}
            keyExtractor={(_, index) => index.toString()}
            contentContainerStyle={styles.scrollContainer}
        />
    );
};

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: 20,
        maxWidth: 800,
        marginHorizontal: 'auto',
    },
    itemContainer: {
        marginBottom: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    description: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 10,
    },
    difficultyTag: {
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderRadius: 12,
        marginBottom: 20,
    },
    difficultyText: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default DestinationDetails;
