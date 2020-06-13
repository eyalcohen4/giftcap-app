import { observable } from 'mobx'

import BuyerStore from './Buyer'
import StocksStore from './Stocks'
import UiStore from './Ui'
import ClaimStore from './Claim'
import UserStore from './User'

class RootStore {
  buyer: BuyerStore
  stocks: StocksStore
  ui: UiStore
  claim: ClaimStore
  user: UserStore

  @observable isInitFinished = false

  constructor() {
    this.buyer = new BuyerStore(this)
    this.stocks = new StocksStore()
    this.ui = new UiStore()
    this.claim = new ClaimStore()
    this.user = new UserStore()
    
    this.init()
  }

  async init() {
    await this.stocks.fetchStocks()
    await this.user.load()

    this.isInitFinished = true 
  }
}

export default RootStore
