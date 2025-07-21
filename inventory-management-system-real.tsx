"use client"

import { useState } from "react"
import Sidebar from "./components/layout/sidebar"
import DashboardReal from "./components/dashboard-real"
import RegisterSaleReal from "./components/register-sale-real"
import AddProductModal from "./components/modals/add-product-modal"
import PickingModal from "./components/modals/picking-modal"
import RemitoModal from "./components/modals/remito-modal"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Package, Users, FileText, Settings, AlertTriangle } from "lucide-react"
import { realProducts, realClients } from "@/lib/real-data"

export default function InventoryManagementSystemReal() {
  const [activeTab, setActiveTab] = useState("dashboard")

  const lowStockProducts = realProducts.filter((product) => product.stock <= product.minStock)

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <DashboardReal />
      case "register-sale":
        return <RegisterSaleReal />
      case "products":
        return (
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-2xl font-bold">Gestión de Productos</h1>
                <p className="text-gray-600">FRIODOCK (Tortuguitas) - {realProducts.length} productos</p>
              </div>
              <AddProductModal />
            </div>

            {/* Alerta de stock bajo */}
            {lowStockProducts.length > 0 && (
              <Card className="mb-6 border-red-200 bg-red-50">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-red-700">
                    <AlertTriangle className="w-5 h-5" />
                    ¡Atención! Stock Bajo ({lowStockProducts.length} productos)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {lowStockProducts.map((product) => (
                      <div key={product.id} className="flex justify-between items-center text-sm">
                        <span className="font-medium">{product.name}</span>
                        <span className="text-red-600">
                          Stock: {product.stock} (Mín: {product.minStock})
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="w-5 h-5" />
                  Productos Disponibles
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {realProducts.map((product) => (
                    <div key={product.id} className="border rounded-lg p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                          <Package className="w-6 h-6 text-gray-400" />
                        </div>
                        <div>
                          <h3 className="font-medium">{product.name}</h3>
                          <p className="text-sm text-gray-500">Ref: {product.reference}</p>
                        </div>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Lista S:</span>
                          <span className="font-medium">${product.priceS}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Lista R:</span>
                          <span className="font-medium">${product.priceR}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Lista P:</span>
                          <span className="font-medium">${product.priceP}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Stock:</span>
                          <span
                            className={`font-medium ${product.stock <= product.minStock ? "text-red-600" : "text-green-600"}`}
                          >
                            {product.stock}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )
      case "clients":
        return (
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-2xl font-bold">Gestión de Clientes</h1>
                <p className="text-gray-600">{realClients.length} clientes registrados</p>
              </div>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Users className="w-4 h-4 mr-2" />
                Agregar Cliente
              </Button>
            </div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Lista de Clientes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {realClients.map((client) => (
                    <div key={client.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium text-lg">{client.name}</h3>
                          <p className="text-gray-600">{client.address}</p>
                          <p className="text-sm text-gray-500">CUIT/DNI: {client.cuitDni}</p>
                          {client.phone && <p className="text-sm text-gray-500">Tel: {client.phone}</p>}
                        </div>
                        <div className="text-right">
                          <span className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                            Lista {client.priceList}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )
      case "reports":
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Reportes y Documentos</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    Hoja de Picking
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-500 mb-4">
                    Genera hojas de picking para FRIODOCK (Tortuguitas) por fecha y cliente.
                  </p>
                  <PickingModal />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    Remitos
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-500 mb-4">Genera remitos para pedidos de tus clientes registrados.</p>
                  <RemitoModal />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    Reportes de Ventas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-500 mb-4">Exporta reportes con los datos reales de tu negocio.</p>
                  <Button variant="outline">
                    <FileText className="w-4 h-4 mr-2" />
                    Generar Reporte
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        )
      case "settings":
        return (
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Configuración</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="w-5 h-5" />
                    Configuración General
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Cotización USD</label>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-green-600">$1,290</span>
                      <span className="text-gray-500">ARS</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Depósito Principal</label>
                    <p className="text-gray-700">FRIODOCK (Tortuguitas)</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Listas de Precios</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between">
                    <span>Lista S:</span>
                    <span>Precio completo</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Lista R:</span>
                    <span>10% descuento</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Lista P:</span>
                    <span>20% descuento</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )
      default:
        return <DashboardReal />
    }
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="flex-1 md:ml-0 overflow-auto">
        <main className="min-h-full">{renderContent()}</main>
      </div>
    </div>
  )
}
