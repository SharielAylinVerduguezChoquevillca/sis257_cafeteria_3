import type { Cliente } from './cliente'
import type { Usuario } from './usuario'

export interface Venta {
  id: number
  idCliente: number
  idUsuario: number
  cliente?: Cliente
  usuario?: Usuario
  fecha?: string
  total: number
  observacion?: string
}