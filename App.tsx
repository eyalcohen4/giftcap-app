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

I18nManager.forceRTL(true)

const root = new RootStore()

function AppComponent() {
  const { ui, buyer } = root

  const handleAddStock = (item) => {
    buyer.addGiftItem(item)
    setTimeout(() => {
      ui.closePreviewStockModal()
    }, 100)
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header />
      <View style={{ flex: 1 }}>
        <Routes />
      </View>
      <SlideInPanel
        isOpen={ui.previewStockModal.open}
        onClose={() => ui.closePreviewStockModal()}
      >
        <AddStock
          stock={ui.previewStockModal.stock}
          handleAdd={handleAddStock}
        />
      </SlideInPanel>
      <SlideInPanel
        height={Sizes.cartHeight}
        isOpen={buyer.gift.items?.length > 0 && !ui.previewStockModal.open}
        showTouchable={false}
      >
        <BuyCart />
      </SlideInPanel>
    </SafeAreaView>
  )
}

const App = inject('root')(observer(AppComponent))

function AppContainer() {
  let [fontsLoaded] = useFonts({
    Varela: require('./assets/fonts/VarelaRound-Regular.ttf'),
    rubik: require('./assets/fonts/Rubik-Regular.ttf'),
    RubikBold: require('./assets/fonts/Rubik-Bold.ttf'),
    RubikMedium: require('./assets/fonts/Rubik-Medium.ttf'),
  })

  useEffect(() => {
    if (I18nManager.isRTL != true) {
      I18nManager.forceRTL(true)
    }
  }, [])

  return (
    <Provider root={root}>
      <KeyboardAwareScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ flex: 1 }}
      >
        {fontsLoaded ? <App /> : <AppLoading />}
      </KeyboardAwareScrollView>
    </Provider>
  )
}

export default AppContainer
