"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileText } from "lucide-react"
import { mockClients } from "@/lib/data"

interface RemitoModalProps {
  trigger?: React.ReactNode
}

export default function RemitoModal({ trigger }: RemitoModalProps) {
  const [open, setOpen] = useState(false)
  const [selectedClient, setSelectedClient] = useState("")
  const [selectedOrder, setSelectedOrder] = useState("")

  // Mock orders for selected client
  const mockOrders = [
    { id: "A00117", date: "21/7/2025", total: 1684 },
    { id: "A00118", date: "22/7/2025", total: 2340 },
    { id: "A00119", date: "23/7/2025", total: 890 },
  ]

  const handleGenerate = () => {
    console.log("Generando remito:", { client: selectedClient, order: selectedOrder })
    alert("Remito generado exitosamente!")
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline">
            <FileText className="w-4 h-4 mr-2" />
            Generar Remito
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Generar Remito</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="client">Cliente</Label>
            <Select value={selectedClient} onValueChange={setSelectedClient}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar cliente" />
              </SelectTrigger>
              <SelectContent>
                {mockClients.map((client) => (
                  <SelectItem key={client.id} value={client.id}>
                    {client.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedClient && (
            <div>
              <Label htmlFor="order">Pedido</Label>
              <Select value={selectedOrder} onValueChange={setSelectedOrder}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar pedido" />
                </SelectTrigger>
                <SelectContent>
                  {mockOrders.map((order) => (
                    <SelectItem key={order.id} value={order.id}>
                      {order.id} - {order.date} - ${order.total}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button
              onClick={handleGenerate}
              className="bg-blue-600 hover:bg-blue-700"
              disabled={!selectedClient || !selectedOrder}
            >
              <FileText className="w-4 h-4 mr-2" />
              Generar Remito
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
