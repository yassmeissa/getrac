export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  category: string;
  image: string;
  stock: number;
  rating: number;
  reviews: number;
}

export interface Category {
  id: number;
  name: string;
  description: string;
  icon?: string;
}

export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export { default as Wishlist } from '../pages/Wishlist';
