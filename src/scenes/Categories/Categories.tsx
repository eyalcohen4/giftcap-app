import React, { useState } from 'react'
import { View, ScrollView, StyleSheet, Dimensions } from 'react-native'
import { inject, observer } from 'mobx-react'
import { generate } from 'shortid'
import { MaterialIcons } from '@expo/vector-icons'

import Root from '../../stores'
import {
  CategoryLink,
  Input,
  StockBrand,
  Text,
  StocksGrid,
} from '../../components'
import { CATEGORY_ROUTE_NAME, HOME_ROUTE_NAME } from '../../constants'
import { Colors, Spaces, Sizes } from '../../styles'
import { useTranslation } from 'react-i18next'
import { TouchableOpacity } from 'react-native-gesture-handler'

type CategoriesProps = {
  root?: Root
  navigation: any
}

function toRows(from = [], index = 0) {
  const result = []

  for (let l = from.length + 1; index + 2 < l; index += 2) {
    result.push(from.slice(index, index + 2))
  }

  return result
}

const Categories: React.FC<CategoriesProps> = ({
  root,
  navigation,
}: CategoriesProps) => {
  const { stocks, ui } = root as Root

  const [search, setSearch] = useState('')
  const [searchedStocks, setSearchedStocks] = useState([])
  const { t } = useTranslation()

  const rows = toRows(Object.values(stocks.categories.byId))

  const goBack = () => {
    navigation.navigate(HOME_ROUTE_NAME)
  }

  const goToCategory = (categoryId: string) => {
    navigation.navigate(CATEGORY_ROUTE_NAME, {
      categoryId: categoryId,
    })
  }

  const handleSearch = (value) => {
    setSearch(value)

    const filtered = stocks.searchStocks(value)
    setSearchedStocks(filtered)
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.header}>
        <TouchableOpacity style={styles.back} onPress={goBack}>
          <MaterialIcons name="arrow-forward" size={32} color="black" />
        </TouchableOpacity>
        <View>
          <Input
            style={styles.searchInput}
            placeholder={t('search')}
            value={search}
            onChangeText={handleSearch}
          />
        </View>
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
        }}
      >
        {search?.length ? (
          <StocksGrid stocks={searchedStocks} handleStockPress={ui.openPreviewStockModal} />
        ) : (
          rows.map((row) => (
            <View key={generate()} style={{ flexDirection: 'row' }}>
              {row.map((category) => (
                <View key={category._id} style={styles.category}>
                  <CategoryLink
                    key={category._id}
                    category={category}
                    onPress={() => goToCategory(category._id)}
                  />
                </View>
              ))}
            </View>
          ))
        )}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: Colors.secondary,
  },
  contentContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: Colors.secondary,
  },
  searchInput: {
    flex: 1,
    width: Sizes.windowWidth * 0.70
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: Spaces.vertical * 2,
    backgroundColor: Colors.secondary,
    flex: 1,
    width: '100%',
  },
  back: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: Spaces.horizontal * 2
  },
  category: {
    marginHorizontal: Spaces.horizontal * 2,
  },
})

export default inject('root')(observer(Categories))
