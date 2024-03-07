<script setup lang="ts">
import { onMounted, ref, watch, computed } from 'vue'
import { getSellers } from '@/api/sellers'
import { getImages } from '@/api/googleimages'
import { createBill } from '@/api/bills'

import type { User, UserWithPoints, Image } from './types'
import ContestImage from './ContestImage/ContestImage.vue'
import logo from '@/assets/logo.png'

const users = ref<User[]>([])
const images = ref<Image[]>([])
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
  return users.value.map(
    (user: User) =>
      ({
        ...user,
        points: 0
      }) as UserWithPoints
  )
})

watch([users, images], (newItems) => {
  const [users, images] = newItems
  usersWithPoints.value.forEach((user) => {
    user.image = images[user.id]?.image?.thumbnailLink
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
        <ContestImage @like="handleImageLike" :user="user" :defaultImage="defaultImage" />
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

  <section v-else class="h-full flex flex-col items-center justify-center">
    <h2 class="text-lg font-semibold text-center md:text-xl">
      ¡Felicidades {{ bill.seller.name }}!
    </h2>
    <p class="mt-5 text-md text-center md:text-lg">
      Fuiste el primer vendedor en obtener 20 puntos
    </p>
    <div
      class="shadow w-4/5 flex flex-col items-center justify-evenly border border-slate-400 mt-12 h-3/4"
    >
      <div class="flex flex-col items-center">
        <figure>
          <img class="w-12 object-contain" :src="logo" />
        </figure>
        <h3 class="text-lg tracking-widest">FACTURA</h3>
      </div>

      <div class="w-9/12">
        <p class="font-semibold">Nombre del vendedor</p>
        <p>{{ bill.seller.name }}</p>
      </div>
      <div class="w-9/12">
        <p class="font-semibold">Nombre de la empresa</p>
        <p>Imágenes del mundo</p>
      </div>
      <div class="w-9/12">
        <p class="font-semibold">Fecha y hora de emisión</p>
        <p>{{ bill.datetime }}</p>
      </div>

      <table class="w-full">
        <tr class="bg-slate-400 h-10">
          <th>Descripción</th>
          <th>Importe</th>
        </tr>
        <tr class="text-center h-10">
          <td>Imágenes</td>
          <td>{{ bill.total }}</td>
        </tr>
      </table>
    </div>
    <RouterLink to="/" class="px-8 py-4 mt-10 border border-light-green">Jugar de nuevo</RouterLink>
  </section>
</template>
