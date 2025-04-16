import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { getProducts } from '../api';

export interface ProdutoProps {
  id: number;
  name: string;
  category: string;
  price: number;
  image_url: string;
}

export function useProdutos() {
  const [produtos, setProdutos] = useState<ProdutoProps[]>([]);

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const data = await getProducts();
        setProdutos(data);
      } catch (error) {
        console.error("Erro ao carregar produtos:", error);
      } finally {
      }
    };

    fetchProdutos();
  }, []);

  return produtos;
}