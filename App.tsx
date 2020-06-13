import React, { useEffect, ReactNode } from 'react'
import { SafeAreaView, I18nManager, View, Text } from 'react-native'
import { Provider, inject, observer } from 'mobx-react'
import { AppLoading } from 'expo'
import { useFonts } from '@use-expo/font'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import 'mobx-react-lite/batchingForReactNative'

import './src/languages'
import { Routes } from './src/scenes'
import RootStore from './src/stores'
import { Header, SlideInPanel, AddStock, BuyCart } from './src/components'
import { Sizes } from './src/styles'
import {
  HOME_ROUTE_NAME,
  LOGIN_ROUTE_NAME,
  MY_GIFTS_ROUTE_NAME,
  CATEGORIES_ROUTE_NAME,
} from './src/constants'
import { HeaderIcons } from './src/types'

I18nManager.forceRTL(true)
I18nManager.allowRTL(true)

const root = new RootStore()

function AppComponent({ loaded }) {
  const { ui, user, buyer } = root
  let navigation
  let route

  const setNavigation = (ref: any) => {
    if (!navigation) {
      navigation = ref
    }
  }

  const handleAddStock = (item) => {
    buyer.addGiftItem(item)

    setTimeout(() => {
      ui.closePreviewStockModal()
    }, 100)
  }

  const handleBuyCartNext = () => {
    if (navigation) {
      navigation.navigate(HOME_ROUTE_NAME)
    }

    buyer.next()
  }

  const goToLogin = () => {
    navigation.navigate(
      user.isLoggedIn ? MY_GIFTS_ROUTE_NAME : LOGIN_ROUTE_NAME
    )
  }

  const onSearch = () => {
    if (ui.headerRightIcon === HeaderIcons.gift) {
      navigation.navigate(HOME_ROUTE_NAME)
    }

    if (ui.headerRightIcon === HeaderIcons.search) {
      navigation.navigate(CATEGORIES_ROUTE_NAME)
    }
  }

  return loaded && root.isInitFinished ? (
    <SafeAreaView style={{ flex: 1 }}>
      <Header onGoToLogin={goToLogin} onSearch={onSearch} />
      <View style={{ flex: 1 }}>
        <Routes onRef={(navRef) => setNavigation(navRef)} />
      </View>
      <SlideInPanel
        isOpen={ui.previewStockModal.open}
        onClose={() => ui.closePreviewStockModal()}
        elliptic
      >
        <AddStock
          stock={ui.previewStockModal.stock}
          handleAdd={handleAddStock}
        />
      </SlideInPanel>
      <SlideInPanel
        height={Sizes.cartHeight}
        isOpen={
          buyer.gift.items?.length > 0 &&
          !ui.previewStockModal.open &&
          !ui.hideBuyCart
        }
        showTouchable={false}
      >
        <BuyCart onPressNext={handleBuyCartNext} />
      </SlideInPanel>
    </SafeAreaView>
  ) : (
    <AppLoading />
  )
}

const App = inject('root')(observer(AppComponent))

function AppContainer() {
  let [fontsLoaded] = useFonts({
    Varela: require('./assets/fonts/VarelaRound-Regular.ttf'),
    rubik: require('./assets/fonts/Rubik-Regular.ttf'),
    RubikBold: require('./assets/fonts/Rubik-Bold.ttf'),
    RubikMedium: require('./assets/fonts/Rubik-Medium.ttf'),
    Assistant: require('./assets/fonts/Assistant-Regular.ttf'),
    AssistantBold: require('./assets/fonts/Assistant-Bold.ttf'),
    AssistantExtraBold: require('./assets/fonts/Assistant-ExtraBold.ttf'),
  })

  useEffect(() => {
    if (I18nManager.isRTL != true) {
      I18nManager.allowRTL(true)
      I18nManager.forceRTL(true)
    }
  }, [])

  return (
    <Provider root={root}>
      <KeyboardAwareScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ flex: 1 }}
      >
        <App loaded={fontsLoaded} />
      </KeyboardAwareScrollView>
    </Provider>
  )
}

export default AppContainer
