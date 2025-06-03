import { createContext, useContext, useState, ReactNode } from "react";
import { ProdutoProps } from "../../services/loadingProducts/Products";

type CartItem = ProdutoProps & { quantity: number };

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: ProdutoProps) => void;
  removeFromCart: (id: number) => void;
  getProductQuantity: (id: number) => number; // ✅ nova função
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (item: ProdutoProps) => {
    setCartItems((prev) => {
      const existing = prev.find((p) => p.id === item.id);
      if (existing) {
        return prev.map((p) =>
          p.id === item.id ? { ...p, quantity: p.quantity + 1 } : p
        );
      } else {
        return [...prev, { ...item, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (id: number) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const getProductQuantity = (id: number): number => {
    const item = cartItems.find((item) => item.id === id);
    return item ? item.quantity : 0;
  };

  const clearCart = () => setCartItems([]);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, getProductQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};
