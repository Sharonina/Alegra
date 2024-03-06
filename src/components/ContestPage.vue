<script setup lang="ts">
import { onMounted, ref, watch, computed } from 'vue'
import { getSellers } from '@/api/sellers'
import { getImages } from '@/api/googleimages'
import { sortAndDeduplicateDiagnostics } from 'typescript'

interface User {
  id: string
  name: string
  image: string
  points: number
}

const users = ref<User[]>([])
const images = ref<any[]>([])
const searchText = ref<string>('')
let searchValue = ref<string>('')
const defaultImage = ref<string>(
  'https://www.lovethispic.com/uploaded_images/204120-Puppy-Says-Hello.jpg'
)
const showResults = ref<boolean>(false)
const showWinner = ref<boolean>(false)

onMounted(() => {
  getSellers().then((res) => {
    users.value = res
  })
})

const usersWithPoints = computed(() => {
  return users.value.map((user: User) => ({
    ...user,
    points: 0
  }))
})

watch([users, images], (newItems) => {
  const [users, images] = newItems
  usersWithPoints.value.forEach((user, index) => {
    // Img random para el usuario
    const random = Math.floor(Math.random() * 10)
    user.image = images[random]?.image?.thumbnailLink
  })
  console.log(users, 'users')
})

function getValue() {
  searchValue.value = searchText.value

  getImages(searchValue.value).then((res) => {
    images.value = res
    showResults.value = true
  })

  searchText.value = ''
}

function addPoints(userId: string) {
  usersWithPoints.value.forEach((user) => {
    if (user.id === userId) {
      user.points = user.points + 3
      console.log(user.points)
    }
    if (user.points >= 9) {
      showWinner.value = true
    }
  })
}

function handleImageLike(userId: string) {
  showResults.value = false
  addPoints(userId)
}
</script>

<template>
  <section v-if="!showWinner">
    <section>
      <div class="searcher-container">
        <input v-model="searchText" type="text" placeholder="Frutas, vehículos, animales" />
        <button @click="getValue">Buscar</button>
      </div>
      <p :class="{ hidden: !showResults }">Esto es lo que encontramos para "{{ searchValue }}"</p>
    </section>

    <div v-if="showResults">
      <div v-for="user in usersWithPoints" :key="user.id">
        <img :src="user.image || defaultImage" alt="random image" />
        <button @click="handleImageLike(user.id)">like</button>
        <h3>{{ user.name }}</h3>
      </div>
    </div>
    <div v-else>
      <p>Nuestros vendedores están listos para responder a tu solicitud</p>
    </div>
  </section>
  <section v-else>
    <p>terminó el juego</p>
  </section>
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
