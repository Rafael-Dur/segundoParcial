import React, { useContext, useState } from 'react';
import { Alert, Button } from 'react-native';
import { deleteDestination } from '../services/APIclient';
import { DestinationContext } from '../context/DestinationContext';

const DeleteDestination = ({ destinationId, destinationName, onDeleteSuccess, onDeleteError }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const { loadDestinations } = useContext(DestinationContext); 

  const handleDelete = () => {
    Alert.alert(
      'Confirmar eliminación',
      `¿Estás seguro de que deseas eliminar el destino ${destinationName}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: async () => {
            setIsDeleting(true);
            try {
              await deleteDestination(destinationId);
              await loadDestinations();
              onDeleteSuccess();
            } catch (error) {
              console.error('Error al eliminar el destino:', error);
              onDeleteError(error);
            } finally {
              setIsDeleting(false);
            }
          },
        },
      ]
    );
  };

  return (
    <Button
      title={isDeleting ? 'Eliminando...' : 'Eliminar'}
      onPress={handleDelete}
      color="red"
      disabled={isDeleting}
    />
  );
};

export default DeleteDestination;
