import axios from "axios";
import { API_URL } from "@/src/config/config";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getProducts = async () => {
    try {
      const response = await api.get("/produtos");
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
      throw error;
    }
};

export const getUserProfile = async () => {
  try {
    // Buscar o token armazenado
    const token = await AsyncStorage.getItem('token');
    
    if (!token) {
      throw new Error('Token não encontrado. Faça login novamente.');
    }

    const response = await fetch(`${API_URL}/me`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
      },
    });

    if (!response.ok) {
      if (response.status === 401 || response.status === 403) {
        // Token inválido ou expirado
        await AsyncStorage.removeItem('token');
        throw new Error('Sessão expirada. Faça login novamente.');
      }
      
      const errorData = await response.json();
      throw new Error(errorData.error || 'Erro ao buscar dados do usuário');
    }

    const userData = await response.json();
    return userData;
    
  } catch (error) {
    console.error('Erro ao buscar perfil:', error);
    throw error;
  }
};