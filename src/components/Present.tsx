import React, { useEffect, useState } from 'react'
import { View, ScrollView, StyleSheet } from 'react-native'
import { inject, observer } from 'mobx-react'
import { generate } from 'shortid'

import { StockBrand, Text } from './'
import { Gift } from '../types'
import { FontSizes, Colors, Sizes, Spaces } from '../styles'
import Root from '../stores'
import toRows from '../utils/toRows'
import { useTranslation } from 'react-i18next'

type PresentProps = {
  root?: Root
  gift: Gift
  light?: boolean
  style?: any
}

const Present: React.FC<PresentProps> = ({
  root,
  gift,
  light,
  style,
}: PresentProps) => {
  const { stocks } = root as Root
  const [items, setItems] = useState([])
  const [giftValue, setGiftValue] = useState(0)
  const { t } = useTranslation()

  useEffect(() => {
    const items = [...gift.items]
    const giftValue = items.reduce(
      (acc, { value }) => acc + parseInt(value, 10),
      0
    )
    setGiftValue(giftValue)

    const withStocks = items?.map(({ symbol, ...rest }) => ({
      symbol,
      stock: stocks.searchStocks(symbol),
      ...rest,
    }))

    setItems(withStocks)
  }, [])

  const rows = toRows(items)

  return (
    <View style={[styles.card, style]}>
      <Text
        bold
        color={Colors.primary}
        size={light ? FontSizes.large : FontSizes.larger}
        style={{ textAlign: 'center' }}
      >
        {t('GiftCap')}
      </Text>
        <ScrollView
          contentContainerStyle={styles.itemsContainer}
          horizontal
        >
          {rows.map((rowItems) => (
            <View key={generate()} style={styles.items}>
              {rowItems?.map((item) => (
                <View key={item.symbol} style={styles.item}>
                  <StockBrand
                    stock={stocks.getStockBySymbol(item.symbol)}
                    size="small"
                    handleClick={() => {}}
                  />
                  <Text size={FontSizes.smaller} style={styles.price}>
                    {item.value}
                    {t('currency')}
                  </Text>
                </View>
              ))}
            </View>
          ))}
        </ScrollView>
      <Text style={{ color: Colors.primary, alignSelf: 'center' }}>
        {t('giftSumOf')} {giftValue} {t('currency')}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  card: {
    width: 300,
    height: 300,
    alignSelf: 'center',
    height: Sizes.windowHeight * 0.4,
    padding: Spaces.vertical * 2,
    borderRadius: 8,
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: '#03a678',
  },
  itemsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  footer: {
    marginTop: Spaces.vertical * 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    position: 'relative',
    padding: Spaces.vertical,
    alignItems: 'center',
    zIndex: 1,
  },
  items: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeItem: {
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 2,
  },
  price: {
    color: Colors.primary,
  },
})

export default inject('root')(observer(Present))
