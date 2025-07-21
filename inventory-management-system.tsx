"use client"

import { useState } from "react"
import Sidebar from "./components/layout/sidebar"
import Dashboard from "./components/dashboard"
import RegisterSale from "./components/register-sale"
import AddProductModal from "./components/modals/add-product-modal"
import PickingModal from "./components/modals/picking-modal"
import RemitoModal from "./components/modals/remito-modal"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Package, Users, FileText, Settings } from "lucide-react"

export default function InventoryManagementSystem() {
  const [activeTab, setActiveTab] = useState("dashboard")

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard />
      case "register-sale":
        return <RegisterSale />
      case "products":
        return (
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold">Gestión de Productos</h1>
              <AddProductModal />
            </div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="w-5 h-5" />
                  Lista de Productos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500">
                  Aquí se mostraría la lista completa de productos con opciones de edición y eliminación.
                </p>
              </CardContent>
            </Card>
          </div>
        )
      case "clients":
        return (
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold">Gestión de Clientes</h1>
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
                <p className="text-gray-500">
                  Aquí se mostraría la lista completa de clientes con sus datos de contacto y historial de compras.
                </p>
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
                    Genera hojas de picking para preparar pedidos por depósito y fecha.
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
                  <p className="text-gray-500 mb-4">Genera remitos para pedidos específicos de clientes.</p>
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
                  <p className="text-gray-500 mb-4">Exporta reportes detallados de ventas por período.</p>
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
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Configuración del Sistema
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500">
                  Aquí se mostrarían las opciones de configuración del sistema, como cotización del dólar, configuración
                  de depósitos, listas de precios, etc.
                </p>
              </CardContent>
            </Card>
          </div>
        )
      default:
        return <Dashboard />
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
