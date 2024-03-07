<script setup lang="ts">
import logo from '@/assets/logo.png'
</script>

<template>
  <div class="flex items-center">
    <img class="w-10 object-contain" :src="logo" />
    <h1 class="tracking-widest text-whit text-xl ml-3">IMÁGENES DEL MUNDO</h1>
  </div>
</template>

<style scoped>
.greetings h1 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1 {
    text-align: left;
  }
}
</style>
