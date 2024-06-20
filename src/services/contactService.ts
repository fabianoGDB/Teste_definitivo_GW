import axios from 'axios';

const API_URL = 'http://localhost:5213/';

export const getContacts = async () => {
  try {
    const response = await axios.get(API_URL + "api/contacts");
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar contatos', error);
    throw error;
  }
};