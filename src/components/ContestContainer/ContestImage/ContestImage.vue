<script setup lang="ts">
import likeIcon from '@/assets/heart-icon.png'
import type { UserWithPoints } from '../types'

interface ContestImageProps {
  user: UserWithPoints
  defaultImage: string
}

const emit = defineEmits<{
  (e: 'like', userId: number): void
}>()

const { user, defaultImage } = defineProps<ContestImageProps>()
</script>

<template>
  <div class="w-full">
    <img
      class="w-full shadow-lg rounded h-52 object-cover"
      :src="user.image || defaultImage"
      alt="random image"
    />
    <button
      class="shadow ease-in duration-300 left-2/4 bottom-0 w-16 h-16 border-4 border-white rounded-full absolute bg-light-red -translate-x-2/4 flex justify-center items-center hover:bg-dark-red hover:scale-110"
      @click="emit('like', user.id)"
    >
      <img class="w-7" :src="likeIcon" />
    </button>
  </div>
</template>
