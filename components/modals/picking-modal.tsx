"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileText } from "lucide-react"

interface PickingModalProps {
  trigger?: React.ReactNode
}

export default function PickingModal({ trigger }: PickingModalProps) {
  const [open, setOpen] = useState(false)
  const [filters, setFilters] = useState({
    dateFrom: "",
    dateTo: "",
    warehouse: "",
    client: "",
  })

  const handleGenerate = () => {
    console.log("Generando hoja de picking:", filters)
    alert("Hoja de picking generada exitosamente!")
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline">
            <FileText className="w-4 h-4 mr-2" />
            Generar Picking
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>Generar Hoja de Picking</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="dateFrom">Fecha Desde</Label>
              <Input
                id="dateFrom"
                type="date"
                value={filters.dateFrom}
                onChange={(e) => setFilters({ ...filters, dateFrom: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="dateTo">Fecha Hasta</Label>
              <Input
                id="dateTo"
                type="date"
                value={filters.dateTo}
                onChange={(e) => setFilters({ ...filters, dateTo: e.target.value })}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="warehouse">Depósito</Label>
            <Select value={filters.warehouse} onValueChange={(value) => setFilters({ ...filters, warehouse: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar depósito" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los depósitos</SelectItem>
                <SelectItem value="FRIODOCK ( Tortuguitas)">FRIODOCK (Tortuguitas)</SelectItem>
                <SelectItem value="DEPOSITO CENTRAL">DEPOSITO CENTRAL</SelectItem>
                <SelectItem value="SUCURSAL NORTE">SUCURSAL NORTE</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="client">Cliente</Label>
            <Select value={filters.client} onValueChange={(value) => setFilters({ ...filters, client: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar cliente (opcional)" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos los clientes</SelectItem>
                <SelectItem value="ADRIAN">ADRIAN</SelectItem>
                <SelectItem value="MARIA GONZALEZ">MARIA GONZALEZ</SelectItem>
                <SelectItem value="CARLOS LOPEZ">CARLOS LOPEZ</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleGenerate} className="bg-blue-600 hover:bg-blue-700">
              <FileText className="w-4 h-4 mr-2" />
              Generar Hoja
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
