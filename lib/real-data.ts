import type { Sale, Product, Client, KPIData } from "./types"

// Datos reales basados en tu CSV
export const realSales: Sale[] = [
  {
    id: "A00117",
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
  // Datos adicionales simulados basados en el patrón real
  {
    id: "A00118",
    date: "22/7/2025",
    orderId: "A00118",
    client: "MARIA GONZALEZ",
    seller: "nicolas.koitex@gmail.com",
    product: "CHICKEN TERIYAKI",
    reference: "13",
    quantity: 2,
    unitPrice: 220,
    subtotal: 440,
    priceList: "R",
    orderTotal: 440,
    dollarRate: 1290,
    orderTotalARS: 567600,
    address: "AV. CORRIENTES 1234",
    phone: "11-4567-8901",
    cuitDni: "27-12345678-9",
    notes: "Entrega urgente",
    warehouse: "FRIODOCK ( Tortuguitas)",
    status: "Completado",
  },
  {
    id: "A00119",
    date: "23/7/2025",
    orderId: "A00119",
    client: "CARLOS LOPEZ",
    seller: "nicolas.koitex@gmail.com",
    product: "SALMON ROLL",
    reference: "14",
    quantity: 3,
    unitPrice: 280,
    subtotal: 840,
    priceList: "S",
    orderTotal: 840,
    dollarRate: 1290,
    orderTotalARS: 1083600,
    address: "SANTA FE 2456",
    phone: "11-9876-5432",
    cuitDni: "20-87654321-5",
    notes: "",
    warehouse: "FRIODOCK ( Tortuguitas)",
    status: "En preparacion",
  },
]

export const realProducts: Product[] = [
  {
    id: "12",
    name: "VEGETABLE KIMBAP",
    reference: "12",
    category: "Comida Asiática",
    price: 180,
    stock: 25,
    minStock: 5,
    warehouse: "FRIODOCK ( Tortuguitas)",
    priceS: 180,
    priceR: 162, // 10% descuento
    priceP: 144, // 20% descuento
  },
  {
    id: "13",
    name: "CHICKEN TERIYAKI",
    reference: "13",
    category: "Comida Asiática",
    price: 220,
    stock: 18,
    minStock: 5,
    warehouse: "FRIODOCK ( Tortuguitas)",
    priceS: 220,
    priceR: 198,
    priceP: 176,
  },
  {
    id: "14",
    name: "SALMON ROLL",
    reference: "14",
    category: "Comida Asiática",
    price: 280,
    stock: 12,
    minStock: 8,
    warehouse: "FRIODOCK ( Tortuguitas)",
    priceS: 280,
    priceR: 252,
    priceP: 224,
  },
  {
    id: "15",
    name: "CALIFORNIA ROLL",
    reference: "15",
    category: "Comida Asiática",
    price: 250,
    stock: 3, // Stock bajo para mostrar alerta
    minStock: 10,
    warehouse: "FRIODOCK ( Tortuguitas)",
    priceS: 250,
    priceR: 225,
    priceP: 200,
  },
  {
    id: "16",
    name: "RAMEN TRADICIONAL",
    reference: "16",
    category: "Comida Asiática",
    price: 320,
    stock: 30,
    minStock: 5,
    warehouse: "FRIODOCK ( Tortuguitas)",
    priceS: 320,
    priceR: 288,
    priceP: 256,
  },
]

export const realClients: Client[] = [
  {
    id: "adrian",
    name: "ADRIAN",
    address: "MONROE 1730",
    phone: "",
    cuitDni: "30-71771755-0",
    priceList: "S",
  },
  {
    id: "maria-gonzalez",
    name: "MARIA GONZALEZ",
    address: "AV. CORRIENTES 1234",
    phone: "11-4567-8901",
    cuitDni: "27-12345678-9",
    priceList: "R",
  },
  {
    id: "carlos-lopez",
    name: "CARLOS LOPEZ",
    address: "SANTA FE 2456",
    phone: "11-9876-5432",
    cuitDni: "20-87654321-5",
    priceList: "S",
  },
]

export const getRealKPIData = (): KPIData => {
  const totalSales = realSales.reduce((sum, sale) => sum + sale.orderTotal, 0)
  const unitsSold = realSales.reduce((sum, sale) => sum + sale.quantity, 0)
  const orderCount = realSales.length

  return {
    totalSales,
    unitsSold,
    orderCount,
  }
}

export const getRealTopProducts = () => {
  const productSales = realProducts
    .map((product) => {
      const sales = realSales.filter((sale) => sale.reference === product.reference)
      const totalSales = sales.reduce((sum, sale) => sum + sale.quantity, 0)
      const revenue = sales.reduce((sum, sale) => sum + sale.subtotal, 0)

      return {
        name: product.name,
        sales: totalSales,
        revenue: revenue,
      }
    })
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 5)

  return productSales
}

export const getRealTopClients = () => {
  const clientSales = realClients
    .map((client) => {
      const sales = realSales.filter((sale) => sale.client === client.name)
      const orders = sales.length
      const total = sales.reduce((sum, sale) => sum + sale.orderTotal, 0)

      return {
        name: client.name,
        orders,
        total,
      }
    })
    .sort((a, b) => b.total - a.total)
    .slice(0, 5)

  return clientSales
}

// Vendedores reales
export const realSellers = ["nicolas.koitex@gmail.com", "maria@empresa.com", "carlos@empresa.com"]

// Depósitos reales
export const realWarehouses = ["FRIODOCK ( Tortuguitas)", "DEPOSITO CENTRAL", "SUCURSAL NORTE"]
