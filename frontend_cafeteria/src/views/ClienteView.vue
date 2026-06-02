<script setup lang="ts">
import ClienteList from '../components/cliente/ClienteList.vue'
import ClienteSave from '../components/cliente/ClienteSave.vue'
import { ref } from 'vue'
import type { Cliente } from '../models/cliente'

const mostrarDialog = ref(false)
const clienteListRef = ref<typeof ClienteList | null>(null)
const clienteEdit = ref<Cliente | null>(null)

function handleCreate() {
  clienteEdit.value = null
  mostrarDialog.value = true
}

function handleEdit(cliente: Cliente) {
  clienteEdit.value = cliente
  mostrarDialog.value = true
}

function handleCloseDialog() {
  mostrarDialog.value = false
}

function handleGuardar() {
  clienteListRef.value?.obtenerLista()
}
</script>

<template>
  <div>
    <div class="flex justify-content-between align-items-center mt-3">
      <h2>Clientes</h2>
      <button class="p-button p-button-primary" @click="handleCreate">Nuevo Cliente</button>
    </div>
    <ClienteList ref="clienteListRef" @edit="handleEdit" />
    <ClienteSave
      :mostrar="mostrarDialog"
      :cliente="clienteEdit"
      :modoEdicion="!!clienteEdit"
      @guardar="handleGuardar"
      @close="handleCloseDialog"
    />
  </div>
</template>
