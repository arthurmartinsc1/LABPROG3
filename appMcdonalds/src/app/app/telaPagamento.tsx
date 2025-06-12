import React, { useCallback, useEffect, useState } from 'react';
import { API_URL } from '../../config/config'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Alert,
  ActivityIndicator
} from 'react-native';
import { useCart } from '../context/cartContext';
import { getUserProfile } from '@/src/services/api';
import { router } from 'expo-router';

interface TelaPagamentoProps {
  visible: boolean;
  onClose: () => void;
  total: number;
  cartItems: CartItem[];
}

interface CartItem {
  id: number;
  name: string;
  price: string | number;
  quantity: number;
  image_url: string;
}

interface OrderItem {
  product_id: number;
  quantity: number;
}

interface ApiResponse {
  message: string;
  order: {
    id: number;
    user_id: number;
    total: number;
    created_at: string;
  };
}

type PaymentMethod = 'PIX' | 'Cartão de Débito' | 'Cartão de Crédito';

export default function TelaPagamento({ visible, onClose, total, cartItems }: TelaPagamentoProps) {
  const { clearCart } = useCart();
  const [loading, setLoading] = useState<boolean>(false);
  const [user, setUser] = useState<any>(null);


  const fetchProfile = useCallback(async () => {
      try {
        setLoading(true);
        // Limpa o estado anterior antes de buscar novos dados
        setUser(null);
  
        const data = await getUserProfile();
        console.log('Dados do perfil carregados:', data); // Para debug
        setUser(data);
      } catch (err: any) {
        console.error('Erro ao carregar perfil:', err);
  
        // Se o erro for relacionado à autenticação, redirecionar para login
        if (err.message.includes('Sessão expirada') || err.message.includes('Token não encontrado')) {
          Alert.alert(
            "Sessão Expirada",
            "Sua sessão expirou. Você será redirecionado para o login.",
            [
              {
                text: "OK",
                onPress: () => router.push("/")
              }
            ]
          );
        } else {
          Alert.alert("Erro", "Não foi possível carregar seus dados.");
        }
      } finally {
        setLoading(false);
      }
    }, []);

    useEffect(() => {
        fetchProfile();
      }, [fetchProfile]);

  const createOrder = async (items: OrderItem[], userId: number): Promise<ApiResponse> => {
    const response = await fetch(`${API_URL}/order`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: userId,
        items: items
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Erro ao criar pedido');
    }

    return response.json();
  };

  const handlePayment = async (method: PaymentMethod): Promise<void> => {
    try {
      setLoading(true);

      // Converte os itens do carrinho para o formato esperado pela API
      const orderItems: OrderItem[] = cartItems.map(item => ({
        product_id: item.id,
        quantity: item.quantity
      }));

      // Faz a requisição para criar o pedido
      const response = await createOrder(orderItems, user.id);

      Alert.alert(
        "Sucesso!",
        `Pedido criado com sucesso!\nPagamento via ${method}\nTotal: R$ ${total.toFixed(2)}\nPedido #${response.order.id}`,
        [
          {
            text: "OK",
            onPress: () => {
              clearCart();
              onClose();
            }
          }
        ]
      );

    } catch (error) {
      console.error('Erro ao processar pagamento:', error);
      
      Alert.alert(
        "Erro",
        error instanceof Error ? error.message : "Erro ao processar pagamento. Tente novamente.",
        [
          {
            text: "OK"
          }
        ]
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>Escolha a forma de pagamento</Text>
          
          <View style={styles.totalContainer}>
            <Text style={styles.totalLabel}>Total a pagar:</Text>
            <Text style={styles.totalValue}>R$ {total.toFixed(2)}</Text>
          </View>

          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#FDBA1C" />
              <Text style={styles.loadingText}>Processando pedido...</Text>
            </View>
          ) : (
            <View style={styles.buttonsContainer}>
              <TouchableOpacity
                style={[styles.paymentButton, styles.pixButton]}
                onPress={() => handlePayment('PIX')}
              >
                <Text style={styles.buttonIcon}>📱</Text>
                <Text style={styles.buttonText}>PIX</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.paymentButton, styles.debitButton]}
                onPress={() => handlePayment('Cartão de Débito')}
              >
                <Text style={styles.buttonIcon}>💳</Text>
                <Text style={styles.buttonText}>Cartão de Débito</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.paymentButton, styles.creditButton]}
                onPress={() => handlePayment('Cartão de Crédito')}
              >
                <Text style={styles.buttonIcon}>💳</Text>
                <Text style={styles.buttonText}>Cartão de Crédito</Text>
              </TouchableOpacity>
            </View>
          )}

          <TouchableOpacity
            style={styles.cancelButton}
            onPress={onClose}
            disabled={loading}
          >
            <Text style={[styles.cancelButtonText, loading && styles.disabledText]}>
              Cancelar
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: '#fff',
    borderRadius: 20,
    margin: 20,
    padding: 24,
    width: '90%',
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 24,
    textAlign: 'center',
  },
  totalContainer: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 16,
    marginBottom: 32,
    width: '100%',
    alignItems: 'center',
  },
  totalLabel: {
    fontSize: 16,
    color: '#666',
    marginBottom: 4,
  },
  totalValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#F2A100',
  },
  buttonsContainer: {
    width: '100%',
    marginBottom: 24,
  },
  paymentButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  pixButton: {
    backgroundColor: '#32BCAD',
  },
  debitButton: {
    backgroundColor: '#4A90E2',
  },
  creditButton: {
    backgroundColor: '#FDBA1C',
  },
  buttonIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loadingContainer: {
    alignItems: 'center',
    marginBottom: 24,
    paddingVertical: 40,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
  cancelButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  cancelButtonText: {
    color: '#666',
    fontSize: 16,
  },
  disabledText: {
    color: '#ccc',
  },
});