import { defineStore } from 'pinia'
import { reactive } from 'vue'

export const useStoreSettings = defineStore('settings', () => {

  /*
    state
  */
  
    const settings = reactive({
      promptToDelete: true
    })


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