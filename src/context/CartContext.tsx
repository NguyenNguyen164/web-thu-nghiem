import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { add, mul, zero } from "../utils/money";
import type { Cart, CartLine, Price } from "../types/cart";

type CartContextValue = {
  cart: Cart;
  addItem: (line: Omit<CartLine, "id">) => void;
  removeItem: (lineId: string) => void;
  updateQty: (lineId: string, qty: number) => void;
  clear: () => void;
  setCurrency: (c: Price["currency"]) => void;
};

const CartContext = createContext<CartContextValue | null>(null);
const LS_KEY = "cw_cart_v1";

function compute(cartLines: CartLine[], currency: Price["currency"]): Cart {
  const subtotal = cartLines.reduce((acc, l) => acc + l.unitPrice.amount * l.qty, 0);
  // Free shipping if subtotal >= 1000, otherwise $49
  const shippingAmt = subtotal === 0 ? 0 : subtotal >= 1000 ? 0 : 49;
  // 10% tax
  const taxAmt = subtotal * 0.1;
  const totalAmt = subtotal + shippingAmt + taxAmt;

  const toPrice = (amount: number) => ({ amount: +amount.toFixed(2), currency });

  return {
    lines: cartLines,
    subtotal: toPrice(subtotal),
    shipping: toPrice(shippingAmt),
    tax: toPrice(taxAmt),
    total: toPrice(totalAmt),
  };
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrencyState] = useState<Price["currency"]>("AUD");
  const [lines, setLines] = useState<CartLine[]>([]);

  // Load from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as { lines: CartLine[]; currency: Price["currency"] };
        setLines(parsed.lines || []);
        setCurrencyState(parsed.currency || "AUD");
      }
    } catch (e) {
      console.error("Failed to load cart from localStorage", e);
    }
  }, []);

  // Persist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(LS_KEY, JSON.stringify({ lines, currency }));
    } catch (e) {
      console.error("Failed to save cart to localStorage", e);
    }
  }, [lines, currency]);

  const cart = useMemo(() => compute(lines, currency), [lines, currency]);

  const addItem: CartContextValue["addItem"] = (line) => {
    setLines((prev) => {
      // Group by SKU + unitPrice
      const found = prev.find(
        (x) => x.sku === line.sku && x.unitPrice.amount === line.unitPrice.amount
      );
      if (found) {
        return prev.map((x) =>
          x.sku === line.sku && x.unitPrice.amount === line.unitPrice.amount
            ? { ...x, qty: x.qty + line.qty }
            : x
        );
      }
      const id = crypto.randomUUID();
      return [...prev, { ...line, id }];
    });
  };

  const removeItem = (lineId: string) =>
    setLines((prev) => prev.filter((l) => l.id !== lineId));
    
  const updateQty = (lineId: string, qty: number) =>
    setLines((prev) =>
      prev.map((l) => (l.id === lineId ? { ...l, qty: Math.max(1, qty) } : l))
    );
    
  const clear = () => setLines([]);
  const setCurrency = (c: Price["currency"]) => setCurrencyState(c);

  const value = useMemo(
    () => ({
      cart,
      addItem,
      removeItem,
      updateQty,
      clear,
      setCurrency,
    }),
    [cart]
  );

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};
