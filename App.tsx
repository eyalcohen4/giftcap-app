import React, { useEffect, ReactNode } from 'react'
import { SafeAreaView, I18nManager, View, Text } from 'react-native'
import { Provider, inject, observer } from 'mobx-react'
import { AppLoading } from 'expo'
import { useFonts } from '@use-expo/font'
import 'mobx-react-lite/batchingForReactNative'

import './src/languages'
import { Routes } from './src/scenes'
import RootStore from './src/stores'
import { SlideInPanel, Header } from './src/components'

I18nManager.forceRTL(true)

const root = new RootStore()

function AppComponent() {
  const { ui } = root

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header />
      <Routes />
      <SlideInPanel
        isOpen={ui.previewStockModal.open}
        onClose={ui.closePreviewStockModal}
      >
        <View style={{ backgroundColor: '#ffff', height: 300 }}>
          <Text> HELLO </Text>
        </View>
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
  })

  useEffect(() => {
    if (I18nManager.isRTL != true) {
      I18nManager.forceRTL(true)
    }
  }, [])

  return (
    <Provider root={root}>
      {fontsLoaded ? <App /> : <AppLoading />}
    </Provider>
  )
}

export default AppContainer
