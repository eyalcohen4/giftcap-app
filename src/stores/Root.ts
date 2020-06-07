import BuyerStore from './Buyer'
import StocksStore from './Stocks'
import UiStore from './Ui'

class RootStore {
  buyer: BuyerStore
  stocks: StocksStore
  ui: UiStore

  constructor() {
    this.buyer = new BuyerStore()
    this.stocks = new StocksStore()
    this.ui = new UiStore()
    
    this.init()
  }

  async init() {
    await this.stocks.fetchStocks()
  }
}

export default RootStore
