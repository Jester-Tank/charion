<script setup>
import Navbar from './components/Navbar.vue';
import { RouterView } from 'vue-router';

</script>

<template>
  <header>
    <Navbar />
  </header>
  <main>
    <RouterView/>
  </main>
  <footer class=" text-center">
    made proudly by Zagan
  </footer>
</template>

<style lang="scss">


</style>
