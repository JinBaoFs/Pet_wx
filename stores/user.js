import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    name: '张三',
    age: 20
  }),
  getters: {
    info: (state) => `${state.name} - ${state.age}岁`
  },
  actions: {
    setName(newName) {
      this.name = newName
    },
    incrementAge() {
      this.age++
    }
  }
})