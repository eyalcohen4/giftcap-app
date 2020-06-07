import React from 'react'
import { SafeAreaView } from 'react-native'
import { AppLoading } from 'expo'
import { useFonts } from '@use-expo/font'

import './src/languages'
import { Routes } from './src/scenes'

function App() {
  let [fontsLoaded] = useFonts({
    Varela: require('./assets/fonts/VarelaRound-Regular.ttf'),
  })

  return (
    <SafeAreaView>{fontsLoaded ? <Routes /> : <AppLoading />}</SafeAreaView>
  )
}

export default App
