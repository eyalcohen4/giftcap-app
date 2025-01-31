export interface Stock {
  symbol: string
  exchange?: string
  country: string
  currency: string
  logo?: string
  categories?: []
  name: string
  nameHe: string
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

export interface Data<T> {
  byId: { [key: string]: T }
  allIds: string[]
}

export interface GiftItem {
  id: string
  symbol: string
  value: number
  stock?: Stock
}

export interface Gift {
  _id: string
  items: GiftItem[]
  message: string
  giverName: string
  giverEmail: string
  receiverName: string
  receiverPhone: string
  isOpen: boolean
  createdAt?: string
}

export enum HeaderIcons {
  gift = "gift",
  search = "search"
}