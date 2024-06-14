<template>
  <q-page>
    <div class="q-pa-md">

      <NothingHere
        v-if="!storeEntries.entries.length"
      />

      <q-list
        v-else
        bordered
        separator
      >

        <Sortable
          @end="storeEntries.sortEnd"
          :list="storeEntries.entries"
          :options="{ handle: '.handle' }"
          item-key="id"
          tag="div"
        >
          <template #item="{element, index}">
            <Entry 
              :key="element.id"
              :entry="element"
            />
          </template>
        </Sortable>

      </q-list>
    </div>

    <q-footer
      class="bg-transparent"
    >
      <Balance />
      <AddEntry />
    </q-footer>
  </q-page>
</template>

<script setup>

  /*
    imports
  */
  
    import { useStoreEntries } from 'src/stores/storeEntries'
    import Balance from 'src/components/Entries/Balance.vue'
    import AddEntry from 'src/components/Entries/AddEntry.vue'
    import Entry from 'src/components/Entries/Entry.vue'
    import NothingHere from 'src/components/Entries/NothingHere.vue'
    import { Sortable } from 'sortablejs-vue3'


  /*
    stores
  */
  
    const storeEntries = useStoreEntries()

</script>
