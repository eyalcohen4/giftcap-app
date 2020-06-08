import React from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import { Grid, Row, Col } from 'react-native-easy-grid'
import { inject, observer } from 'mobx-react'
import { generate } from 'shortid'

import Root from '../../stores'
import { CategoryLink } from '../../components'
import { CATEGORY_ROUTE_NAME } from '../../constants'

type CategoriesProps = {
  root?: Root,
  navigation: any
}

function toRows(from = [], index = 0) {
  const result = []
  
  for (let l = from.length + 1; index + 2 < l; index += 2) {
    result.push(from.slice(index, index + 2))
  }

  return result
}

const Categories: React.FC<CategoriesProps> = ({ root, navigation }: CategoriesProps) => {
  const { stocks, ui } = root as Root
  const rows = toRows(Object.values(stocks.categories.byId))

  const goToCategory = (categoryId: string) => {
    navigation.navigate(CATEGORY_ROUTE_NAME, {
      categoryId: categoryId
    })
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Grid style={{ justifyContent: 'center', alignItems: 'center' }}>
        {rows.map((row) => (
          <Row key={generate()}>
            {row.map((category) => (
              <Col key={category._id}>
                <CategoryLink key={category._id} category={category} onPress={() => goToCategory(category._id)} />
              </Col>
            ))}
          </Row>
        ))}
      </Grid>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
  },
  contentContainer: {
      
      
  }
})

export default inject('root')(observer(Categories))
