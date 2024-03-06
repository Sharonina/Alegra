<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <div>
    <h1>
      ¿Estás listo para explorar y descubrir las maravillas visuales que nuestros vendedores tienen
      para ofrecerte?
    </h1>
    <p>
      Tu misión es simple pero emocionante: navega a través de las imágenes ofrecidas por nuestros
      talentosos vendedores y selecciona tus favoritas dandoles un merecido "like". Recuerda que
      ¡Cada like cuenta y determinará quién será el vendedor ganador con más puntos al final del
      juego!
    </p>
    <p>
      Prepárate para una experiencia visual única y emocionante. ¡Que comience la aventura! 🌍✨
    </p>
    <RouterLink to="/contest">Comenzar el juego</RouterLink>
  </div>
</template>
