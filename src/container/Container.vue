<template>
   <div class="app-container" id="app">
      <div class="navbar">
         <Navbar :links="links" />
      </div>
      <div class="router-view">
         <router-view />
      </div>
   </div>
</template>

<script setup>
import Navbar from "@/Layout/Navbar/Navbar.vue";
import { useRoute } from "vue-router";

const route = useRoute();

const links = [
   {
      id: 'dashboard',
      name: 'Dashboard',
      title: 'Ana sayfa',
      icon: 'gauge-high',
      disabled: false,
   },
   {
      id: 'exports',
      name: 'Shipments',
      title: 'Nakliyeler',
      icon: 'truck',
      disabled: false,
   },
]
</script>

<style scoped lang="scss">
.router-view {
   margin: 2rem clamp(3vw, 100%, (100vw - 1652px) / 2);
   overflow: hidden;
}
</style>