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
          <q-item-section>
            {{ entry.name }}
          </q-item-section>

          <q-item-section side>
            {{ currencify(entry.amount) }}
          </q-item-section>
        </q-item>
      </q-list>
    </div>
  </q-page>
</template>

<script setup>

  /*
    imports
  */
  
    import { ref } from 'vue'


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
    currencify
  */
  
    function currencify(amount) {
      // format: "+ $ 4,999.99" | "- $ 999.00"

      let posNegSymbol = ''
      if (amount > 0) posNegSymbol = '+'
      else if (amount < 0) posNegSymbol = '-'

      const currencySymbol = '$',
            amountPositive = Math.abs(amount),
            amountFormatted = amountPositive.toLocaleString('en-US', {
              minimumFractionDigits: 2,
              maximumFractionDigis: 2
            })

      return `${ posNegSymbol } ${ currencySymbol } ${ amountFormatted }`
    }

</script>
