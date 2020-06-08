import React from 'react'
import { useTranslation } from 'react-i18next'
import { inject, observer } from 'mobx-react'
import { ScrollView, View, TouchableOpacity, StyleSheet } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons';
import { Grid, Row, Col } from 'react-native-easy-grid'
import { generate } from 'shortid'

import Root from '../stores'
import { Stock } from '../types'
import { Text, StockBrand } from '../components'
import { Spaces, Colors } from '../styles'
import { CATEGORIES_ROUTE_NAME } from '../constants'

type CategoryExplorerProps = {
  route: any
  navigation: any
  root: Root
}

function toRows(from = [], index = 0) {
  const result = []

  for (let l = from.length + 1; index + 3 < l; index += 3) {
    result.push(from.slice(index, index + 3))
  }

  return result
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
          style={[styles.categoryName, { backgroundColor: category.color }]}
        >
          <Text style={{ color: Colors.white }}>{category.name.he}</Text>
        </View>
      </View>
      <ScrollView
        contentContainerStyle={{
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {rows.map((row) => (
          <Row key={generate()} style={{ width: '100%', flex: 1, justifyContent: 'center' }}>
            {row.map((stock) => (
              <View key={stock.symbol} style={styles.stock}>
                <StockBrand
                  stock={stock}
                  handleClick={() => handleStockClick(stock)}
                />
              </View>
            ))}
          </Row>
        ))}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginVertical: Spaces.horizontal * 2,
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
  stock: {
    marginVertical: Spaces.vertical * 1,
    marginHorizontal: Spaces.vertical * 3,
  },
})

export default inject('root')(observer(CategoryExplorer))
