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
      this.isCollapse = !this.isCollapse
    }
  }
})
