import React from 'react'
import { ScrollView, View, StyleSheet } from 'react-native'
import { inject, observer } from 'mobx-react'
import Root from '../stores'

import { Button, StockBrand, Text } from './'
import { Colors, FontSizes, Spaces } from '../styles'
import { useTranslation } from 'react-i18next'

type BuyCartProps = {
  root?: Root
}

const BuyCart: React.FC<BuyCartProps> = ({ root }: BuyCartProps) => {
  const { t } = useTranslation()
  const { buyer, stocks, ui } = root as Root

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.items}
        horizontal={true}
        contentContainerStyle={{ backgroundColor: 'transparent' }}
      >
        {buyer.gift.items?.map(({ symbol, value }) => (
          <View key={symbol} style={styles.item}>
            <StockBrand
              stock={stocks.getStockBySymbol(symbol)}
              size="small"
              handleClick={() => {}}
            />
            <Text size={FontSizes.smaller} style={styles.price}>
              {value}
              {t('currency')}
            </Text>
          </View>
        ))}
      </ScrollView>
      <View style={styles.next}>
        <Button onPress={buyer.next}>{t('next')}</Button>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    padding: Spaces.vertical * 2,
    alignItems: 'flex-start',
  },
  items: {
    flexDirection: 'row',
    backgroundColor: 'transparent' 
  },
  item: {
    padding: Spaces.vertical,
    alignItems: 'center',
    justifyContent: 'center',
  },
  price: {
    color: Colors.primary,
  },
  next: {
    marginTop: Spaces.vertical * 2,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
})

export default inject('root')(observer(BuyCart))
