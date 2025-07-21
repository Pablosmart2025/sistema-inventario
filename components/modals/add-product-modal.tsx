"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus } from "lucide-react"

interface AddProductModalProps {
  trigger?: React.ReactNode
}

export default function AddProductModal({ trigger }: AddProductModalProps) {
  const [open, setOpen] = useState(false)
  const [product, setProduct] = useState({
    name: "",
    reference: "",
    warehouse: "",
    priceS: "",
    priceR: "",
    priceP: "",
    initialStock: "",
    minStock: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Agregando producto:", product)
    alert("Producto agregado exitosamente!")
    setOpen(false)
    setProduct({
      name: "",
      reference: "",
      warehouse: "",
      priceS: "",
      priceR: "",
      priceP: "",
      initialStock: "",
      minStock: "",
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            Agregar Producto
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Agregar Nuevo Producto</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Nombre</Label>
              <Input
                id="name"
                value={product.name}
                onChange={(e) => setProduct({ ...product, name: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="reference">Referencia</Label>
              <Input
                id="reference"
                value={product.reference}
                onChange={(e) => setProduct({ ...product, reference: e.target.value })}
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="warehouse">Depósito</Label>
            <Select value={product.warehouse} onValueChange={(value) => setProduct({ ...product, warehouse: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar depósito" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="FRIODOCK ( Tortuguitas)">FRIODOCK (Tortuguitas)</SelectItem>
                <SelectItem value="DEPOSITO CENTRAL">DEPOSITO CENTRAL</SelectItem>
                <SelectItem value="SUCURSAL NORTE">SUCURSAL NORTE</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <Label htmlFor="priceS">Precio Lista S</Label>
              <Input
                id="priceS"
                type="number"
                step="0.01"
                value={product.priceS}
                onChange={(e) => setProduct({ ...product, priceS: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="priceR">Precio Lista R</Label>
              <Input
                id="priceR"
                type="number"
                step="0.01"
                value={product.priceR}
                onChange={(e) => setProduct({ ...product, priceR: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="priceP">Precio Lista P</Label>
              <Input
                id="priceP"
                type="number"
                step="0.01"
                value={product.priceP}
                onChange={(e) => setProduct({ ...product, priceP: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="initialStock">Stock Inicial</Label>
              <Input
                id="initialStock"
                type="number"
                value={product.initialStock}
                onChange={(e) => setProduct({ ...product, initialStock: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="minStock">Stock Mínimo</Label>
              <Input
                id="minStock"
                type="number"
                value={product.minStock}
                onChange={(e) => setProduct({ ...product, minStock: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit" className="bg-green-600 hover:bg-green-700">
              Agregar Producto
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
