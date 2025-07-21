// Script para procesar los datos del CSV
const csvData = `En preparacion,21/7/2025,A00117,ADRIAN,nicolas.koitex@gmail.com,VEGETABLE KIMBAP,12,1,180,180,S,1684,1290,2172360,MONROE 1730,#ERROR!,30-71771755-0,entregar miercoles 16 o jueves 17 maximo,FRIODOCK ( Tortuguitas)`

// Procesar los datos del CSV
function processCSVData() {
  const lines = csvData.split("\n")
  const sales = []
  const products = new Map()
  const clients = new Map()

  lines.forEach((line) => {
    if (line.trim()) {
      const [
        status,
        date,
        orderId,
        client,
        seller,
        product,
        reference,
        quantity,
        unitPrice,
        subtotal,
        priceList,
        orderTotal,
        dollarRate,
        orderTotalARS,
        address,
        phone,
        cuitDni,
        notes,
        warehouse,
      ] = line.split(",")

      // Agregar venta
      sales.push({
        id: orderId,
        date,
        orderId,
        client,
        seller,
        product,
        reference,
        quantity: Number.parseInt(quantity),
        unitPrice: Number.parseFloat(unitPrice),
        subtotal: Number.parseFloat(subtotal),
        priceList,
        orderTotal: Number.parseFloat(orderTotal),
        dollarRate: Number.parseFloat(dollarRate),
        orderTotalARS: Number.parseFloat(orderTotalARS),
        address,
        phone: phone === "#ERROR!" ? "" : phone,
        cuitDni,
        notes,
        warehouse,
        status,
      })

      // Agregar producto único
      if (!products.has(reference)) {
        products.set(reference, {
          id: reference,
          name: product,
          reference,
          category: getCategoryFromProduct(product),
          price: Number.parseFloat(unitPrice),
          stock: Math.floor(Math.random() * 50) + 10, // Stock simulado
          minStock: 5,
          warehouse,
          priceS: Number.parseFloat(unitPrice),
          priceR: Number.parseFloat(unitPrice) * 0.9,
          priceP: Number.parseFloat(unitPrice) * 0.8,
        })
      }

      // Agregar cliente único
      if (!clients.has(client)) {
        clients.set(client, {
          id: client.toLowerCase().replace(/\s+/g, "-"),
          name: client,
          address,
          phone: phone === "#ERROR!" ? "" : phone,
          cuitDni,
          priceList,
        })
      }
    }
  })

  return {
    sales: Array.from(sales),
    products: Array.from(products.values()),
    clients: Array.from(clients.values()),
  }
}

function getCategoryFromProduct(productName) {
  const name = productName.toLowerCase()
  if (name.includes("kimbap") || name.includes("sushi") || name.includes("ramen")) {
    return "Comida Asiática"
  } else if (name.includes("remera") || name.includes("shirt")) {
    return "Remeras"
  } else if (name.includes("pantalon") || name.includes("jean")) {
    return "Pantalones"
  } else if (name.includes("zapatilla") || name.includes("shoe")) {
    return "Calzado"
  }
  return "Otros"
}

const processedData = processCSVData()
console.log("Datos procesados:", processedData)
