<script setup>
import { onMounted, ref } from 'vue';
import { recintosApi } from '../api';

const recintos = ref([]);
const error = ref('');
const editandoId = ref(null);
const vacio = () => ({ nombre: '', ciudad: '', aforoMaximo: null });
const form = ref(vacio());

async function cargar() {
  try {
    recintos.value = await recintosApi.listar();
  } catch (e) {
    error.value = e.message;
  }
}

async function guardar() {
  error.value = '';
  // El aforo es opcional: si el input está vacío no se envía el campo
  const body = { nombre: form.value.nombre, ciudad: form.value.ciudad };
  if (form.value.aforoMaximo) body.aforoMaximo = Number(form.value.aforoMaximo);
  try {
    if (editandoId.value) await recintosApi.actualizar(editandoId.value, body);
    else await recintosApi.crear(body);
    cancelar();
    await cargar();
  } catch (e) {
    error.value = e.message;
  }
}

function editar(r) {
  editandoId.value = r.id;
  form.value = { nombre: r.nombre, ciudad: r.ciudad, aforoMaximo: r.aforoMaximo };
}

function cancelar() {
  editandoId.value = null;
  form.value = vacio();
}

async function eliminar(r) {
  if (!confirm(`¿Eliminar el recinto "${r.nombre}"?`)) return;
  try {
    await recintosApi.eliminar(r.id);
    await cargar();
  } catch (e) {
    error.value = e.message;
  }
}

onMounted(cargar);
</script>

<template>
  <div>
    <div v-if="error" class="error">{{ error }}</div>

    <section class="card">
      <h2>{{ editandoId ? 'Editar recinto' : 'Nuevo recinto' }}</h2>
      <form @submit.prevent="guardar">
        <label>Nombre
          <input v-model="form.nombre" maxlength="100" required placeholder="Teatro Gran Mariscal" />
        </label>
        <label>Ciudad
          <input v-model="form.ciudad" maxlength="50" required placeholder="Sucre" />
        </label>
        <label>Aforo máximo (opcional)
          <input v-model="form.aforoMaximo" type="number" min="1" />
        </label>
        <div class="actions">
          <button class="primary" type="submit">{{ editandoId ? 'Actualizar' : 'Guardar' }}</button>
          <button v-if="editandoId" class="ghost" type="button" @click="cancelar">Cancelar</button>
        </div>
      </form>
    </section>

    <section class="card">
      <h2>Recintos registrados</h2>
      <table v-if="recintos.length">
        <thead>
          <tr><th>ID</th><th>Nombre</th><th>Ciudad</th><th>Aforo</th><th></th></tr>
        </thead>
        <tbody>
          <tr v-for="r in recintos" :key="r.id">
            <td>{{ r.id }}</td>
            <td>{{ r.nombre }}</td>
            <td>{{ r.ciudad }}</td>
            <td>{{ r.aforoMaximo ?? '—' }}</td>
            <td class="acciones">
              <button class="editar" @click="editar(r)">Editar</button>
              <button class="borrar" @click="eliminar(r)">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>
      <p v-else class="vacio">Aún no hay recintos. Crea el primero arriba.</p>
    </section>
  </div>
</template>
