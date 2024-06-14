<template>
  <q-form
    @submit="addEntryFormSubmit"
    class="row q-px-sm q-pb-sm q-col-gutter-sm bg-primary"
  >
    <div class="col">
      <q-input
        v-model="addEntryForm.name"
        ref="nameRef"
        placeholder="Name"
        bg-color="white"
        v-select-all
        outlined
        dense
      />
    </div>
    <div class="col">
      <q-input
        v-model.number="addEntryForm.amount"
        input-class="text-right"
        placeholder="Amount"
        bg-color="white"
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
    import { useStoreEntries } from 'src/stores/storeEntries'
    import vSelectAll from 'src/directives/directiveSelectAll'


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
      nameRef.value.focus()
    }

    const addEntryFormSubmit = () => {
      storeEntries.addEntry(addEntryForm)
      addEntryFormReset()
    }

</script>