import { defineStore } from 'pinia'
import { reactive, watch } from 'vue'
import { Dark } from 'quasar'

export const useStoreSettings = defineStore('settings', () => {

  /*
    state
  */
  
    const settings = reactive({
      promptToDelete: true,
      showRunningBalance: false,
      currencySymbol: '$',
      darkMode: true // false | true | 'auto' TODO: set this false
    })

    watch(() => settings.darkMode, value => {
      Dark.set(value)
    }, { immediate: true })


  /*
    getters
  */
  


  /*
    actions
  */
  


  /*
    return
  */
  
    return { 

      // state
      settings

      // getters

      // actions

    }
    
})