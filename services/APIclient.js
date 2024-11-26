const IP = "161.35.143.238";

export const fetchDestinations = async () => {
  try {
    const response = await fetch(`http://${IP}:8000/rduran`);
    if (!response.ok) throw new Error('Error al obtener los destinos');
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchDestinationById = async (id) => {
  try {
    const response = await fetch(`http://${IP}:8000/rduran/${id}`);
    if (!response.ok) throw new Error('Error al obtener el destino');
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const addDestination = async (name, description, difficulty) => {
  try {
    const response = await fetch(`http://${IP}:8000/rduran/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, description, difficulty, isFavorite: false }),
    });

    if (!response.ok) throw new Error('Error al agregar el destino');
    return await response.json();
  } catch (error) {
    console.error('Error al agregar el destino:', error);
    throw error;
  }
};

export const editDestination = async (id, updatedData) => {
  try {
    const response = await fetch(`http://${IP}:8000/rduran/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    });

    if (!response.ok) throw new Error('Error al editar el destino');
    return await response.json();
  } catch (error) {
    console.error('Error al editar el destino:', error);
    throw error;
  }
};

export const deleteDestination = async (id) => {
  try {
    const response = await fetch(`http://${IP}:8000/rduran/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) throw new Error('Error al eliminar el destino');
  } catch (error) {
    console.error('Error al eliminar el destino:', error);
    throw error;
  }
};

export const toggleFavorite = async (id, isFavorite) => {
  try {
    const response = await fetch(`http://${IP}:8000/rduran/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ isFavorite }),
    });

    if (!response.ok) throw new Error('Error al actualizar el favorito');
    return await response.json();
  } catch (error) {
    console.error('Error al marcar/desmarcar como favorito:', error);
    throw error;
  }
};
