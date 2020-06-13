import React, { useState, useEffect } from 'react'
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import { useTranslation } from 'react-i18next'
import { inject, observer } from 'mobx-react'

import { Text, Input, Button, StockBrand, StocksGrid } from './'
import RootStore from '../stores'
import { Colors, Sizes, FontSizes, Spaces } from '../styles'
import { Stock } from '../types'
import { CATEGORIES_ROUTE_NAME } from '../constants'

type SelectStockStepProps = {
  root?: RootStore
  navigate: Function
}

const MoreStocks = ({ onPress }) => {
  const { t } = useTranslation()

  return (
    <View style={styles.moreStocks}>
      <Button onPress={onPress} style={styles.moreStocksButton}>
        <Text style={{ color: Colors.primary }}>{t('moreStocks')}</Text>
        <MaterialIcons name="arrow-back" size={32} color={Colors.primary} />
      </Button>
    </View>
  )
}
const ByCategory = ({ stocks, onSeeMore, onStockClick }) => {
  const { t } = useTranslation()

  return (
    <View>
      <View style={styles.categoryTitle}>
        <Text style={{ color: Colors.black }}>{t('thePopular')}</Text>
        <TouchableOpacity onPress={onSeeMore}>
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
        {stocks?.map((stock) => (
          <View
            key={stock.symbol}
            style={{ paddingHorizontal: Spaces.horizontal }}
          >
            <StockBrand stock={stock} handleClick={onStockClick} />
          </View>
        ))}
      </ScrollView>
    </View>
  )
}

const SelectStocksStep: React.FC<SelectStockStepProps> = ({
  root,
  navigate,
}: SelectStockStepProps) => {
  const { stocks, ui } = root as RootStore
  const [search, setSearch] = useState('')
  const [searchedStocks, setSearchedStocks] = useState([])
  const { t } = useTranslation()

  // useEffect(() => {
  //   if (search && search.length && search[0]) {
  //     console.log('here')
  //     ui.toggleBuyCart(false)
  //   } else {
  //     ui.toggleBuyCart(true)

  //   }
  // }, [search])

  const handleStockClick = (stock: Stock) => {
    ui.openPreviewStockModal(stock)
  }

  const handleSearch = (value) => {
    setSearch(value)

    const filtered = stocks.searchStocks(value)
    setSearchedStocks(filtered)
  }

  return (
    <View style={{ marginTop: Spaces.vertical * 2 }}>
      <Text
        style={{ color: Colors.primary, textAlign: 'left' }}
        size={FontSizes.large}
        bold
      >
        {t('selectStockStepTitle')}
      </Text>
      <View style={styles.main}>
        {search ? (
          <ScrollView style={{ height: 300 }}>
            <MoreStocks onPress={() => navigate(CATEGORIES_ROUTE_NAME)} />
            <StocksGrid
              stocks={searchedStocks}
              handleStockPress={handleStockClick}
            />
          </ScrollView>
        ) : (
          <ByCategory
            stocks={stocks.popular.stocks}
            onSeeMore={() => navigate(CATEGORIES_ROUTE_NAME)}
            onStockClick={handleStockClick}
          />
        )}
      </View>
      {search ? null : (
        <MoreStocks onPress={() => navigate(CATEGORIES_ROUTE_NAME)} />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  categoryTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: Spaces.vertical,
  },
  main: {
    marginTop: Spaces.vertical * 2,
  },
  stocks: {
    height: 95,
  },
  search: {
    width: '80%',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center'
  },
  searchInput: {
    marginBottom: Spaces.vertical * 2,
    textAlign: 'center',
  },
  moreStocks: {
    marginRight: -8,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  moreStocksButton: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default inject('root')(observer(SelectStocksStep))
