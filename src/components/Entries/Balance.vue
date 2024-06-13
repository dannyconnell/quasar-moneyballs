<template>
  <div class="row q-mb-sm q-px-md q-py-sm shadow-up-3">
    <div class="col text-grey-7 text-h6">
      Balance:
    </div>
    <div
      :class="useAmountColorClass(storeEntries.balance)"
      class="col text-h6 text-right"
    >
      <div class="row">
        <div class="col">
          {{ useCurrencify(storeEntries.balance) }}
        </div>
      </div>

      <div class="row">
        <div class="col text-caption text-grey-6">
          Paid: 
          <span
            class="text-weight-bold"
            :class="useAmountColorClass(-1234.56)"
          >
            {{ useCurrencify(-1234.56) }}
          </span>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>

  /*
    imports
  */
  
    import { useStoreEntries } from 'src/stores/storeEntries'
    import { useCurrencify } from 'src/use/useCurrencify'
    import { useAmountColorClass } from 'src/use/useAmountColorClass'

    
  /*
    stores
  */
  
    const storeEntries = useStoreEntries()

</script>