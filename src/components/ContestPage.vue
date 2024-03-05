<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { getSellers } from '@/api/sellers'
import { getImages } from '@/api/googleimages'

interface User {
  id: string
  name: string
  image: string
}

const users = ref<User[]>([])
const images = ref<any[]>([])
const searchText = ref<string>('')
let searchValue = ref<string>('')
const defaultImage = ref<string>(
  'https://www.lovethispic.com/uploaded_images/204120-Puppy-Says-Hello.jpg'
)
const showResults = ref<boolean>(false)

onMounted(() => {
  getSellers().then((res) => {
    users.value = res
  })

  /* getImages('cars').then((res) => {
    images.value = res
  }) */
})

watch([users, images], (newItems) => {
  const [users, images] = newItems
  // Orden random de usuarios de forma asc - desc
  users.sort(() => Math.random() - 0.5)
  users.forEach((user, index) => {
    // Img random para el usuario
    const random = Math.floor(Math.random() * 10)
    user.image = images[random]?.image?.thumbnailLink
  })
})

function getValue() {
  searchValue.value = searchText.value

  getImages(searchValue.value).then((res) => {
    images.value = res
    showResults.value = true
  })

  searchText.value = ''
}
</script>

<template>
  <section>
    <div class="searcher-container">
      <input v-model="searchText" type="text" placeholder="Frutas, vehículos, animales" />
      <button @click="getValue">Buscar</button>
    </div>
    <p :class="{ hidden: !showResults }">Esto es lo que encontramos para "{{ searchValue }}"</p>
  </section>

  <div v-if="showResults">
    <div v-for="user in users" :key="user.id">
      <img :src="user.image || defaultImage" alt="random image" />
      <button :id="user.name">like</button>
      <h3>{{ user.name }}</h3>
    </div>
  </div>
  <div v-else>
    <p>Nuestros vendedores están listos para responder a tus solicitudes</p>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

.hidden {
  display: none;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
