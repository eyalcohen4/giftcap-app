import React from 'react'
import { observer } from 'mobx-react'
import { ScrollView, View, StyleSheet } from 'react-native'
import { Row } from 'react-native-easy-grid'
import { generate } from 'shortid'

import { StockBrand } from './'
import toRows from '../utils/toRows'
import { Stock } from '../types'
import { Spaces } from '../styles'

type StocksGridProps = {
  stocks: Stock[]
  handleStockPress: Function
}

const StocksGrid: React.FC<StocksGridProps> = ({
  stocks,
  handleStockPress,
}: StocksGridProps) => {
  const rows = toRows(stocks)

  return (
    <ScrollView
      contentContainerStyle={{
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {rows.map((row) => (
        <Row
          key={generate()}
          style={{ width: '100%', flex: 1, justifyContent: 'center' }}
        >
          {row.map((stock) => (
            <View key={stock.symbol} style={styles.stock}>
              <StockBrand
                stock={stock}
                handleClick={() => handleStockPress(stock)}
              />
            </View>
          ))}
        </Row>
      ))}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  stock: {
    marginVertical: Spaces.vertical * 1,
    marginHorizontal: Spaces.vertical * 3,
  },
})

export default observer(StocksGrid)
