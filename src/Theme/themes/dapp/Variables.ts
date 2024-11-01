import { Color } from './Colors'

export const Colors = {
  ...Color,
  primary: 'lightblue',
  text: 'white',
  surface: 'rgba(255, 255, 255, 0.12)',
  surfaceLightVariant: 'rgba(255, 255, 255, 0.2)',
  surfaceVariant: 'rgba(255, 255, 255, 0.3)',
  separator: 'rgba(255, 255, 255, 0.17)',
  separatorDark: 'rgba(140, 148, 142, 1)',
  buttonBackground: 'rgb(159, 237, 203)',
}

const NavigationColors = {
  primary: Colors.primary,
}

/** * FontSize
 */
export const FontSize = {
  extraSmall: 12,
  small: 16,
  regular: 20,
  large: 40,
}

/**
 * Metrics Sizes
 */
const micro = 2
const tiny = 4
const extraSmall = 8
const small = 12
const medium = 16
const extraMedium = 20
const large = 24
const extraLarge = 32
const huge = 48
const extraHuge = 55
const massive = 648

export const MetricsSizes = {
  micro,
  tiny,
  extraSmall,
  small,
  medium,
  extraMedium,
  large,
  extraLarge,
  huge,
  extraHuge,
  massive,
}

export default {
  Colors,
  NavigationColors,
  FontSize,
  MetricsSizes,
}
