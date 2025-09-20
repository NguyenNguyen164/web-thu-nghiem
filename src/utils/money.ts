import type { Price } from "../types/cart";

export const fmt = (p: Price) =>
  new Intl.NumberFormat(undefined, { 
    style: "currency", 
    currency: p.currency 
  }).format(p.amount);

export const mul = (p: Price, n: number): Price => ({ 
  ...p, 
  amount: +(p.amount * n).toFixed(2) 
});

export const add = (a: Price, b: Price): Price => ({ 
  ...a, 
  amount: +(a.amount + b.amount).toFixed(2) 
});

export const zero = (currency: Price["currency"] = "AUD"): Price => ({ 
  amount: 0, 
  currency 
});

export const round2 = (n: number) => +n.toFixed(2);
