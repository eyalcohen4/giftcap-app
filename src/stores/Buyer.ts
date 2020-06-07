import { observable } from 'mobx'

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

  @observable currentStep = 0

  next() {
    this.currentStep++
  }

  previous() {
    this.currentStep--
  }
}

export default BuyStore
