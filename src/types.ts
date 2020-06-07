export interface Stock {
  symbol: string
  exchange?: string
  country: string
  currency: string
  logo?: string
  categories?: []
  name: string
  ticker: string
  weburl: string
}

export type CategoryName = {
  en: string
  he: string
}

export interface Category {
  _id: string
  name: CategoryName
  color?: string
}


export interface CategoryStocks {
  stocks: Stock[]
  category: Category
}
