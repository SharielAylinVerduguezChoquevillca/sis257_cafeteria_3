<script setup lang="ts">
import VentaList from '../components/venta/VentaList.vue'
import VentaSave from '../components/venta/VentaSave.vue'
import { ref } from 'vue'
import type { Venta } from '../models/venta'

const mostrarDialog = ref(false)
const ventaListRef = ref<typeof VentaList | null>(null)
const ventaEdit = ref<Venta | null>(null)

function handleCreate() {
  ventaEdit.value = null
  mostrarDialog.value = true
}

function handleEdit(venta: Venta) {
  ventaEdit.value = venta
  mostrarDialog.value = true
}

function handleCloseDialog() {
  mostrarDialog.value = false
}

function handleGuardar() {
  ventaListRef.value?.obtenerLista()
}
</script>

<template>
  <div class="ftco-section">
    <div class="container">
      <div class="heading-section text-center mb-5">
        <span class="subheading">Gestión</span>
        <h2>Ventas</h2>
      </div>

      <div class="d-flex justify-content-end mb-4">
        <button class="btn btn-primary px-4 py-2" @click="handleCreate">
          <span>+ Nueva Venta</span>
        </button>
      </div>

      <VentaList ref="ventaListRef" @edit="handleEdit" />

      <VentaSave
        :mostrar="mostrarDialog"
        :venta="ventaEdit"
        :modoEdicion="!!ventaEdit"
        @guardar="handleGuardar"
        @close="handleCloseDialog"
      />
    </div>
  </div>
</template>
