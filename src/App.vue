<template>
  <router-view />
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useStoreSettings } from 'src/stores/storeSettings'
import { useStoreEntries } from 'src/stores/storeEntries'

defineOptions({
  name: 'App'
});

const storeSettings = useStoreSettings(),
      storeEntries = useStoreEntries(),
      router = useRouter()

onMounted(() => {
  storeSettings.loadSettings()
  storeEntries.loadEntries()

  ipcRenderer.on('show-settings', () => {
    router.push('/settings')
  })

})

// window.addEventListener('contextmenu', e => {
//   e.preventDefault()
// })
</script>
