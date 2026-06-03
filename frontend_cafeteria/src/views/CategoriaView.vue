<script setup lang="ts">
import CategoriaList from '../components/categoria/CategoriaList.vue'
import CategoriaSave from '../components/categoria/CategoriaSave.vue'
import { ref } from 'vue'
import type { Categoria } from '@/models/categoria'

const mostrarDialog = ref(false)
const categoriaListRef = ref<typeof CategoriaList | null>(null)
const categoriaEdit = ref<Categoria | null>(null)

function handleCreate() {
  categoriaEdit.value = null
  mostrarDialog.value = true
}
function handleEdit(categoria: Categoria) {
  categoriaEdit.value = categoria
  mostrarDialog.value = true
}
function handleCloseDialog() {
  mostrarDialog.value = false
}
function handleGuardar() {
  categoriaListRef.value?.obtenerLista()
}
</script>

<template>
  <div class="ftco-section">
    <div class="container">
      <div class="heading-section text-center mb-5">
        <span class="subheading">Gestión</span>
        <h2>Categorías</h2>
      </div>

      <div class="d-flex justify-content-end mb-4">
        <button class="btn btn-primary px-4 py-2" @click="handleCreate">
          <span>+ Nueva Categoría</span>
        </button>
      </div>

      <CategoriaList ref="categoriaListRef" @edit="handleEdit" />

      <CategoriaSave
        :mostrar="mostrarDialog"
        :categoria="categoriaEdit"
        :modoEdicion="!!categoriaEdit"
        @guardar="handleGuardar"
        @close="handleCloseDialog"
      />
    </div>
  </div>
</template>
