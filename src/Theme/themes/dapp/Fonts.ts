/**
 * This file contains all application's style relative to fonts
 */
import { StyleSheet } from 'react-native'
import { ThemeVariables } from '../../theme'

export default function ({ FontSize, Colors }: ThemeVariables) {
  return StyleSheet.create({
    textTiny: {
      fontSize: FontSize.tiny,
      fontFamily: 'NunitoSans-Regular',
      color: Colors.text,
    },
    textExtraSmall: {
      fontSize: FontSize.extraSmall,
      fontFamily: 'NunitoSans-Regular',
      color: Colors.text,
    },
    textSmall: {
      fontSize: FontSize.small,
      fontFamily: 'NunitoSans-Regular',
      color: Colors.text,
    },
    mediumSmall: {
      fontSize: FontSize.mediumSmall,
      fontFamily: 'NunitoSans-Regular',
      color: Colors.text,
    },
    textLarge: {
      fontSize: FontSize.large,
      fontFamily: 'NunitoSans-Regular',
      color: Colors.text,
    },
    textRegular: {
      fontSize: FontSize.regular,
      fontFamily: 'NunitoSans-Regular',
      color: Colors.text,
    },
    textBoldRegular: {
      fontSize: FontSize.regular,
      fontFamily: 'NunitoSans-Bold',
      color: Colors.text,
    },
    textMediumLarge: {
      fontSize: FontSize.mediumLarge,
      fontFamily: 'NunitoSans-Regular',
      color: Colors.text,
    },
    textHuge: {
      fontSize: FontSize.huge,
      fontFamily: 'NunitoSans-Regular',
      color: Colors.text,
    },
    titleSmall: {
      fontSize: FontSize.small * 2,
      fontWeight: 'bold',
      fontFamily: 'NunitoSans-Regular',
    },
    titleRegular: {
      fontSize: FontSize.regular * 2,
      fontWeight: 'bold',
      fontFamily: 'NunitoSans-Regular',
    },
    textCenter: {
      textAlign: 'center',
    },
    textJustify: {
      textAlign: 'justify',
    },
    textLeft: {
      textAlign: 'left',
    },
    textRight: {
      textAlign: 'right',
    },
    weightThin: {
      fontWeight: '100',
    },
    weightExLight: {
      fontWeight: '200',
    },
    weightLight: {
      fontWeight: '300',
    },
    weightRegular: {
      fontWeight: '400',
    },
    weightMedium: {
      fontWeight: '500',
    },
    weightSemiBold: {
      fontWeight: '600',
    },
    weightBold: {
      fontWeight: '700',
    },
    weightExBold: {
      fontWeight: '800',
    },
    weightBlack: {
      fontWeight: '900',
    },
  })
}
