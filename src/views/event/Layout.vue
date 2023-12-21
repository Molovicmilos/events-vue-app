<script setup>
import { onMounted, ref, computed } from 'vue'
import EventService from '../../services/EventService.js'
import { useRouter } from 'vue-router'

const props = defineProps(['id'])
const router = useRouter()

const event = ref('')
const id = computed(() => props.id)

onMounted(() => {
  //fetch event by id
  EventService.getEvent(id.value)
    .then((response) => (event.value = response.data))
    .catch((error) => {
      if (error.response && error.response.status == 404) {
        router.push({
          name: '404Resource',
          params: { resource: 'event' }
        })
      } else {
        router.push({ name: 'network-error' })
      }
    })
})
</script>

<template>
  <div v-if="event">
    <h1>{{ event.title }}</h1>
    <div id="nav">
      <RouterLink :to="{ name: 'event-details' }">Details</RouterLink> |
      <RouterLink :to="{ name: 'event-register' }">Register</RouterLink> |
      <RouterLink :to="{ name: 'event-edit' }">Edit</RouterLink>
    </div>
    <RouterView :event="event" />
  </div>
</template>
