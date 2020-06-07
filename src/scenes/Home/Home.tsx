import React from 'react'
import { inject, observer } from 'mobx-react'
import { View, StyleSheet } from 'react-native'
import { Header, Steps, StepPanel, SelectStocksStep } from '../../components'
import { Colors, Spaces } from '../../styles'
import RootStore from '../../stores'

type HomeProps = {
  navigation: any,
  root?: RootStore
}

const Home: React.FC<HomeProps> = ({ root, navigation }: HomeProps) => {
  const { buyer } = root as RootStore

  return (
    <View style={styles.home}>
      <View style={styles.main}>
        <Steps number={buyer.steps.length} current={buyer.currentStep} />
        <StepPanel>
          <SelectStocksStep navigate={navigation.navigate} />
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
    paddingVertical: Spaces.vertical * 3,
    paddingHorizontal: Spaces.horizontal * 2,
    flex: 1,
    alignItems: 'flex-start',
  },
})

export default inject('root')(observer(Home))
