<script setup lang="ts">
import { ref, watch } from 'vue'
import axios from '../../plugins/axios'
import type { Categoria } from '../../models/categoria'

const props = defineProps<{
  mostrar: boolean
  categoria: Categoria | null
  modoEdicion: boolean
}>()

const emit = defineEmits(['guardar', 'close'])

const form = ref<Categoria>({
  id: 0,
  nombre: '',
  descripcion: '',
})

const loading = ref(false)
const error = ref('')

watch(
  () => props.categoria,
  (val) => {
    if (val) {
      form.value = { ...val }
    } else {
      form.value = { id: 0, nombre: '', descripcion: '' }
    }
    error.value = ''
  },
)

async function guardar() {
  if (!form.value.nombre.trim()) {
    error.value = 'El nombre es obligatorio'
    return
  }
  try {
    loading.value = true
    error.value = ''
    if (props.modoEdicion) {
      await axios.patch(`/categorias/${form.value.id}`, form.value)
    } else {
      await axios.post('/categorias', form.value)
    }
    emit('guardar')
    emit('close')
  } catch (e) {
    error.value = 'Ocurrió un error al guardar. Intente de nuevo.'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div v-if="mostrar" class="modal-overlay" @click.self="emit('close')">
    <div class="modal-panel">
      <div class="modal-header-coffee">
        <span class="subheading-sm">Cafetería</span>
        <h3>{{ modoEdicion ? 'Editar Categoría' : 'Nueva Categoría' }}</h3>
        <button class="close-btn" @click="emit('close')">✕</button>
      </div>

      <div class="gold-divider"></div>

      <div class="modal-body-coffee">
        <div v-if="error" class="error-msg mb-3">{{ error }}</div>

        <div class="appointment-form">
          <div class="form-group mb-4">
            <label class="field-label">Nombre</label>
            <input
              v-model="form.nombre"
              class="form-control"
              placeholder="Ej: Bebidas calientes"
              :class="{ 'is-invalid': error && !form.nombre.trim() }"
            />
          </div>

          <div class="form-group mb-4">
            <label class="field-label">Descripción</label>
            <input
              v-model="form.descripcion"
              class="form-control"
              placeholder="Descripción opcional"
            />
          </div>
        </div>
      </div>

      <div class="modal-footer-coffee">
        <button class="btn btn-primary px-4" :disabled="loading" @click="guardar">
          <span>{{ loading ? 'Guardando...' : 'Guardar' }}</span>
        </button>
        <button class="btn btn-outline-white ml-3" @click="emit('close')">Cancelar</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.75);
  z-index: 1050;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.modal-panel {
  background: #1a1512;
  border: 1px solid rgba(196, 155, 99, 0.3);
  width: 100%;
  max-width: 460px;
  position: relative;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.6);
}

.modal-header-coffee {
  padding: 28px 30px 16px;
  position: relative;
}
.subheading-sm {
  font-family: 'Great Vibes', cursive;
  font-size: 26px;
  color: #c49b63;
  display: block;
  line-height: 1;
  margin-bottom: -6px;
}
.modal-header-coffee h3 {
  font-family: 'Josefin Sans', Arial, sans-serif;
  font-size: 22px;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: #fff;
  margin: 0;
  font-weight: 700;
}
.close-btn {
  position: absolute;
  top: 20px;
  right: 20px;
  background: transparent;
  border: none;
  color: rgba(255, 255, 255, 0.4);
  font-size: 16px;
  cursor: pointer;
  transition: color 0.3s;
  padding: 4px 8px;
}
.close-btn:hover {
  color: #c49b63;
}

.gold-divider {
  height: 2px;
  background: linear-gradient(to right, #c49b63, rgba(196, 155, 99, 0.1));
  margin: 0 30px;
}

.modal-body-coffee {
  padding: 24px 30px;
}

.field-label {
  display: block;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: rgba(255, 255, 255, 0.5);
  margin-bottom: 6px;
  font-family: 'Work Sans', sans-serif;
}

.appointment-form .form-control {
  border: transparent !important;
  border-bottom: 1px solid rgba(255, 255, 255, 0.15) !important;
  height: 48px !important;
  padding-left: 0;
  background: transparent !important;
  color: rgba(255, 255, 255, 0.9) !important;
  font-size: 14px;
  border-radius: 0;
  box-shadow: none !important;
  transition: border-color 0.3s;
}
.appointment-form .form-control::placeholder {
  color: rgba(255, 255, 255, 0.25);
}
.appointment-form .form-control:focus,
.appointment-form .form-control:active {
  border-bottom-color: #c49b63 !important;
  outline: none;
}
.appointment-form .form-control.is-invalid {
  border-bottom-color: #dc3545 !important;
}

.error-msg {
  background: rgba(220, 53, 69, 0.12);
  border-left: 3px solid #dc3545;
  color: #f5a0a8;
  font-size: 13px;
  padding: 8px 12px;
}

.modal-footer-coffee {
  padding: 16px 30px 28px;
  display: flex;
  align-items: center;
  border-top: 1px solid rgba(196, 155, 99, 0.1);
}

.btn-primary {
  background: #c49b63;
  border: 1px solid #c49b63;
  color: #000;
  font-family: 'Josefin Sans', Arial, sans-serif;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 2px;
  border-radius: 0;
  height: 44px;
  transition: all 0.3s ease;
}
.btn-primary:hover:not(:disabled) {
  background: transparent;
  color: #c49b63;
}
.btn-primary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.btn-primary span {
  color: inherit;
}

.btn-outline-white {
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: rgba(255, 255, 255, 0.6);
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 2px;
  border-radius: 0;
  height: 44px;
  padding: 0 20px;
  transition: all 0.3s ease;
}
.btn-outline-white:hover {
  border-color: rgba(255, 255, 255, 0.5);
  color: #fff;
}
</style>
