import React, { createContext, useState, useEffect } from 'react';
import {
  fetchDestinations,
  addDestination as addDestinationAPI,
  editDestination as editDestinationAPI,
  deleteDestination as deleteDestinationAPI,
  toggleFavorite as toggleFavoriteAPI,
} from '../services/APIclient';

export const DestinationContext = createContext();

export const DestinationProvider = ({ children }) => {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadDestinations = async () => {
    setLoading(true);
    try {
      const data = await fetchDestinations();
      setDestinations(data);
    } catch (error) {
      console.error('Error al cargar los destinos:', error);
    } finally {
      setLoading(false);
    }
  };

  const addDestination = async (name, description, difficulty) => {
    try {
      const newDestination = await addDestinationAPI(name, description, difficulty);
      setDestinations((prevDestinations) => [...prevDestinations, newDestination]);
    } catch (error) {
      console.error('Error al agregar el destino:', error);
    }
  };

  const updateDestination = async (id, updatedData) => {
    try {
      const updatedDestination = await editDestinationAPI(id, updatedData);
      setDestinations((prevDestinations) =>
        prevDestinations.map((destination) =>
          destination.id === id ? updatedDestination : destination
        )
      );
    } catch (error) {
      console.error('Error al editar el destino:', error);
    }
  };

  const deleteDestination = async (id) => {
    try {
      await deleteDestinationAPI(id);
      setDestinations((prevDestinations) =>
        prevDestinations.filter((destination) => destination.id !== id)
      );
    } catch (error) {
      console.error('Error al eliminar el destino:', error);
    }
  };

  const toggleFavorite = async (id, isFavorite) => {
    try {
      const updatedDestination = await toggleFavoriteAPI(id, isFavorite);
      setDestinations((prevDestinations) =>
        prevDestinations.map((destination) =>
          destination.id === id ? updatedDestination : destination
        )
      );
    } catch (error) {
      console.error('Error al actualizar favorito:', error);
    }
  };

  useEffect(() => {
    loadDestinations();
  }, []);

  return (
    <DestinationContext.Provider
      value={{
        destinations,
        loading,
        loadDestinations,
        addDestination,
        updateDestination,
        deleteDestination,
        toggleFavorite,
      }}
    >
      {children}
    </DestinationContext.Provider>
  );
};
