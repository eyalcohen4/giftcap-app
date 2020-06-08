import React from 'react'
import { useTranslation } from 'react-i18next'
import { inject, observer } from 'mobx-react'
import { ScrollView, View, TouchableOpacity, StyleSheet } from 'react-native'
import { generate } from 'shortid'

import { Text, StockBrand } from '../components'
import Root from '../stores'
import { Grid, Row, Col } from 'react-native-easy-grid'
import { Spaces, Colors } from '../styles'

type CategoryExplorerProps = {
  route: any
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
  root,
}: CategoryExplorerProps) => {
  const { categoryId } = route.params
  const { stocks } = root as Root
  const { t } = useTranslation()
  const category = stocks.categories.byId[categoryId]
  const categoryStocks = stocks.getCategoryStocks(categoryId)
  const rows = toRows(categoryStocks)

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.backButton}>
          <TouchableOpacity>
            <Text style={{ color: Colors.black }}>{t('back')}</Text>
          </TouchableOpacity>
        </View>
        <View
          style={[styles.categoryName, { backgroundColor: category.color }]}
        >
          <Text style={{ color: Colors.white }}>{category.name.he}</Text>
        </View>
      </View>
      <ScrollView contentContainerStyle={{ backgroundColor: Colors.white }}>
        <Grid>
          {rows.map((row) => (
            <Row key={generate()}>
              {row.map((stock) => (
                <Col key={stock.symbol} style={styles.stock}>
                  <StockBrand stock={stock} handleClick={() => {}} />
                </Col>
              ))}
            </Row>
          ))}
        </Grid>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginVertical: Spaces.horizontal * 2
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: Spaces.vertical * 2
  },
  categoryName: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '65%',
    height: 40,
    borderRadius: 8,
    shadowColor: "rgba(0, 0, 0, 0.5)",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowRadius: 4,
    shadowOpacity: 1
  },
  backButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '20%',
    height: 40,
    borderRadius: 8,
    shadowColor: "rgba(0, 0, 0, 0.5)",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowRadius: 4,
    shadowOpacity: 1,
    backgroundColor: Colors.secondary,
  },
  stock: {
    margin: Spaces.vertical,
  },
})

export default inject('root')(observer(CategoryExplorer))
