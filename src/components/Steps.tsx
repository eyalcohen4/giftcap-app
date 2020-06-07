import React from 'react'
import { View, StyleSheet } from 'react-native'

import { Circle, Text } from './'
import { Colors, Spaces } from '../styles'

type StepsProps = {
  number: number
  current?: number
}

type StepProps = {
  isSelected?: boolean
  withLine?: boolean
}

type StepPanelProps = {
  children: React.ReactNode
}

const StepIndicator: React.FC<StepProps> = ({
  isSelected,
  withLine,
}: StepProps) => {
  return (
    <View style={styles.step}>
      <Circle size="small" color={isSelected ? Colors.primary : Colors.white} />
      {withLine ? <View style={styles.divider} /> : null}
    </View>
  )
}

function createArray(length: number = 3, filler: any = null) {
  const result = []

  for (let i = 0; i < length; i++) {
    result.push(filler)
  }

  return result
}

const Steps: React.FC<StepsProps> = ({ number, current }: StepsProps) => {
  const steps = createArray(number)

  return (
    <View style={styles.steps}>
      {steps.map((_, index) => (
        <StepIndicator
          key={index}
          isSelected={current === index}
          withLine={index < number - 1}
        />
      ))}
    </View>
  )
}

export const StepPanel: React.FC<StepPanelProps> = ({
  children,
}: StepPanelProps) => {
  return <View style={styles.panel}>{children}</View>
}

const styles = StyleSheet.create({
  steps: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  divider: {
    width: 80,
    height: 1,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: Colors.primary,
    marginHorizontal: Spaces.horizontal,
  },
  step: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  panel: {
    marginTop: Spaces.vertical * 5,
  },
})

export default Steps