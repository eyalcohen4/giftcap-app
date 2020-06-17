import { Dimensions } from 'react-native'
import { moderateScale } from './scaling'

export default {
  windowHeight: Dimensions.get('window').height,
  windowWidth: Dimensions.get('window').width,
  header: 80,
  slideInPanel: Dimensions.get('window').height * 0.7,
  cartHeight: Dimensions.get('window').height * 0.25,
}
