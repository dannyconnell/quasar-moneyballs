<template>
  <q-page>
    <div class="q-pa-md">
      <q-list bordered padding>

        <q-item-label header>Entries</q-item-label>

        <q-item tag="label" v-ripple>
          <q-item-section>
            <q-item-label>Prompt to Delete</q-item-label>
          </q-item-section>
          <q-item-section side >
            <q-toggle
              v-model="storeSettings.settings.promptToDelete"
            />
          </q-item-section>
        </q-item>

        <q-item tag="label" v-ripple>
          <q-item-section>
            <q-item-label>Show Running Balance</q-item-label>
          </q-item-section>
          <q-item-section side >
            <q-toggle
              v-model="storeSettings.settings.showRunningBalance"
            />
          </q-item-section>
        </q-item>
        
        <q-item tag="label" v-ripple>
          <q-item-section>
            <q-input
              v-model="storeSettings.settings.currencySymbol"
              label="Currency Symbol"
              v-select-all
              outlined
            />
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
  
    import { useStoreSettings } from 'src/stores/storeSettings'
    import vSelectAll from 'src/directives/directiveSelectAll'


  /*
    stores
  */
  
    const storeSettings = useStoreSettings()

</script>
