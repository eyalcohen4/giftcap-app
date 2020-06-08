import { apth } from 'fs'
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

export interface Data<T> {
  byId: { [key: string]: T }
  allIds: string[]
}

export interface GiftItem {
  symbol: string;
  value: number;
}

export interface Gift {
  items: GiftItem[],
	message: string
	giverName: string
	giverEmail: string
	receiverName: string
	receiverPhone: string,
	isOpen: boolean
}