<script setup lang="ts">
import { ref, watch } from 'vue'
import axios from '../../plugins/axios'
import type { Cliente } from '../../models/cliente'

const props = defineProps<{
  mostrar: boolean
  cliente: Cliente | null | undefined
  modoEdicion: boolean
}>()

const emit = defineEmits(['guardar', 'close'])

const form = ref<Cliente>({
  id: 0,
  nombre: '',
  ci: '',
  telefono: '',
})

watch(
  () => props.cliente,
  (val) => {
    if (val) {
      form.value = { ...val }
    } else {
      form.value = { id: 0, nombre: '', ci: '', telefono: '' }
    }
  },
)

async function guardar() {
  if (props.modoEdicion) {
    await axios.patch(`/clientes/${form.value.id}`, form.value)
  } else {
    await axios.post('/clientes', form.value)
  }
  emit('guardar')
  emit('close')
}
</script>

<template>
  <div v-if="mostrar" class="p-dialog-mask">
    <div
      class="p-dialog"
      style="width: 400px; background: white; padding: 20px; border-radius: 8px; margin: 100px auto"
    >
      <h3>{{ modoEdicion ? 'Editar Cliente' : 'Nuevo Cliente' }}</h3>
      <div class="p-field mb-3">
        <label>Nombre</label>
        <input v-model="form.nombre" class="p-inputtext w-full" placeholder="Nombre completo" />
      </div>
      <div class="p-field mb-3">
        <label>CI</label>
        <input v-model="form.ci" class="p-inputtext w-full" placeholder="Carnet de identidad" />
      </div>
      <div class="p-field mb-3">
        <label>Teléfono</label>
        <input
          v-model="form.telefono"
          class="p-inputtext w-full"
          placeholder="Número de teléfono"
        />
      </div>
      <div class="mt-3">
        <button class="p-button p-button-success mr-2" @click="guardar">Guardar</button>
        <button class="p-button p-button-secondary" @click="emit('close')">Cancelar</button>
      </div>
    </div>
  </div>
</template>
