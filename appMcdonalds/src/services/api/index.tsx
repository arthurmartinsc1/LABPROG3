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
    const token = await AsyncStorage.getItem("token");
    const response = await api.get("/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar perfil:", error);
    throw error;
  }
};