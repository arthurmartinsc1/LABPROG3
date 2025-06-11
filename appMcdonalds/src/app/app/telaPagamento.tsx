import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Alert
} from 'react-native';
import { useCart } from '../context/cartContext';

interface TelaPagamentoProps {
  visible: boolean;
  onClose: () => void;
  total: number;
}

type PaymentMethod = 'PIX' | 'Cartão de Débito' | 'Cartão de Crédito';

export default function TelaPagamento({ visible, onClose, total }: TelaPagamentoProps) {
  const { clearCart } = useCart();

  const handlePayment = (method: PaymentMethod): void => {
    Alert.alert(
      "Pagamento",
      `Pagamento de R$ ${total.toFixed(2)} via ${method} realizado com sucesso!`,
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

          <TouchableOpacity
            style={styles.cancelButton}
            onPress={onClose}
          >
            <Text style={styles.cancelButtonText}>Cancelar</Text>
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
  cancelButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  cancelButtonText: {
    color: '#666',
    fontSize: 16,
  },
});