import React from 'react'
import { View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import { Home, Categories } from './'
import { CATEGORIES_ROUTE_NAME } from '../constants'

const Stack = createStackNavigator()

type RoutesProps = {}
const Routes: React.FC<RoutesProps> = ({}: RoutesProps) => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name={CATEGORIES_ROUTE_NAME} component={Categories} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Routes
