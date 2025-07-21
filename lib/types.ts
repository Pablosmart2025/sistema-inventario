export interface Sale {
  id: string
  date: string
  orderId: string
  client: string
  seller: string
  product: string
  reference: string
  quantity: number
  unitPrice: number
  subtotal: number
  priceList: string
  orderTotal: number
  dollarRate: number
  orderTotalARS: number
  address: string
  phone: string
  cuitDni: string
  notes: string
  warehouse: string
  status: string
}

export interface Product {
  id: string
  name: string
  reference: string
  category: string
  price: number
  stock: number
  minStock: number
  image?: string
  warehouse: string
  priceS: number
  priceR: number
  priceP: number
}

export interface Client {
  id: string
  name: string
  address: string
  phone: string
  cuitDni: string
  priceList: "S" | "R" | "P"
}

export interface CartItem {
  product: Product
  quantity: number
  customPrice?: number
}

export interface KPIData {
  totalSales: number
  unitsSold: number
  orderCount: number
}
