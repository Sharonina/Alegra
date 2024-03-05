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
  users.forEach((user, index) => {
    //randon number between 0 and 9
    const random = Math.floor(Math.random() * 10)
    user.image = images[random]?.image?.thumbnailLink
  })
})

function getValue() {
  console.log(searchText.value)
  searchValue.value = searchText.value

  getImages(searchValue.value).then((res) => {
    images.value = res
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
    <p>Esto es lo que encontramos para "{{ searchValue }}"</p>
  </section>

  <div v-for="user in users" :key="user.id">
    <img :src="user.image" alt="radom image" />
    <h3>{{ user.name }}</h3>
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

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
