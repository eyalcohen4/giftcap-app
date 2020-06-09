import React from 'react'
import { View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import {
  createStackNavigator,
  TransitionPresets,
  CardStyleInterpolators,
} from '@react-navigation/stack'

import { Home, Categories, CategoryExplorer, GiftPreview } from './'
import {
  CATEGORIES_ROUTE_NAME,
  CATEGORY_ROUTE_NAME,
  HOME_ROUTE_NAME,
  GIFT_PREVIEW_ROUTE_NAME,
  SENT_GIFT_SUCCESS_ROUTE_NAME
} from '../constants'
import GiftSent from './GiftSent'

const Stack = createStackNavigator()

type RoutesProps = {
  onRef: Function
}

const Routes: React.FC<RoutesProps> = ({ onRef }: RoutesProps) => {
  return (
    <NavigationContainer ref={onRef}>
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
        <Stack.Screen
          name={GIFT_PREVIEW_ROUTE_NAME}
          component={GiftPreview}
          options={{
            cardStyleInterpolator: CardStyleInterpolators.forNoAnimation
          }}
        />
        <Stack.Screen
          name={SENT_GIFT_SUCCESS_ROUTE_NAME}
          component={GiftSent}
          options={{
            cardStyleInterpolator: CardStyleInterpolators.forNoAnimation
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Routes
