export type Price = {
  amount: number; // số thập phân, ví dụ 999.0
  currency: "AUD" | "USD" | "VND";
};

export type CartLine = {
  id: string;        // id line duy nhất
  sku: string;       // mã sản phẩm
  name: string;
  slug: string;      // dùng để link ra trang chi tiết nếu có
  image: string;     // ảnh thumbnail
  unitPrice: Price;  // giá 1 sp
  qty: number;
};

export type Cart = {
  lines: CartLine[];
  subtotal: Price;
  shipping: Price;
  tax: Price;
  total: Price;
};

export type Address = {
  fullName: string;
  phone: string;
  email: string;
  line1: string;
  line2?: string;
  city: string;
  state?: string;
  postalCode: string;
  country: string;
};

export type CheckoutPayload = {
  address: Address;
  note?: string;
  cart: Cart;
};
