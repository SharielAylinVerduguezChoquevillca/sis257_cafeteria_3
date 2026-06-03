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
  <div class="ftco-section">
    <div class="container">
      <div class="heading-section text-center mb-5">
        <span class="subheading">Gestión</span>
        <h2>Clientes</h2>
      </div>

      <div class="d-flex justify-content-end mb-4">
        <button class="btn btn-primary px-4 py-2" @click="handleCreate">
          <span>+ Nuevo Cliente</span>
        </button>
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
  </div>
</template>
