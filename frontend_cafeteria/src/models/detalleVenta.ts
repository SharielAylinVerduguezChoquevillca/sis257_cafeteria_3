import type { Venta } from './venta'
import type { Producto } from './producto'

export interface DetalleVenta {
  id: number
  idVenta: number
  idProducto: number
  venta?: Venta
  producto?: Producto
  cantidad: number
  precioUnitario: number
  subtotal: number
}