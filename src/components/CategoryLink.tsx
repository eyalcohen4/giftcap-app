import React from 'react'
import { View, StyleSheet } from 'react-native'

import { Text } from './'
import { Category } from '../types'
import { Spaces } from '../styles'

type CategoryLinkProps = {
  category: Category
}

const CategoryLink: React.FC<CategoryLinkProps> = ({
  category,
}: CategoryLinkProps) => {
  return (
    <View style={[styles.container, { backgroundColor: category.color }]}>
      <Text>{category.name.he}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    height: 150,
    width: 150,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 4,
    shadowOpacity: 1,
    elevation: 1,
    margin: Spaces.horizontal
  },
})

export default CategoryLink
