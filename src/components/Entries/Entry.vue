<template>
  <q-slide-item
    @left="onEntrySlideLeft"
    @right="onEntrySlideRight"
    left-color="positive"
    right-color="negative"
    :class="{ 'bg-grey-2' : entry.paid }"
  >
    <template v-slot:left>
      <q-icon name="done" />
    </template>
    <template v-slot:right>
      <q-icon name="delete" />
    </template>

    <q-item>
      <q-item-section
        class="text-weight-bold"
        :class="[
          useAmountColorClass(entry.amount),
          { 'text-strike' : entry.paid }
        ]"
      >
        {{ entry.name }}
        <q-popup-edit
          @save="onNameUpdate"
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
            v-select-all
            autofocus
            dense
          />
        </q-popup-edit>
      </q-item-section>

      <q-item-section
        class="text-weight-bold"
        :class="[
          useAmountColorClass(entry.amount)
        ]"
        side
      >
        <span
          :class="{ 'text-strike' : entry.paid }"
        >
          {{ useCurrencify(entry.amount) }}
        </span>
        <q-popup-edit
          @save="onAmountUpdate"
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
            v-select-all
            autofocus
            dense
          />
        </q-popup-edit>
        <q-chip
          v-if="storeSettings.settings.showRunningBalance"
          :class="useAmountColorClass(storeEntries.runningBalances[index])"
          class="running-balance absolute-bottom-right"
          size="9px"
          outline
          dense
        >
          {{ useCurrencify(storeEntries.runningBalances[index]) }}
        </q-chip>
      </q-item-section>

      <q-item-section
        v-if="storeEntries.options.sort"
        side
      >
        <q-icon 
          class="handle"
          name="reorder"
          color="primary"
        />
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
    import { useStoreSettings } from 'src/stores/storeSettings'
    import { useCurrencify } from 'src/use/useCurrencify'
    import { useAmountColorClass } from 'src/use/useAmountColorClass'
    import vSelectAll from 'src/directives/directiveSelectAll'


  /*
    stores
  */
  
    const storeEntries = useStoreEntries(),
          storeSettings = useStoreSettings()


  /*
    props
  */
  
    const props = defineProps({
      entry: {
        type: Object,
        required: true
      },
      index: {
        type: Number,
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
  
    const onEntrySlideLeft = ({ reset }) => {
      storeEntries.updateEntry(props.entry.id, { paid: !props.entry.paid })
      reset()
    }

    const onEntrySlideRight = ({ reset }) => {
      if (storeSettings.settings.promptToDelete) promptToDelete(reset)
      else storeEntries.deleteEntry(props.entry.id)
    }

    const promptToDelete = reset => {
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


  /*
    name & amount update
  */
  
    const onNameUpdate = value => {
      storeEntries.updateEntry(props.entry.id, { name: value })
    }

    const onAmountUpdate = value => {
      storeEntries.updateEntry(props.entry.id, { amount: value })
    }

</script>