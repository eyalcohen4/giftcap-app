import React from 'react'
import { useTranslation } from 'react-i18next'
import { inject, observer } from 'mobx-react'
import { View, TouchableOpacity, StyleSheet } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'

import Root from '../stores'
import { Stock } from '../types'
import { Text, StocksGrid } from '../components'
import { Spaces, Colors } from '../styles'
import { CATEGORIES_ROUTE_NAME } from '../constants'
import toRows from '../utils/toRows'

type CategoryExplorerProps = {
  route: any
  navigation: any
  root: Root
}

const CategoryExplorer: React.FC<CategoryExplorerProps> = ({
  route,
  navigation,
  root,
}: CategoryExplorerProps) => {
  const { stocks, ui } = root as Root
  const { t } = useTranslation()

  const { categoryId } = route.params

  const category = stocks.categories.byId[categoryId]
  const categoryStocks = stocks.getCategoryStocks(categoryId)
  const rows = toRows(categoryStocks)

  const goBack = () => {
    navigation.navigate(CATEGORIES_ROUTE_NAME)
  }

  const handleStockClick = (stock: Stock) => {
    ui.openPreviewStockModal(stock)
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.backButton}>
          <TouchableOpacity onPress={goBack}>
            <MaterialIcons name="arrow-forward" size={32} color="black" />
          </TouchableOpacity>
        </View>
        <View
          style={[styles.categoryName, { backgroundColor: category?.color }]}
        >
          <Text color={Colors.white}>{category.name.he}</Text>
        </View>
      </View>
      <StocksGrid stocks={categoryStocks} handleStockPress={handleStockClick} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: Spaces.vertical * 2,
    backgroundColor: Colors.secondary,
    justifyContent: 'center',
    flex: 1,
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: Spaces.vertical * 2,
    backgroundColor: Colors.secondary,
  },
  categoryName: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '65%',
    height: 40,
    borderRadius: 8,
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 2,
    shadowOpacity: 1,
  },
  backButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '20%',
    height: 40,
  },
})

export default inject('root')(observer(CategoryExplorer))
