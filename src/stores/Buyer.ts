import { observable } from 'mobx'
import { generate } from 'shortid'

import { Gift, GiftItem, Stock } from '../types'
import Root from '.'
import api from '../api'

class BuyStore {
  @observable steps = [
    {
      name: 'selectStock',
    },
    {
      name: 'personalDetails',
    },
    {
      name: 'payment',
    },
  ]

  @observable gift: Gift = {
    items: [],
    receiverName: '',
    receiverPhone: '',
    giverEmail: '',
    giverName: '',
    message: '',
  }

  @observable currentStep = 0

  root = Root

  constructor(root: Root) {
    this.root = root
  }

  next = () => {
    if (this.currentStep + 1 > 0) {
      this.root.ui.toggleBuyCart(false)
    }

    this.currentStep++
  }

  previous = () => {
    if (this.currentStep - 1 === 0 && this.gift.items) {
      this.root.ui.toggleBuyCart(true)
    }

    this.currentStep--
  }

  addGiftItem = (item: GiftItem) => {
    item.id = generate()
    this.gift.items.push(item)
  }

  removeGiftItem = (item: GiftItem) => {
    const index = this.gift.items.findIndex(({ id }) => item.id === id)
    this.gift.items.splice(index, 1)
  }

  finish = () => {
    this.resetGift()
    this.currentStep = 0
  }

  resetGift = () => {
    this.gift = {
      items: [],
      receiverName: '',
      receiverPhone: '',
      message: '',
    }
  }

  buy = async () => {
    try {
      await api.createGift(this.gift)
    } catch (error) {
      console.log(error)
    }
  }
}

export default BuyStore
