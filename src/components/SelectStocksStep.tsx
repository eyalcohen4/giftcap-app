import React from 'react'
import {
  Platform,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native'
import { useTranslation } from 'react-i18next'
import { inject, observer } from 'mobx-react'

import { Text, Button, StockBrand } from './'
import RootStore from '../stores'
import { Colors, Sizes, FontSizes, Spaces } from '../styles'
import { Stock } from '../types'
import { CATEGORIES_ROUTE_NAME } from '../constants'

type SelectStockStepProps = {
  root?: RootStore
  navigate: Function
}

const SelectStocksStep: React.FC<SelectStockStepProps> = ({
  root,
  navigate,
}: SelectStockStepProps) => {
  const { stocks, ui } = root as RootStore
  const { t } = useTranslation()

  const onStockClick = (stock: Stock) => {
    ui.openPreviewStockModal(stock)
  }

  return (
    <View>
      <Text
        style={{ color: Colors.primary, textAlign: 'left' }}
        size={FontSizes.large}
        bold
      >
        {t('selectStockStepTitle')}
      </Text>
      <View>
        <View style={styles.categoryTitle}>
          <Text style={{ color: Colors.black }}>{t('thePopular')}</Text>
          <TouchableOpacity onPress={() => navigate(CATEGORIES_ROUTE_NAME)}>
            <Text style={{ color: Colors.primary }}>{t('all')}</Text>
          </TouchableOpacity>
        </View>
        <ScrollView
          style={styles.stocks}
          contentContainerStyle={{
            alignItems: 'center',
            justifyContent: 'center',
          }}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        >
          {stocks.popular?.stocks?.map((stock) => (
            <View
              key={stock.symbol}
              style={{ paddingHorizontal: Spaces.horizontal, }}
            >
              <StockBrand stock={stock} handleClick={onStockClick} />
            </View>
          ))}
        </ScrollView>
      </View>
      <View style={styles.moreStocks}>
        <Button onPress={() => navigate(CATEGORIES_ROUTE_NAME)}>
          <Text>{t('moreStocks')}</Text>
        </Button>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  categoryTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: Spaces.vertical,
  },
  stocks: {
    height: 95,
  },
  moreStocks: {
    marginTop: Spaces.vertical * 5,
    marginRight: -8,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
})

export default inject('root')(observer(SelectStocksStep))
