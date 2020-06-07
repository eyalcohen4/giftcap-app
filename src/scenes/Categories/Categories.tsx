import React from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import { Grid, Row, Col } from 'react-native-easy-grid'
import { inject, observer } from 'mobx-react'

import Root from '../../stores'
import { CategoryLink } from '../../components'

type CategoriesProps = {
  root?: Root
}

function toRows(from = [], index = 0) {
  const result = []
  for (let l = from.length + 1; index + 2 < l; index += 2) {
    result.push(from.slice(index, index + 2))
  }

  return result
}

const Categories: React.FC<CategoriesProps> = ({ root }: CategoriesProps) => {
  const { stocks } = root as Root
  const rows = toRows(stocks.stocksByCategory)
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Grid style={{ justifyContent: 'center', alignItems: 'center' }}>
        {rows.map((row) => (
          <Row>
            {row.map(({ category }) => (
              <Col>
                <CategoryLink key={category._id} category={category} />
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
