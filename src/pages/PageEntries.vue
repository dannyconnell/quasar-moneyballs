<template>
  <q-page>
    <div class="q-pa-md">
      <q-list
        bordered
        separator
      >
        <q-item
          v-for="entry in entries"
          :key="entry.id"
        >
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
      </q-list>
    </div>

    <q-footer
      class="bg-transparent"
    >
      <div class="row q-mb-sm q-px-md q-py-sm shadow-up-3">
        <div class="col text-grey-7 text-h6">
          Balance:
        </div>
        <div class="col text-grey-7 text-h6 text-right">
          + $3,999.00
        </div>
      </div>
      <div class="row q-px-sm q-pb-sm q-col-gutter-sm bg-primary">
        <div class="col">
          <q-input
            placeholder="Name"
            bg-color="white"
            outlined
            dense
          />
        </div>
        <div class="col">
          <q-input
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
            round
          />
        </div>
      </div>
    </q-footer>
  </q-page>
</template>

<script setup>

  /*
    imports
  */
  
    import { ref } from 'vue'
    import { useCurrencify } from 'src/use/useCurrencify'
    import { useAmountColorClass } from 'src/use/useAmountColorClass'


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

</script>
