import { Data, Category, Stock } from './../types'
import { observable } from 'mobx'
import { CategoryStocks } from '../types'
import api from '../api'

function normalize<T>(src: [{ _id: string }]): Data<T> {
  const byId = src.reduce((acc, current) => {
    acc[current._id] = current
    return acc
  }, {})
  const allIds = [...src.map(({ _id }) => _id)]

  return {
    byId,
    allIds,
  }
}

class Stocks {
  @observable categories: Data<Category> = {
    byId: {},
    allIds: [],
  }
  @observable stocks: Data<Stock> = {
    byId: {},
    allIds: [],
  }
  @observable popular: CategoryStocks = {}

  async fetchStocks() {
    const categories = await api.getCategories()
    const stocks = await api.getStocks()

    this.categories = normalize(categories)
    this.stocks = normalize(stocks)
    
    this.setPopulars()
  }

  setPopulars() {
    const popular = this.getCategoryByName('Popular')

    if (!popular) {
      this.popular = Object.values(this.categories)[0]
    }

    const popularStocks = this.getCategoryStocks(popular._id)
    this.popular = {
      category: popular,
      stocks: popularStocks,
    }
  }

  getCategoryByName(search: string, lang: string = 'en') {
    const all = Object.values(this.categories.byId)

    return all.find(({ name }) => {
      return name[lang] === search
    })
  }

  getCategoryStocks(categoryId: string): Stock[] {
    const all = Object.values(this.stocks.byId)

    return all.filter(({ categories }) => {
      return categories?.includes(categoryId)
    })
  }

  getStockBySymbol = (searchSymbol: string): Stock => {
    const all = Object.values(this.stocks.byId)
    return all.find(({ symbol }) => symbol === searchSymbol)
  }
}

export default Stocks
