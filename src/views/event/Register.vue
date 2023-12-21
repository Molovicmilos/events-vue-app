<script setup>
import { inject } from 'vue'
import { useRouter } from 'vue-router'

const { event } = defineProps(['event'])
const router = useRouter()
const GStore = inject('GStore')

const register = () => {
  //if registration API call is successful
  //push back to the event details
  GStore.flashMessage = 'You are successfully registered for' + event.title
  setTimeout(() => {
    GStore.flashMessage = ''
  }, 3000)
  router.push({
    name: 'event-details'
    //id: props.event.id
  })
}
</script>

<template>
  <p>Register for the event here</p>
  <button @click="register">Register me</button>
</template>
