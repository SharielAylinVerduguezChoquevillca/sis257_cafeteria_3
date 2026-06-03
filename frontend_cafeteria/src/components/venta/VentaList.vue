<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from '../../plugins/axios'
import type { Venta } from '../../models/venta'

const ventas = ref<Venta[]>([])
const emit = defineEmits(['edit'])

async function obtenerLista() {
  const response = await axios.get('/ventas')
  ventas.value = response.data
}

async function eliminar(id: number) {
  if (confirm('¿Está seguro de eliminar esta venta?')) {
    await axios.delete(`/ventas/${id}`)
    await obtenerLista()
  }
}

defineExpose({ obtenerLista })

onMounted(() => {
  obtenerLista()
})
</script>

<template>
  <div class="cart-list">
    <table class="table">
      <thead>
        <tr class="thead-primary">
          <th style="width: 60px">#</th>
          <th>Fecha</th>
          <th>Cliente</th>
          <th>Usuario</th>
          <th>Total</th>
          <th>Observación</th>
          <th style="width: 180px">Acciones</th>
        </tr>
      </thead>

      <tbody>
        <tr v-if="ventas.length === 0">
          <td colspan="7" class="text-center py-5">
            <span
              style="
                color: #c49b63;
                font-size: 14px;
                letter-spacing: 1px;
                text-transform: uppercase;
              "
            >
              No hay ventas registradas
            </span>
          </td>
        </tr>

        <tr v-for="(venta, index) in ventas" :key="venta.id">
          <td>{{ index + 1 }}</td>
          <td>{{ new Date(venta.fecha!).toLocaleDateString() }}</td>
          <td>{{ venta.cliente?.nombre }}</td>
          <td>{{ venta.usuario?.nombre }}</td>
          <td class="text-gold">Bs. {{ venta.total }}</td>
          <td>{{ venta.observacion }}</td>
          <td>
            <button class="btn btn-sm btn-warning mr-2" @click="emit('edit', venta)">Editar</button>
            <button class="btn btn-sm btn-danger" @click="eliminar(venta.id)">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.cart-list {
  overflow-x: auto;
  border: 1px solid rgba(196, 155, 99, 0.2);
}

.table {
  min-width: 800px !important;
  background: transparent;
}

.table .thead-primary {
  background: #c49b63;
}

.table .thead-primary th {
  color: #000 !important;
  font-family: 'Josefin Sans', Arial, sans-serif;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-size: 12px;
  padding: 16px 12px;
  border: 1px solid transparent !important;
  font-weight: 600;
}

.table tbody tr td {
  color: #cccccc;
  background: transparent;
  border: 1px solid transparent !important;
  border-bottom: 1px solid rgba(196, 155, 99, 0.15) !important;
  padding: 18px 12px;
  vertical-align: middle;
  text-align: left !important;
}

.table tbody tr:hover td {
  background: rgba(196, 155, 99, 0.05);
}

.text-gold {
  color: #c49b63 !important;
  font-weight: 600;
}

.btn-warning {
  background: transparent;
  border: 1px solid #c49b63;
  color: #c49b63;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 1px;
  padding: 5px 12px;
  border-radius: 0;
  transition: all 0.3s ease;
}

.btn-warning:hover {
  background: #c49b63;
  color: #000;
}

.btn-danger {
  background: transparent;
  border: 1px solid rgba(220, 53, 69, 0.6);
  color: rgba(220, 53, 69, 0.8);
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 1px;
  padding: 5px 12px;
  border-radius: 0;
  transition: all 0.3s ease;
}

.btn-danger:hover {
  background: #dc3545;
  border-color: #dc3545;
  color: #fff;
}
</style>
