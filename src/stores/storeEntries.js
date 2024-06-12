import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { uid, Notify } from 'quasar'

export const useStoreEntries = defineStore('entries', () => {

  /*
    state
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
        name: 'Phone bill',
        amount: -14.99
      },
      {
        id: 'id4',
        name: 'Unknown',
        amount: 0
      },
    ])


  /*
    getters
  */
  
    const balance = computed(() => {
      return entries.value.reduce((accumulator, { amount }) => {
        return accumulator + amount
      }, 0)
    })


  /*
    actions
  */
  
    const addEntry = addEntryForm => {
      const newEntry = Object.assign({}, addEntryForm, { id: uid() })
      entries.value.push(newEntry)
    }

    const deleteEntry = entryId => {
      const index = entries.value.findIndex(entry => entry.id === entryId)
      entries.value.splice(index, 1)
      Notify.create({
        message: 'Entry deleted',
        position: 'top'
      })
    }


  /*
    return
  */
  
    return { 

      // state
      entries,

      // getters
      balance,

      // actions
      addEntry,
      deleteEntry

    }
    
})