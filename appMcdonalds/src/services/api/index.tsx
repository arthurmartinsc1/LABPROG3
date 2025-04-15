import axios from "axios";
import { API_URL } from "@/src/config/config";

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