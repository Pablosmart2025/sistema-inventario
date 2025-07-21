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
import { mockProducts, mockClients } from "@/lib/data"
import type { Product, Client, CartItem } from "@/lib/types"

export default function RegisterSale() {
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
  const [dollarRate] = useState(1290)

  const filteredProducts = mockProducts.filter(
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
    // Aquí iría la lógica para registrar la venta
    console.log("Registrando venta:", {
      client: isNewClient ? newClient : selectedClient,
      cart,
      totalUSD,
      totalARS,
      notes: orderNotes,
    })
    alert("Venta registrada exitosamente!")
  }

  return (
    <div className="p-4 space-y-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-2 mb-6">
        <ShoppingCart className="w-6 h-6 text-blue-600" />
        <h1 className="text-2xl font-bold text-gray-900">Registrar Venta</h1>
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
                  const client = mockClients.find((c) => c.id === value)
                  setSelectedClient(client || null)
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar cliente existente" />
                </SelectTrigger>
                <SelectContent>
                  {mockClients.map((client) => (
                    <SelectItem key={client.id} value={client.id}>
                      {client.name} - {client.cuitDni}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
                  placeholder="Dirección"
                />
              </div>
              <div>
                <Label htmlFor="client-phone">Teléfono</Label>
                <Input
                  id="client-phone"
                  value={newClient.phone}
                  onChange={(e) => setNewClient({ ...newClient, phone: e.target.value })}
                  placeholder="Teléfono"
                />
              </div>
              <div>
                <Label htmlFor="client-cuit">CUIT/DNI</Label>
                <Input
                  id="client-cuit"
                  value={newClient.cuitDni}
                  onChange={(e) => setNewClient({ ...newClient, cuitDni: e.target.value })}
                  placeholder="CUIT/DNI"
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
                    <SelectItem value="S">Lista S</SelectItem>
                    <SelectItem value="R">Lista R</SelectItem>
                    <SelectItem value="P">Lista P</SelectItem>
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
            Productos
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
                  {category} ({products.length})
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
                                <span className="font-semibold">${product.price}</span>
                                <Badge variant={product.stock <= product.minStock ? "destructive" : "secondary"}>
                                  Stock: {product.stock}
                                </Badge>
                              </div>
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
                          <span className="w-8 text-center">
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
            <CardTitle>Resumen del Pedido</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {cart.map((item) => (
                <div key={item.product.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium">{item.product.name}</h4>
                    <p className="text-sm text-gray-500">Ref: {item.product.reference}</p>
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
                      <Input
                        type="number"
                        value={item.customPrice || getItemPrice(item)}
                        onChange={(e) => updatePrice(item.product.id, Number.parseFloat(e.target.value) || 0)}
                        className="w-20 text-right"
                        step="0.01"
                      />
                      <p className="text-sm text-gray-500">${(getItemPrice(item) * item.quantity).toFixed(2)}</p>
                    </div>
                    <Button size="sm" variant="destructive" onClick={() => removeFromCart(item.product.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}

              <Separator />

              <div className="space-y-2">
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total (USD):</span>
                  <span>${totalUSD.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Total (ARS) - Cotización: ${dollarRate}:</span>
                  <span>${totalARS.toLocaleString()}</span>
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
              placeholder="Instrucciones especiales, fecha de entrega, etc."
              rows={3}
            />
          </div>

          <Button
            onClick={handleRegisterSale}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg"
            disabled={cart.length === 0 || (!selectedClient && !isNewClient)}
          >
            <ShoppingCart className="w-5 h-5 mr-2" />
            Registrar Venta - ${totalUSD.toFixed(2)}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
