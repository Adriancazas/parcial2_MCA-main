<script setup>
import { ref } from 'vue';
import RecintosView from './components/RecintosView.vue';
import EventosView from './components/EventosView.vue';

const tab = ref('eventos');
</script>

<template>
  <div class="container">
    <header>
      <h1>🎭 Agenda y boletaje de eventos culturales</h1>
      <p>Gestión de recintos y eventos</p>
    </header>

    <nav class="tabs">
      <button :class="{ active: tab === 'eventos' }" @click="tab = 'eventos'">Eventos</button>
      <button :class="{ active: tab === 'recintos' }" @click="tab = 'recintos'">Recintos</button>
    </nav>

    <!-- v-if recrea el componente al cambiar de pestaña, así siempre recarga datos frescos -->
    <EventosView v-if="tab === 'eventos'" />
    <RecintosView v-else />
  </div>
</template>
