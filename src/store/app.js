import { defineStore } from 'pinia'

export const useAppStore = defineStore({
  id: 'app',
  state: () => {
    return {
      isCollapse: false
    }
  },
  actions: {
    toggleSide() {
      console.log(2)
      this.isCollapse = !this.isCollapse
    }
  }
})
