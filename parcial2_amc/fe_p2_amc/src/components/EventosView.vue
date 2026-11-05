<script setup>
import { onMounted, ref } from 'vue';
import { eventosApi, recintosApi } from '../api';

// Mismos valores que el enum del backend (EstadoEvento)
const ESTADOS = ['Programado', 'Agotado', 'Cancelado'];

const eventos = ref([]);
const recintos = ref([]);
const error = ref('');
const editandoId = ref(null);
const vacio = () => ({
  idRecinto: '',
  titulo: '',
  artistaPrincipal: '',
  duracionMinutos: null,
  precioEntrada: null,
  fechaEvento: '',
  estado: 'Programado',
});
const form = ref(vacio());

async function cargar() {
  try {
    [eventos.value, recintos.value] = await Promise.all([eventosApi.listar(), recintosApi.listar()]);
  } catch (e) {
    error.value = e.message;
  }
}

async function guardar() {
  error.value = '';
  const body = {
    idRecinto: Number(form.value.idRecinto),
    titulo: form.value.titulo,
    artistaPrincipal: form.value.artistaPrincipal,
    duracionMinutos: Number(form.value.duracionMinutos),
    precioEntrada: Number(form.value.precioEntrada),
    fechaEvento: form.value.fechaEvento,
    estado: form.value.estado,
  };
  try {
    if (editandoId.value) await eventosApi.actualizar(editandoId.value, body);
    else await eventosApi.crear(body);
    cancelar();
    await cargar();
  } catch (e) {
    error.value = e.message;
  }
}

function editar(ev) {
  editandoId.value = ev.id;
  form.value = {
    idRecinto: ev.idRecinto,
    titulo: ev.titulo,
    artistaPrincipal: ev.artistaPrincipal,
    duracionMinutos: ev.duracionMinutos,
    precioEntrada: ev.precioEntrada,
    fechaEvento: ev.fechaEvento,
    estado: ev.estado,
  };
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function cancelar() {
  editandoId.value = null;
  form.value = vacio();
}

async function eliminar(ev) {
  if (!confirm(`¿Eliminar el evento "${ev.titulo}"?`)) return;
  try {
    await eventosApi.eliminar(ev.id);
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
      <h2>{{ editandoId ? 'Editar evento' : 'Nuevo evento' }}</h2>
      <form @submit.prevent="guardar">
        <label>Recinto
          <select v-model="form.idRecinto" required>
            <option value="" disabled>Selecciona un recinto</option>
            <option v-for="r in recintos" :key="r.id" :value="r.id">{{ r.nombre }} ({{ r.ciudad }})</option>
          </select>
        </label>
        <label>Título
          <input v-model="form.titulo" maxlength="150" required />
        </label>
        <label>Artista principal
          <input v-model="form.artistaPrincipal" maxlength="100" required />
        </label>
        <label>Duración (minutos)
          <input v-model="form.duracionMinutos" type="number" min="1" required />
        </label>
        <label>Precio de entrada
          <input v-model="form.precioEntrada" type="number" min="0" step="0.01" required />
        </label>
        <label>Fecha del evento
          <input v-model="form.fechaEvento" type="date" required />
        </label>
        <label>Estado
          <select v-model="form.estado" required>
            <option v-for="e in ESTADOS" :key="e" :value="e">{{ e }}</option>
          </select>
        </label>
        <div class="actions">
          <button class="primary" type="submit">{{ editandoId ? 'Actualizar' : 'Guardar' }}</button>
          <button v-if="editandoId" class="ghost" type="button" @click="cancelar">Cancelar</button>
        </div>
      </form>
    </section>

    <section class="card">
      <h2>Eventos registrados</h2>
      <table v-if="eventos.length">
        <thead>
          <tr>
            <th>Recinto</th><th>Título</th><th>Artista</th><th>Min.</th>
            <th>Precio</th><th>Fecha</th><th>Estado</th><th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="ev in eventos" :key="ev.id">
            <td>{{ ev.recinto?.nombre }}</td>
            <td>{{ ev.titulo }}</td>
            <td>{{ ev.artistaPrincipal }}</td>
            <td>{{ ev.duracionMinutos }}</td>
            <td>Bs {{ Number(ev.precioEntrada).toFixed(2) }}</td>
            <td>{{ ev.fechaEvento }}</td>
            <td><span class="badge" :class="ev.estado">{{ ev.estado }}</span></td>
            <td class="acciones">
              <button class="editar" @click="editar(ev)">Editar</button>
              <button class="borrar" @click="eliminar(ev)">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>
      <p v-else class="vacio">Aún no hay eventos. Primero crea un recinto y luego un evento.</p>
    </section>
  </div>
</template>
