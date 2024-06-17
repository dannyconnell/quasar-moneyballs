<template>
  <router-view />
</template>

<script setup>
import { onMounted } from 'vue'
import { useStoreSettings } from 'src/stores/storeSettings'

defineOptions({
  name: 'App'
});

const storeSettings = useStoreSettings()

onMounted(() => {
  storeSettings.loadSettings()
})

// window.addEventListener('contextmenu', e => {
//   e.preventDefault()
// })
</script>
