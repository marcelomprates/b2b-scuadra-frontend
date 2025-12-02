export enum UserRole {
  ADMIN = 'ADMIN',
  BUYER = 'BUYER'
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  company: string;
}

export interface Product {
  id: string;
  name: string;
  sku: string;
  price: number;
  stock: number;
  category: string;
  image: string;
}

export interface Order {
  id: string;
  date: string;
  status: 'PENDING' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED';
  total: number;
  items: number;
}

export interface ServiceStatus {
  name: string;
  status: 'operational' | 'degraded' | 'down';
  uptime: string;
  port: number;
  description: string;
}