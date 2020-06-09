import { observable } from 'mobx'
import { generate } from 'shortid'

import { Gift, GiftItem, Stock } from '../types'
import Root from '.'
import api from '../api'

class BuyStore {
  @observable steps = [
    {
      name: 'selectStock',
      isFinished: false,
      validate: () => this.gift.items.length > 0,
    },
    {
      name: 'personalDetails',
      isFinished: false,
    },
    {
      name: 'payment',
      isFinished: false,
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

  buy() {
    try {
      api.createGift(this.gift)
    } catch (error) {
      console.log(error)
    }
  }
}

export default BuyStore
