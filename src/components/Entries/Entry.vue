<template>
  <q-slide-item
    @right="onEntrySlideRight"
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
        <q-popup-edit
          :model-value="entry.name"
          v-slot="scope"
          :cover="false"
          :offset="[16,12]"
          anchor="top left"
          label-set="Ok"
          auto-save
          buttons
        >
          <q-input
            v-model="scope.value"
            @keyup.enter="scope.set"
            input-class="text-weight-bold letter-spacing-none"
            autofocus
            dense
          />
        </q-popup-edit>
      </q-item-section>

      <q-item-section
        class="text-weight-bold"
        :class="useAmountColorClass(entry.amount)"
        side
      >
        {{ useCurrencify(entry.amount) }}
        <q-popup-edit
          :model-value="entry.amount"
          v-slot="scope"
          :cover="false"
          :offset="[16,12]"
          anchor="top left"
          label-set="Ok"
          auto-save
          buttons
        >
          <q-input
            v-model.number="scope.value"
            @keyup.enter="scope.set"
            input-class="text-weight-bold letter-spacing-none text-right"
            type="number"
            step="0.01"
            autofocus
            dense
          />
        </q-popup-edit>
      </q-item-section>
    </q-item>

  </q-slide-item>
</template>

<script setup>

  /*
    imports
  */
  
    import { useQuasar } from 'quasar'
    import { useStoreEntries } from 'src/stores/storeEntries'
    import { useCurrencify } from 'src/use/useCurrencify'
    import { useAmountColorClass } from 'src/use/useAmountColorClass'


  /*
    stores
  */
  
    const storeEntries = useStoreEntries()


  /*
    props
  */
  
    const props = defineProps({
      entry: {
        type: Object,
        required: true
      }
    })  


  /*
    quasar
  */
  
    const $q = useQuasar()  

  /*
    slide items
  */
  
    const onEntrySlideRight = ({ reset }) => {
      $q.dialog({
        title: 'Delete Entry',
        message: `
          Delete this entry?
          <div class="q-mt-md text-weight-bold ${ useAmountColorClass(props.entry.amount) }">
            ${ props.entry.name } : ${ useCurrencify(props.entry.amount) }
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
        storeEntries.deleteEntry(props.entry.id)
      }).onCancel(() => {
        reset()
      })
    }

</script>