<template>
  <q-page>
    <div class="q-pa-md">
      <q-list
        bordered
        separator
      >

      <q-slide-item
        v-for="entry in entries"
        :key="entry.id"
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
      <div class="row q-mb-sm q-px-md q-py-sm shadow-up-3">
        <div class="col text-grey-7 text-h6">
          Balance:
        </div>
        <div
          :class="useAmountColorClass(balance)"
          class="col text-h6 text-right"
        >
          {{ useCurrencify(balance) }}
        </div>
      </div>
      <q-form
        @submit="addEntry"
        class="row q-px-sm q-pb-sm q-col-gutter-sm bg-primary"
      >
        <div class="col">
          <q-input
            v-model="addEntryForm.name"
            ref="nameRef"
            placeholder="Name"
            bg-color="white"
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
    </q-footer>
  </q-page>
</template>

<script setup>

  /*
    imports
  */
  
    import { ref, computed, reactive } from 'vue'
    import { uid, useQuasar } from 'quasar'
    import { useCurrencify } from 'src/use/useCurrencify'
    import { useAmountColorClass } from 'src/use/useAmountColorClass'


  /*
    quasar
  */
  
    const $q = useQuasar()  


  /*
    entries
  */
  
    const entries = ref([
      {
        id: 'id1',
        name: 'Salary',
        amount: 4999.99
      },
      {
        id: 'id2',
        name: 'Rent',
        amount: -999
      },
      {
        id: 'id3',
        name: 'Phone',
        amount: -14.99
      },
      {
        id: 'id4',
        name: 'Unknown',
        amount: 0
      },
    ])


  /*
    balance
  */
  
    const balance = computed(() => {
      return entries.value.reduce((accumulator, { amount }) => {
        return accumulator + amount
      }, 0)
    })


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

    const addEntry = () => {
      const newEntry = Object.assign({}, addEntryForm, { id: uid() })
      entries.value.push(newEntry)
      addEntryFormReset()
    }
  

  /*
    slide items
  */
  
    const onEntrySlideRight = ({ reset }) => {
      $q.dialog({
        title: 'Delete Entry',
        message: 'Delete this entry?',
        cancel: true,
        persistent: true,
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
        console.log('>>>> OK')
      }).onCancel(() => {
        reset()
      })
    }
    

</script>
