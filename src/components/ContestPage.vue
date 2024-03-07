<script setup lang="ts">
import { onMounted, ref, watch, computed } from 'vue'
import { getSellers } from '@/api/sellers'
import { getImages } from '@/api/googleimages'
import { createBill } from '@/api/bills'

import searchIcon from '@/assets/search-icon.png'
import likeIcon from '@/assets/heart-icon.png'

interface User {
  id: number
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
const bill = ref<any>({})

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
  usersWithPoints.value.forEach((user) => {
    user.image = images[user.id]?.image?.thumbnailLink
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

function addPoints(userId: number) {
  usersWithPoints.value.forEach((user) => {
    if (user.id === userId) {
      user.points = user.points + 3
      console.log(user.points)
    }
    if (user.points >= 3) {
      createBill(user.id).then((res) => {
        bill.value = res
        console.log(bill.value)
        showWinner.value = true
      })
    }
  })
}

function handleImageLike(userId: number) {
  showResults.value = false
  addPoints(userId)
}
</script>

<template>
  <section class="h-full" v-if="!showWinner">
    <section>
      <div class="flex justify-center mt-20">
        <input
          class="px-5 py-2 rounded-l-md w-3/5 md:w-4/5 border-2 border-medium-gray focus:outline-none focus:border-dark-gray"
          v-model="searchText"
          type="text"
          placeholder="Frutas, vehículos, animales"
        />
        <button
          class="text-white border-2 border-medium-gray hover:border-dark-gray bg-medium-gray hover:bg-dark-gray px-5 py-2 rounded-r-md"
          @click="getValue"
        >
          Buscar
        </button>
      </div>
      <p class="text-center text-lg mt-10" :class="{ hidden: !showResults }">
        Esto es lo que encontramos para "{{ searchValue }}"
      </p>
    </section>

    <div class="h-4/5 flex flex-col items-center md:flex-row justify-evenly" v-if="showResults">
      <div class="w-80 h-60 relative mt-10" v-for="user in usersWithPoints" :key="user.id">
        <div class="w-full">
          <img
            class="w-full shadow-lg rounded h-52 object-cover"
            :src="user.image || defaultImage"
            alt="random image"
          />
          <button
            class="shadow ease-in duration-300 left-2/4 bottom-0 w-16 h-16 border-4 border-white rounded-full absolute bg-light-red -translate-x-2/4 flex justify-center items-center hover:bg-dark-red hover:scale-110"
            @click="handleImageLike(user.id)"
          >
            <img class="w-7" :src="likeIcon" />
          </button>
        </div>
      </div>
    </div>
    <div v-else class="h-4/5 flex flex-col justify-center items-center">
      <p class="text-center text-2xl">📷✨</p>
      <p class="text-center">
        ¡Explora un mundo de posibilidades! <br />
        Nuestros vendedores están listos para responder a tu solicitud
      </p>
    </div>

    <div v-for="user in usersWithPoints" :key="user.id">
      <div class="mb-1 text-base font-medium text-dark-green">
        {{ user.name }}
      </div>
      <div class="w-full bg-gray-200 rounded-full mb-4">
        <div
          class="bg-light-green rounded-full p-0.5 text-xs font-medium text-center leading-none text-dark-gray"
          :style="{ width: (user.points * 100) / 20 + '%' }"
        >
          {{ user.points }}
        </div>
      </div>
    </div>
  </section>

  <section v-else>
    <p>terminó el juego</p>
    <div></div>
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
