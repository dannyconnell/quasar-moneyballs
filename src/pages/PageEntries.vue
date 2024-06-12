<template>
  <q-page>
    <div class="q-pa-md">
      <q-list
        bordered
        separator
      >

        <q-slide-item
          v-for="entry in storeEntries.entries"
          :key="entry.id"
          @right="onEntrySlideRight($event, entry)"
          left-color="positive"
          right-color="negative"
        >
          <!-- <template v-slot:left>
            <q-icon name="done" />
          </template> -->
          <template v-slot:right>
            <q-icon name="delete" />
          </template>

          <q-item>
            <q-item-section
              class="text-weight-bold"
              :class="useAmountColorClass(entry.amount)"
            >
              {{ entry.name }}
            </q-item-section>

            <q-item-section
              class="text-weight-bold"
              :class="useAmountColorClass(entry.amount)"
              side
            >
              {{ useCurrencify(entry.amount) }}
            </q-item-section>
          </q-item>

        </q-slide-item>

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
  
    import { useQuasar } from 'quasar'
    import { useStoreEntries } from 'src/stores/storeEntries'
    import { useCurrencify } from 'src/use/useCurrencify'
    import { useAmountColorClass } from 'src/use/useAmountColorClass'
    import Balance from 'src/components/Entries/Balance.vue'
    import AddEntry from 'src/components/Entries/AddEntry.vue'


  /*
    stores
  */
  
    const storeEntries = useStoreEntries()


  /*
    quasar
  */
  
    const $q = useQuasar()  
  

  /*
    slide items
  */
  
    const onEntrySlideRight = ({ reset }, entry) => {
      $q.dialog({
        title: 'Delete Entry',
        message: `
          Delete this entry?
          <div class="q-mt-md text-weight-bold ${ useAmountColorClass(entry.amount) }">
            ${ entry.name } : ${ useCurrencify(entry.amount) }
          </div>
        `,
        cancel: true,
        persistent: true,
        html: true,
        ok: {
          label: 'Delete',
          color: 'negative',
          noCaps: true
        },
        cancel: {
          color: 'primary',
          noCaps: true
        }
      }).onOk(() => {
        storeEntries.deleteEntry(entry.id)
      }).onCancel(() => {
        reset()
      })
    }

</script>
