"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { BarChart3, ShoppingCart, Package, Users, FileText, Settings, Menu, X } from "lucide-react"

interface SidebarProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

const menuItems = [
  { id: "dashboard", label: "Dashboard", icon: BarChart3 },
  { id: "register-sale", label: "Registrar Venta", icon: ShoppingCart },
  { id: "products", label: "Productos", icon: Package },
  { id: "clients", label: "Clientes", icon: Users },
  { id: "reports", label: "Reportes", icon: FileText },
  { id: "settings", label: "Configuración", icon: Settings },
]

export default function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="sm"
        className="fixed top-4 left-4 z-50 md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </Button>

      {/* Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" onClick={() => setIsOpen(false)} />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200 z-40 transform transition-transform duration-200 ease-in-out",
          "md:translate-x-0 md:static md:z-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-8">Sistema de Inventario</h2>

          <nav className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon
              return (
                <Button
                  key={item.id}
                  variant={activeTab === item.id ? "default" : "ghost"}
                  className={cn(
                    "w-full justify-start",
                    activeTab === item.id
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "text-gray-700 hover:bg-gray-100",
                  )}
                  onClick={() => {
                    onTabChange(item.id)
                    setIsOpen(false)
                  }}
                >
                  <Icon className="w-4 h-4 mr-3" />
                  {item.label}
                </Button>
              )
            })}
          </nav>
        </div>
      </div>
    </>
  )
}
