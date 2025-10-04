// src/context/CartContext.tsx
import React, { createContext, useContext, useReducer, useCallback } from 'react';
import type { ReactNode } from 'react';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  sku?: string;
}

interface CartState {
  items: CartItem[];
  total: number;
  itemCount: number;
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: Omit<CartItem, 'quantity'> }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' }

interface CartContextType {
  // Cart state
  items: CartItem[];
  total: number;
  itemCount: number;
  
  // Cart actions
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  updateQty: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  clear: () => void;
  isInCart: (id: string) => boolean;
  
  // Cart data in the format expected by CartPage
  cart: {
    lines: Array<{
      id: string;
      name: string;
      unitPrice: { amount: number };
      qty: number;
      image?: string;
    }>;
    total: number;
    itemCount: number;
  };
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
          total: state.total + action.payload.price,
          itemCount: state.itemCount + 1,
        };
      }
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }],
        total: state.total + action.payload.price,
        itemCount: state.itemCount + 1,
      };
    }
    case 'REMOVE_ITEM': {
      const itemToRemove = state.items.find(item => item.id === action.payload);
      if (!itemToRemove) return state;
      
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload),
        total: state.total - (itemToRemove.price * itemToRemove.quantity),
        itemCount: state.itemCount - itemToRemove.quantity,
      };
    }
    case 'UPDATE_QUANTITY': {
      const itemToUpdate = state.items.find(item => item.id === action.payload.id);
      if (!itemToUpdate) return state;

      const quantityDiff = action.payload.quantity - itemToUpdate.quantity;
      
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
        total: state.total + (itemToUpdate.price * quantityDiff),
        itemCount: state.itemCount + quantityDiff,
      };
    }
    case 'CLEAR_CART':
      return { items: [], total: 0, itemCount: 0 };
    default:
      return state;
  }
};

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    total: 0,
    itemCount: 0,
  });

  const addToCart = useCallback((item: Omit<CartItem, 'quantity'>) => {
    dispatch({ type: 'ADD_ITEM', payload: item });
  }, []);

  const removeFromCart = useCallback((id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  }, []);

  const removeItem = removeFromCart;

  const updateQuantity = useCallback((id: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  }, []);

  const updateQty = updateQuantity;

  const clearCart = useCallback(() => {
    dispatch({ type: 'CLEAR_CART' });
  }, []);

  const clear = clearCart;

  const isInCart = useCallback((id: string) => {
    return state.items.some(item => item.id === id);
  }, [state.items]);

    const cart = {
    lines: state.items.map(item => ({
      id: item.id,
      name: item.name,
      unitPrice: { amount: item.price },
      qty: item.quantity,
      image: item.image
    })),
    total: state.total,
    itemCount: state.itemCount
  };

  const contextValue: CartContextType = {
    ...state,
    addToCart,
    removeFromCart,
    updateQuantity,
    updateQty,
    removeItem,
    clearCart,
    clear,
    isInCart,
    cart
  };

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};