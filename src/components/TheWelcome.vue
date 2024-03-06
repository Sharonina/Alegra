<script setup lang="ts">
import { RouterLink } from 'vue-router'
import successImage from '@/assets/success.png'
</script>

<template>
  <section class="flex items-center mt-10 flex-col md:flex-row">
    <figure><img :src="successImage" alt="Success team image" /></figure>
    <div class="flex flex-col items-center md:p-10 md:w-3/5">
      <h1 class="text-lg font-semibold text-center md:text-xl">
        ¿Estás listo para explorar y descubrir las maravillas visuales que nuestros vendedores
        tienen para ofrecerte?
      </h1>
      <p class="mt-5 text-md text-center md:text-lg">
        Tu misión es simple pero emocionante: navega a través de las imágenes ofrecidas por nuestros
        talentosos vendedores y selecciona tus favoritas dandoles un merecido "like". Recuerda que
        ¡Cada like cuenta y determinará quién será el vendedor ganador con más puntos al final del
        juego!
      </p>
      <p class="mt-5 text-md text-center md:text-lg">
        Prepárate para una experiencia visual única y emocionante.<br />
        ¡Que comience la aventura! 🌍✨
      </p>
      <RouterLink to="/contest" class="px-8 py-4 mt-10 border border-light-green"
        >Comenzar el juego</RouterLink
      >
    </div>
  </section>
</template>
