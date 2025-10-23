import { defineStore } from 'pinia'

export const useCreateOrder = defineStore('order', {
  state: () => ({
	orderInfo:{
		id: null,
		type: null,
		price: '0',
		weight: null,
		weightLabel: '',
	},
	address:{
		x: null,
		y: null,
		msg: ''
	},
	time: null,
	pet:{
		name: '',
		type: null, // 1-狗狗 2-猫猫
		color: '',
		gender: '', // 1-公 2-母
	}
  }),
  actions: {
    setOrderInfo(newData){
		this.$patch({
			orderInfo: { ...this.orderInfo, ...newData }
		})
	},
  }
})