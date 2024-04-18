import { create } from 'zustand'

export const useStore = create((set) => ({
  query: {search:'test',sort:'',page:''},
  resetQuery : (state)=> set({...state.query,...state}),
  setQuery : (search,sort,page) => set({search,sort,page})
}))

