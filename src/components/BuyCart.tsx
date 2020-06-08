import React from 'react'
import { View, StyleSheet } from 'react-native'
import { inject, observer } from 'mobx-react'
import Root from '../stores'

import { StockBrand, Text } from './'
import { Colors } from '../styles'

type BuyCartProps = {
  root?: Root
}

const BuyCart: React.FC<BuyCartProps> = ({ root }: BuyCartProps) => {
  const { buyer, stocks } = root as Root

  return (
    <View style={styles.container}>
      {buyer.gift.items?.map(({ symbol, value }) => (
        <View key={symbol}>
          <StockBrand
            stock={stocks.getStockBySymbol(symbol)}
            size="small"
            handleClick={() => {}}
          />
          <Text style={styles.price}>{value}</Text>
        </View>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
  
  },
  price: {
    color: Colors.primary,
  },
})

export default inject('root')(observer(BuyCart))
