import React from 'react'
import { TouchableOpacity, StyleSheet } from 'react-native'

import { Text } from './'
import { Category } from '../types'
import { Spaces, Sizes } from '../styles'

type CategoryLinkProps = {
  category: Category,
  onPress?: Function
}

const CategoryLink: React.FC<CategoryLinkProps> = ({
  category,
  onPress
}: CategoryLinkProps) => {
  return (
    <TouchableOpacity style={[styles.container, { backgroundColor: category.color }]} onPress={() => onPress()}>
      <Text>{category.name.he}</Text>
    </TouchableOpacity>
  )
}

CategoryLink.defaultProps = {
  onPress: () => {}
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    height: 150,
    width: Sizes.windowWidth * 0.4,
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
