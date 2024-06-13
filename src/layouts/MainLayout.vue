<template>
  <q-layout view="hHh lpR lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          <div class="absolute-center">
            <q-icon name="savings" /> 
            Moneyballs
          </div>
        </q-toolbar-title>

        <q-btn 
          v-if="$route.fullPath === '/'"
          @click="storeEntries.options.sort = !storeEntries.options.sort"
          :label="!storeEntries.options.sort ? 'Sort' : 'Done'"
          flat
          no-caps
          dense
        />

      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      class="bg-primary"
      :width="250"
      :breakpoint="767"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label
          class="text-white"
          header
        >
          Navigation
        </q-item-label>

        <NavLink
          v-for="link in navLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import { useStoreEntries } from 'src/stores/storeEntries'
import NavLink from 'components/Nav/NavLink.vue'

defineOptions({
  name: 'MainLayout'
})

const storeEntries = useStoreEntries()

const navLinks = [
  {
    title: 'Entries',
    icon: 'savings',
    link: '/'
  },
  {
    title: 'Settings',
    icon: 'settings',
    link: '/settings'
  }
]

const leftDrawerOpen = ref(false)

function toggleLeftDrawer () {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>
