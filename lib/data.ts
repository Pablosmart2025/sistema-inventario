import type { Sale, Product, Client, KPIData } from "./types"

// Datos de ejemplo basados en el CSV
export const mockSales: Sale[] = [
  {
    id: "1",
    date: "21/7/2025",
    orderId: "A00117",
    client: "ADRIAN",
    seller: "nicolas.koitex@gmail.com",
    product: "VEGETABLE KIMBAP",
    reference: "12",
    quantity: 1,
    unitPrice: 180,
    subtotal: 180,
    priceList: "S",
    orderTotal: 1684,
    dollarRate: 1290,
    orderTotalARS: 2172360,
    address: "MONROE 1730",
    phone: "",
    cuitDni: "30-71771755-0",
    notes: "entregar miercoles 16 o jueves 17 maximo",
    warehouse: "FRIODOCK ( Tortuguitas)",
    status: "En preparacion",
  },
]

export const mockProducts: Product[] = [
  {
    id: "1",
    name: "VEGETABLE KIMBAP",
    reference: "12",
    category: "Comida Asiática",
    price: 180,
    stock: 25,
    minStock: 5,
    warehouse: "FRIODOCK ( Tortuguitas)",
    priceS: 180,
    priceR: 160,
    priceP: 140,
  },
  {
    id: "2",
    name: "REMERA BÁSICA",
    reference: "RB001",
    category: "Remeras",
    price: 25,
    stock: 3,
    minStock: 10,
    warehouse: "FRIODOCK ( Tortuguitas)",
    priceS: 25,
    priceR: 22,
    priceP: 20,
  },
  {
    id: "3",
    name: "PANTALÓN JEAN",
    reference: "PJ001",
    category: "Pantalones",
    price: 45,
    stock: 15,
    minStock: 5,
    warehouse: "FRIODOCK ( Tortuguitas)",
    priceS: 45,
    priceR: 40,
    priceP: 35,
  },
]

export const mockClients: Client[] = [
  {
    id: "1",
    name: "ADRIAN",
    address: "MONROE 1730",
    phone: "",
    cuitDni: "30-71771755-0",
    priceList: "S",
  },
  {
    id: "2",
    name: "MARIA GONZALEZ",
    address: "AV. CORRIENTES 1234",
    phone: "11-4567-8901",
    cuitDni: "27-12345678-9",
    priceList: "R",
  },
]

export const getKPIData = (): KPIData => {
  return {
    totalSales: 15420,
    unitsSold: 342,
    orderCount: 28,
  }
}

export const getTopProducts = () => [
  { name: "VEGETABLE KIMBAP", sales: 45, revenue: 8100 },
  { name: "REMERA BÁSICA", sales: 32, revenue: 800 },
  { name: "PANTALÓN JEAN", sales: 28, revenue: 1260 },
  { name: "HOODIE PREMIUM", sales: 22, revenue: 1540 },
  { name: "ZAPATILLAS SPORT", sales: 18, revenue: 1800 },
]

export const getTopClients = () => [
  { name: "ADRIAN", orders: 12, total: 4520 },
  { name: "MARIA GONZALEZ", orders: 8, total: 3200 },
  { name: "CARLOS LOPEZ", orders: 6, total: 2800 },
  { name: "ANA MARTINEZ", orders: 5, total: 2100 },
  { name: "LUIS RODRIGUEZ", orders: 4, total: 1900 },
]
