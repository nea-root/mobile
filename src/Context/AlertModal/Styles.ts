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
    blurView: {
      ...Layout.fill,
    },
  })
}
