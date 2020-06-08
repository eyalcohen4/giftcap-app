import { observable } from 'mobx'
import { Gift, GiftItem } from '../types'

class BuyStore {
  @observable steps = [
    {
      name: 'selectStock',
      isFinished: false,
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
  }

  @observable currentStep = 0

  next = () => {
    this.currentStep++
  }

  previous = () => {
    this.currentStep--
  }

  addGiftItem = (item: GiftItem) => {
    console.log(item, this.gift)
    this.gift.items.push(item)
  }
}

export default BuyStore
