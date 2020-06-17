import React from 'react'
import { View, Image, StyleSheet } from 'react-native'

import { Text, Button } from '../components'
import { useTranslation } from 'react-i18next'
import { FontSizes, Colors, Spaces } from '../styles'
import image from '../../assets/box.svg'
import { HOME_ROUTE_NAME } from '../constants'

type InstructionsProps = {
  navigation?: any
}

const Instructions: React.FC<InstructionsProps> = ({ navigation }: InstructionsProps) => {
  const { t } = useTranslation()

  const goToHome = () => {
    navigation.navigate(HOME_ROUTE_NAME)
  }

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text color={Colors.primary} size={FontSizes.small} bold>
          {t('longTermGiftForPeopleYouLove')}
        </Text>
        <Text
          font="Varela"
          size={FontSizes.larger}
          color={Colors.primary}
          bolder
        >
          {t('GiftCap')}
        </Text>
      </View>
      <View style={styles.imageContainer}>
        <Image source={image} style={styles.image} />
      </View>
      <View style={styles.instructions}>
        <Text style={styles.instructionsItem} color={Colors.primary} size={FontSizes.smaller} bold>
          {t('giftCapSolveProblem')}
        </Text>
        <Text style={styles.instructionsItem}  color={Colors.primary} size={FontSizes.smaller} bold>
          {t('withGiftcard')}
        </Text>
        <Text style={styles.instructionsItem} color={Colors.primary} size={FontSizes.smaller} bold>
          {t('buyAStock')}
        </Text>
        <Text style={styles.instructionsItem}  color={Colors.primary} size={FontSizes.smaller} bold>
          {t('receivingTheGift')}
        </Text>
      </View>
      <Button style={styles.cta} onPress={goToHome}>
        <Text>{t("instructionsCta")}</Text>
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: Spaces.vertical * 2,
    paddingHorizontal: Spaces.horizontal * 2,
    overflow: 'scroll'
  },
  title: {
    textAlign: 'center',
  },
  imageContainer: {
    alignItems: 'center',
    marginVertical: Spaces.vertical,
  },
  image: {
    width: 200,
    height: 200,
  },
  instructions: {
    marginTop: Spaces.vertical * 3,
    textAlign: 'center',
  },
  instructionsItem: {
    marginVertical: Spaces.vertical * 0.2
  },
  cta: {
    marginVertical: Spaces.vertical,
    alignSelf: 'center',
    width: '80%'
  }

})

export default Instructions
