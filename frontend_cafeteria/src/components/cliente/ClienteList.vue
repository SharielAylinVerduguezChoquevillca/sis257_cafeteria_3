<script setup lang="ts">
import { ref, onMounted } from 'vue'
import axios from '../../plugins/axios'
import type { Cliente } from '../../models/cliente'

const clientes = ref<Cliente[]>([])
const emit = defineEmits(['edit'])

async function obtenerLista() {
  const response = await axios.get('/clientes')
  clientes.value = response.data
}

async function eliminar(id: number) {
  if (confirm('¿Está seguro de eliminar este cliente?')) {
    await axios.delete(`/clientes/${id}`)
    await obtenerLista()
  }
}

defineExpose({ obtenerLista })

onMounted(() => {
  obtenerLista()
})
</script>

<template>
  <div class="mt-3">
    <table class="p-datatable p-component w-full">
      <thead>
        <tr>
          <th>Nro</th>
          <th>Nombre</th>
          <th>CI</th>
          <th>Teléfono</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(cliente, index) in clientes" :key="cliente.id">
          <td>{{ index + 1 }}</td>
          <td>{{ cliente.nombre }}</td>
          <td>{{ cliente.ci }}</td>
          <td>{{ cliente.telefono }}</td>
          <td>
            <button
              class="p-button p-button-warning p-button-sm mr-2"
              @click="emit('edit', cliente)"
            >
              Editar
            </button>
            <button class="p-button p-button-danger p-button-sm" @click="eliminar(cliente.id)">
              Eliminar
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
