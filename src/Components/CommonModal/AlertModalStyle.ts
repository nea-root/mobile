import { CommonParams } from '@/Theme/theme'
import { StyleSheet } from 'react-native'

export default function <C>({
  Colors,
  Layout,
  Gutters,
  Fonts,
  MetricsSizes,
  ViewSizes,
  Dimens,
}: CommonParams<C>) {
  return StyleSheet.create({
    centeredView: {
      ...Layout.fill,
      ...Layout.center,
    },
    modalView: {
      ...Layout.alignSelfStretch,
      paddingTop: MetricsSizes.large,
      marginHorizontal: MetricsSizes.large,
      backgroundColor: Colors.Palette.white,
      borderRadius: Dimens.modalBorderRaidus,
      shadowColor: Colors.alertShadowColor,
      shadowOffset: {
        width: Dimens.zero,
        height: Dimens.alertShadowOffsetHeight,
      },
      shadowOpacity: Dimens.alertShadowOpacity,
      shadowRadius: Dimens.alertShadowRadius,
      elevation: Dimens.alertShadowElevation,
    },
    titleText: {
      textAlign: 'center',
      ...Fonts.textBoldRegular,
      color: Colors.alertTextColor,
      marginHorizontal: Dimens.alertMarginTop,
    },
    descriptionText: {
      ...Fonts.textSmallBold,
      color: Colors.alertTextColor,
      ...Gutters.largeHMargin,
      marginTop: Dimens.alertDescriptionMarginTop,
      textAlign: 'center',
    },
    divider: {
      ...Layout.alignSelfStretch,
      marginTop: Dimens.alertDividerMarginTop,
      height: Dimens.alertDividerHeight,
      backgroundColor: Colors.alertDividerColor,
    },
    actionContainer: {
      ...Layout.row,
      ...Layout.justifyContentSpaceEvenly,
      height: Dimens.alertActionHeight,
    },
    actionButton: {
      ...Layout.fill,
      borderRadius: Dimens.zero,
    },
    textStyle: {
      ...Fonts.textRegular,
      color: Colors.alertTextColor,
      padding: Dimens.alertActionTextPadding,
    },
    blurView: {
      ...Layout.fill,
    },
  })
}
