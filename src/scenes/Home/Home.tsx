import React from 'react'
import { inject, observer } from 'mobx-react'
import { View, StyleSheet } from 'react-native'

import GiftPreview from '../GiftPreview'
import RootStore from '../../stores'
import { Colors, Spaces } from '../../styles'
import { SENT_GIFT_SUCCESS_ROUTE_NAME } from '../../constants'
import {
  Steps,
  StepPanel,
  SelectStocksStep,
  DetailsStep,
} from '../../components'

type HomeProps = {
  navigation: any
  root?: RootStore
}

const Home: React.FC<HomeProps> = ({ root, navigation }: HomeProps) => {
  const { buyer, ui } = root as RootStore

  const handleFinish = () => {
    navigation.navigate(SENT_GIFT_SUCCESS_ROUTE_NAME)
  }

  return (
    <View style={styles.home}>
      <View style={styles.main}>
        <View style={{ marginVertical: Spaces.vertical * 2 }}>
          <Steps number={buyer.steps.length} current={buyer.currentStep} />
        </View>
        <StepPanel show={buyer.currentStep === 0}>
          <SelectStocksStep navigate={navigation.navigate} />
        </StepPanel>
        <StepPanel show={buyer.currentStep === 1}>
          <GiftPreview />
        </StepPanel>
        <StepPanel show={buyer.currentStep === 2}>
          <DetailsStep onFinish={handleFinish} />
        </StepPanel>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  home: {
    flex: 1,
  },
  main: {
    backgroundColor: Colors.secondary,
    paddingVertical: Spaces.vertical,
    paddingHorizontal: Spaces.horizontal * 2,
    flex: 1,
  },
})

export default inject('root')(observer(Home))
