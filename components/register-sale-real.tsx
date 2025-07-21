"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Search, Plus, Minus, Trash2, ShoppingCart, User, Package } from "lucide-react"
import { realProducts, realClients } from "@/lib/real-data"
import type { Product, Client, CartItem } from "@/lib/types"

export default function RegisterSaleReal() {
  const [isNewClient, setIsNewClient] = useState(false)
  const [selectedClient, setSelectedClient] = useState<Client | null>(null)
  const [newClient, setNewClient] = useState({
    name: "",
    address: "",
    phone: "",
    cuitDni: "",
    priceList: "S" as "S" | "R" | "P",
  })
  const [searchTerm, setSearchTerm] = useState("")
  const [cart, setCart] = useState<CartItem[]>([])
  const [orderNotes, setOrderNotes] = useState("")
  const [dollarRate] = useState(1290) // Cotización real de tu CSV

  const filteredProducts = realProducts.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.reference.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const productsByCategory = filteredProducts.reduce(
    (acc, product) => {
      if (!acc[product.category]) {
        acc[product.category] = []
      }
      acc[product.category].push(product)
      return acc
    },
    {} as Record<string, Product[]>,
  )

  const addToCart = (product: Product, quantity = 1) => {
    const existingItem = cart.find((item) => item.product.id === product.id)
    if (existingItem) {
      setCart(
        cart.map((item) => (item.product.id === product.id ? { ...item, quantity: item.quantity + quantity } : item)),
      )
    } else {
      setCart([...cart, { product, quantity }])
    }
  }

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId)
      return
    }
    setCart(cart.map((item) => (item.product.id === productId ? { ...item, quantity } : item)))
  }

  const updatePrice = (productId: string, customPrice: number) => {
    setCart(cart.map((item) => (item.product.id === productId ? { ...item, customPrice } : item)))
  }

  const removeFromCart = (productId: string) => {
    setCart(cart.filter((item) => item.product.id !== productId))
  }

  const getItemPrice = (item: CartItem) => {
    if (item.customPrice) return item.customPrice
    const priceList = selectedClient?.priceList || newClient.priceList
    switch (priceList) {
      case "R":
        return item.product.priceR
      case "P":
        return item.product.priceP
      default:
        return item.product.priceS
    }
  }

  const totalUSD = cart.reduce((sum, item) => sum + getItemPrice(item) * item.quantity, 0)
  const totalARS = totalUSD * dollarRate

  const handleRegisterSale = () => {
    const saleData = {
      client: isNewClient ? newClient : selectedClient,
      cart,
      totalUSD,
      totalARS,
      notes: orderNotes,
      dollarRate,
      date: new Date().toLocaleDateString("es-AR"),
      warehouse: "FRIODOCK ( Tortuguitas)",
    }

    console.log("Registrando venta:", saleData)
    alert(
      `¡Venta registrada exitosamente!\n\nTotal: $${totalUSD.toFixed(2)} USD\nTotal: $${totalARS.toLocaleString()} ARS\nCliente: ${isNewClient ? newClient.name : selectedClient?.name}`,
    )

    // Limpiar formulario
    setCart([])
    setOrderNotes("")
    if (isNewClient) {
      setNewClient({
        name: "",
        address: "",
        phone: "",
        cuitDni: "",
        priceList: "S",
      })
    }
    setSelectedClient(null)
  }

  return (
    <div className="p-4 space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-2 mb-6">
        <ShoppingCart className="w-6 h-6 text-blue-600" />
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Registrar Venta</h1>
          <p className="text-gray-600">Sistema con datos reales - FRIODOCK (Tortuguitas)</p>
        </div>
      </div>

      {/* Selección de Cliente */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5" />
            Cliente
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <Switch id="new-client" checked={isNewClient} onCheckedChange={setIsNewClient} />
            <Label htmlFor="new-client">Cliente Nuevo</Label>
          </div>

          {!isNewClient ? (
            <div>
              <Label htmlFor="client-search">Buscar Cliente</Label>
              <Select
                onValueChange={(value) => {
                  const client = realClients.find((c) => c.id === value)
                  setSelectedClient(client || null)
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar cliente existente" />
                </SelectTrigger>
                <SelectContent>
                  {realClients.map((client) => (
                    <SelectItem key={client.id} value={client.id}>
                      {client.name} - {client.cuitDni} - Lista {client.priceList}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {selectedClient && (
                <div className="mt-2 p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm">
                    <strong>Dirección:</strong> {selectedClient.address}
                  </p>
                  <p className="text-sm">
                    <strong>Teléfono:</strong> {selectedClient.phone || "No registrado"}
                  </p>
                  <p className="text-sm">
                    <strong>Lista de Precios:</strong> {selectedClient.priceList}
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="client-name">Nombre</Label>
                <Input
                  id="client-name"
                  value={newClient.name}
                  onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
                  placeholder="Nombre del cliente"
                />
              </div>
              <div>
                <Label htmlFor="client-address">Dirección</Label>
                <Input
                  id="client-address"
                  value={newClient.address}
                  onChange={(e) => setNewClient({ ...newClient, address: e.target.value })}
                  placeholder="Dirección completa"
                />
              </div>
              <div>
                <Label htmlFor="client-phone">Teléfono</Label>
                <Input
                  id="client-phone"
                  value={newClient.phone}
                  onChange={(e) => setNewClient({ ...newClient, phone: e.target.value })}
                  placeholder="11-1234-5678"
                />
              </div>
              <div>
                <Label htmlFor="client-cuit">CUIT/DNI</Label>
                <Input
                  id="client-cuit"
                  value={newClient.cuitDni}
                  onChange={(e) => setNewClient({ ...newClient, cuitDni: e.target.value })}
                  placeholder="20-12345678-9"
                />
              </div>
              <div>
                <Label htmlFor="price-list">Lista de Precios</Label>
                <Select
                  value={newClient.priceList}
                  onValueChange={(value: "S" | "R" | "P") => setNewClient({ ...newClient, priceList: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="S">Lista S (Precio completo)</SelectItem>
                    <SelectItem value="R">Lista R (10% descuento)</SelectItem>
                    <SelectItem value="P">Lista P (20% descuento)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Búsqueda de Productos */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="w-5 h-5" />
            Productos Disponibles
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Buscar productos por nombre o referencia..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <Accordion type="multiple" className="w-full">
            {Object.entries(productsByCategory).map(([category, products]) => (
              <AccordionItem key={category} value={category}>
                <AccordionTrigger className="text-left">
                  {category} ({products.length} productos)
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3">
                    {products.map((product) => (
                      <div key={product.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex-1">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                              <Package className="w-6 h-6 text-gray-400" />
                            </div>
                            <div>
                              <h4 className="font-medium">{product.name}</h4>
                              <p className="text-sm text-gray-500">Ref: {product.reference}</p>
                              <div className="flex items-center gap-2 mt-1">
                                <div className="text-xs">
                                  <span className="font-semibold">S: ${product.priceS}</span>
                                  <span className="text-gray-500 ml-2">R: ${product.priceR}</span>
                                  <span className="text-gray-500 ml-2">P: ${product.priceP}</span>
                                </div>
                              </div>
                              <Badge variant={product.stock <= product.minStock ? "destructive" : "secondary"}>
                                Stock: {product.stock} {product.stock <= product.minStock && "(¡BAJO!)"}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => addToCart(product, -1)}
                            disabled={cart.find((item) => item.product.id === product.id)?.quantity === 1}
                          >
                            <Minus className="w-4 h-4" />
                          </Button>
                          <span className="w-8 text-center font-medium">
                            {cart.find((item) => item.product.id === product.id)?.quantity || 0}
                          </span>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => addToCart(product, 1)}
                            disabled={product.stock <= 0}
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>

      {/* Carrito */}
      {cart.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Resumen del Pedido ({cart.length} productos)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {cart.map((item) => (
                <div key={item.product.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium">{item.product.name}</h4>
                    <p className="text-sm text-gray-500">Ref: {item.product.reference}</p>
                    <p className="text-xs text-gray-400">Lista {selectedClient?.priceList || newClient.priceList}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                      <Input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.product.id, Number.parseInt(e.target.value) || 0)}
                        className="w-16 text-center"
                        min="0"
                      />
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-1">
                        <span className="text-sm">$</span>
                        <Input
                          type="number"
                          value={item.customPrice || getItemPrice(item)}
                          onChange={(e) => updatePrice(item.product.id, Number.parseFloat(e.target.value) || 0)}
                          className="w-20 text-right"
                          step="0.01"
                        />
                      </div>
                      <p className="text-sm font-medium text-green-600">
                        ${(getItemPrice(item) * item.quantity).toFixed(2)}
                      </p>
                    </div>
                    <Button size="sm" variant="destructive" onClick={() => removeFromCart(item.product.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}

              <Separator />

              <div className="space-y-2 bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total (USD):</span>
                  <span className="text-green-600">${totalUSD.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Cotización: ${dollarRate} ARS</span>
                  <span></span>
                </div>
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total (ARS):</span>
                  <span className="text-blue-600">${totalARS.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Finalizar Venta */}
      <Card>
        <CardHeader>
          <CardTitle>Finalizar Venta</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="order-notes">Notas del Pedido</Label>
            <Textarea
              id="order-notes"
              value={orderNotes}
              onChange={(e) => setOrderNotes(e.target.value)}
              placeholder="Ejemplo: entregar miércoles 16 o jueves 17 máximo"
              rows={3}
            />
          </div>

          <Button
            onClick={handleRegisterSale}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg"
            disabled={cart.length === 0 || (!selectedClient && (!isNewClient || !newClient.name))}
          >
            <ShoppingCart className="w-5 h-5 mr-2" />
            Registrar Venta - ${totalUSD.toFixed(2)} USD
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
