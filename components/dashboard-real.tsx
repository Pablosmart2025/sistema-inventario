"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CalendarIcon, DollarSign, Package, ShoppingCart, TrendingUp, Users } from "lucide-react"
import { getRealKPIData, getRealTopProducts, getRealTopClients, realSellers, realClients } from "@/lib/real-data"

export default function DashboardReal() {
  const [dateFrom, setDateFrom] = useState("")
  const [dateTo, setDateTo] = useState("")
  const [selectedSeller, setSelectedSeller] = useState("")
  const [selectedClient, setSelectedClient] = useState("")

  const kpiData = getRealKPIData()
  const topProducts = getRealTopProducts()
  const topClients = getRealTopClients()

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Sistema de Gestión de Inventario - Datos Reales</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm">
            <CalendarIcon className="w-4 h-4 mr-2" />
            Exportar Reporte
          </Button>
        </div>
      </div>

      {/* Filtros Globales */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Filtros</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="dateFrom">Fecha Desde</Label>
              <Input id="dateFrom" type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="dateTo">Fecha Hasta</Label>
              <Input id="dateTo" type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="seller">Vendedor</Label>
              <Select value={selectedSeller} onValueChange={setSelectedSeller}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar vendedor" />
                </SelectTrigger>
                <SelectContent>
                  {realSellers.map((seller) => (
                    <SelectItem key={seller} value={seller}>
                      {seller}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="client">Cliente</Label>
              <Select value={selectedClient} onValueChange={setSelectedClient}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar cliente" />
                </SelectTrigger>
                <SelectContent>
                  {realClients.map((client) => (
                    <SelectItem key={client.id} value={client.id}>
                      {client.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="mt-4">
            <Button className="bg-blue-600 hover:bg-blue-700">Aplicar Filtros</Button>
          </div>
        </CardContent>
      </Card>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ventas Totales (USD)</CardTitle>
            <DollarSign className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${kpiData.totalSales.toLocaleString()}</div>
            <p className="text-xs text-green-600 mt-1">
              <TrendingUp className="inline w-3 h-3 mr-1" />
              Datos reales de tu negocio
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unidades Vendidas</CardTitle>
            <Package className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpiData.unitsSold.toLocaleString()}</div>
            <p className="text-xs text-green-600 mt-1">
              <TrendingUp className="inline w-3 h-3 mr-1" />
              Total de productos vendidos
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Nº de Pedidos</CardTitle>
            <ShoppingCart className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpiData.orderCount}</div>
            <p className="text-xs text-green-600 mt-1">
              <TrendingUp className="inline w-3 h-3 mr-1" />
              Pedidos registrados
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Rankings */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top 5 Productos */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="w-5 h-5 text-blue-600" />
              Top Productos Más Vendidos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Producto</TableHead>
                  <TableHead className="text-right">Ventas</TableHead>
                  <TableHead className="text-right">Ingresos</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topProducts.map((product, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell className="text-right">{product.sales}</TableCell>
                    <TableCell className="text-right">${product.revenue.toLocaleString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Top 5 Clientes */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-600" />
              Top Clientes (por Monto de Compra)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Cliente</TableHead>
                  <TableHead className="text-right">Pedidos</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topClients.map((client, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{client.name}</TableCell>
                    <TableCell className="text-right">{client.orders}</TableCell>
                    <TableCell className="text-right">${client.total.toLocaleString()}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Información adicional */}
      <Card>
        <CardHeader>
          <CardTitle>Información del Sistema</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <p className="font-medium text-gray-700">Depósito Principal:</p>
              <p className="text-gray-600">FRIODOCK (Tortuguitas)</p>
            </div>
            <div>
              <p className="font-medium text-gray-700">Cotización USD:</p>
              <p className="text-gray-600">$1,290 ARS</p>
            </div>
            <div>
              <p className="font-medium text-gray-700">Última Actualización:</p>
              <p className="text-gray-600">21/7/2025</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
