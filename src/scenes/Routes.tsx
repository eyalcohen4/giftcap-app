import React from 'react'
import { View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import {
  createStackNavigator,
  TransitionPresets,
  CardStyleInterpolators,
} from '@react-navigation/stack'

import { Home, Categories, CategoryExplorer } from './'
import { CATEGORIES_ROUTE_NAME, CATEGORY_ROUTE_NAME, HOME_ROUTE_NAME } from '../constants'

const Stack = createStackNavigator()

type RoutesProps = {}
const Routes: React.FC<RoutesProps> = ({}: RoutesProps) => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        style={{ overflow: 'visible' }}
        initialRouteName="Home"
        headerMode="none"
        screenOptions={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          ...TransitionPresets.ScaleFromCenterAndroid,
        }}
      >
        <Stack.Screen name={HOME_ROUTE_NAME} component={Home} />
        <Stack.Screen name={CATEGORIES_ROUTE_NAME} component={Categories} />
        <Stack.Screen
          name={CATEGORY_ROUTE_NAME}
          component={CategoryExplorer}
          options={{
            ...TransitionPresets.ModalSlideFromBottomIOS,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Routes
