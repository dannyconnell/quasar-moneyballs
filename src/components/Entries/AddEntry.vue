<template>
  <q-form
    @submit="addEntryFormSubmit"
    class="add-entry-form row q-px-sm q-pb-sm q-col-gutter-sm bg-primary"
  >
    <div class="col">
      <q-input
        v-model="addEntryForm.name"
        ref="nameRef"
        placeholder="Name"
        :bg-color="useLightOrDark('white', 'black')"
        v-select-all
        outlined
        dense
      />
    </div>
    <div class="col">
      <q-input
        v-model.number="addEntryForm.amount"
        :rules="[val => (typeof val === 'number' || val === null) || 'Enter a valid number']"
        input-class="text-right"
        placeholder="Amount"
        :bg-color="useLightOrDark('white', 'black')"
        type="number"
        step="0.01"
        v-select-all
        outlined
        dense
      />
    </div>
    <div class="col col-auto">
      <q-btn
        color="primary"
        icon="add"
        type="submit"
        round
      />
    </div>
  </q-form>
</template>

<script setup>

  /*
    imports
  */
  
    import { ref, reactive } from 'vue'
    import { useQuasar } from 'quasar'
    import { useStoreEntries } from 'src/stores/storeEntries'
    import { useLightOrDark } from 'src/use/useLightOrDark'
    import vSelectAll from 'src/directives/directiveSelectAll'


  /*
    quasar
  */
  
    const $q = useQuasar()


  /*
    stores
  */
  
    const storeEntries = useStoreEntries()


  /*
    add entry
  */

    const nameRef = ref(null)

    const addEntryFormDefault = {
      name: '',
      amount: null
    }

    const addEntryForm = reactive({
      ...addEntryFormDefault
    })

    const addEntryFormReset = () => {
      Object.assign(addEntryForm, addEntryFormDefault)
      if (!$q.platform.is.capacitor) nameRef.value.focus()
    }
  
  const addEntryFormSubmit = () => {
    storeEntries.addEntry(addEntryForm)
    addEntryFormReset()
  }

</script>