import React from 'react'
import { View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import { Home, Categories, CategoryExplorer } from './'
import { CATEGORIES_ROUTE_NAME, CATEGORY_ROUTE_NAME } from '../constants'

const Stack = createStackNavigator()

type RoutesProps = {}
const Routes: React.FC<RoutesProps> = ({}: RoutesProps) => {
  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName="Home" headerMode="none">
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name={CATEGORIES_ROUTE_NAME} component={Categories} />
          <Stack.Screen name={CATEGORY_ROUTE_NAME} component={CategoryExplorer} />
        </Stack.Navigator>
      </NavigationContainer>
  )
}

export default Routes
