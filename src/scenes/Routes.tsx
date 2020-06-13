import React from 'react'
import { Linking } from 'expo'
import { NavigationContainer } from '@react-navigation/native'
import {
  createStackNavigator,
  TransitionPresets,
  CardStyleInterpolators,
} from '@react-navigation/stack'
import { inject, observer } from 'mobx-react'

import {
  Home,
  Categories,
  CategoryExplorer,
  GiftPreview,
  GiftSent,
  ClaimProcess,
  MyGifts,
} from './'
import {
  CATEGORIES_ROUTE_NAME,
  CATEGORY_ROUTE_NAME,
  HOME_ROUTE_NAME,
  GIFT_PREVIEW_ROUTE_NAME,
  SENT_GIFT_SUCCESS_ROUTE_NAME,
  CLAIM_ROUTE_NAME,
  MY_GIFTS_ROUTE_NAME,
  LOGIN_ROUTE_NAME,
  INSTRUCTIONS_ROUTE_NAME,
} from '../constants'
import Login from './Login'
import Instructions from './Instructions'
import Root from '../stores'

const prefix = Linking.makeUrl('/')

const Stack = createStackNavigator()

type RoutesProps = {
  onRef: Function
  root?: Root
}

const Routes: React.FC<RoutesProps> = ({ root, onRef }: RoutesProps) => {
  const { user } = root

  const linking = {
    prefixes: [prefix],
    config: {
      [CLAIM_ROUTE_NAME]: 'claim/:id',
    },
  }

  return (
    <NavigationContainer linking={linking} ref={onRef}>
      <Stack.Navigator
        style={{ overflow: 'visible' }}
        initialRouteName={
          user.isLoggedIn ? MY_GIFTS_ROUTE_NAME : INSTRUCTIONS_ROUTE_NAME
        }
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
            cardStyleInterpolator: CardStyleInterpolators.forNoAnimation,
          }}
        />
        <Stack.Screen
          name={SENT_GIFT_SUCCESS_ROUTE_NAME}
          component={GiftSent}
          options={{
            cardStyleInterpolator:
              CardStyleInterpolators.forRevealFromBottomAndroid,
          }}
        />
        <Stack.Screen name={CLAIM_ROUTE_NAME} component={ClaimProcess} />
        <Stack.Screen
          style={{ overflow: 'visible' }}
          name={MY_GIFTS_ROUTE_NAME}
          component={MyGifts}
        />
        <Stack.Screen name={LOGIN_ROUTE_NAME} component={Login} />
        <Stack.Screen name={INSTRUCTIONS_ROUTE_NAME} component={Instructions} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default inject('root')(observer(Routes))
