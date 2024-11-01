import { StyleSheet } from 'react-native'
import { ThemeVariables } from './theme'

export default function ({}: ThemeVariables) {
  return StyleSheet.create({
    /* Column Layouts */
    column: {
      flexDirection: 'column',
    },
    columnReverse: {
      flexDirection: 'column-reverse',
    },
    colCenter: {
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
    colVCenter: {
      flexDirection: 'column',
      alignItems: 'center',
    },
    colHCenter: {
      flexDirection: 'column',
      justifyContent: 'center',
    },
    /* Row Layouts */
    row: {
      flexDirection: 'row',
    },
    rowReverse: {
      flexDirection: 'row-reverse',
    },
    rowCenter: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    rowcontentbetween: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    rowVCenter: {
      flexDirection: 'row',
      justifyContent: 'center',
    },
    rowHCenter: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    /* Default Layouts */
    center: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    alignItemsCenter: {
      alignItems: 'center',
    },
    alignItemsStart: {
      alignItems: 'flex-start',
    },
    alignItemsEnd: {
      alignItems: 'flex-end',
    },
    alignItemsStretch: {
      alignItems: 'stretch',
    },
    alignSelfCenter: {
      alignSelf: 'center',
    },
    alignSelfStart: {
      alignSelf: 'flex-start',
    },
    alignSelfStretch: {
      alignSelf: 'stretch',
    },
    alignSelfBaseline: {
      alignSelf: 'baseline',
    },
    alignSelfAuto: {
      alignSelf: 'auto',
    },
    alignSelfEnd: {
      alignSelf: 'flex-end',
    },
    justifyContentCenter: {
      justifyContent: 'center',
    },
    justifyContentAround: {
      justifyContent: 'space-around',
    },
    justifyContentBetween: {
      justifyContent: 'space-between',
    },
    justifyContentFlexEnd: {
      justifyContent: 'flex-end',
    },
    justifyContentFlexStart: {
      justifyContent: 'flex-start',
    },
    justifyContentSpaceEvenly: {
      justifyContent: 'space-evenly',
    },
    scrollSpaceAround: {
      flexGrow: 1,
      justifyContent: 'space-around',
    },
    scrollSpaceBetween: {
      flexGrow: 1,
      justifyContent: 'space-between',
    },
    selfStretch: {
      alignSelf: 'stretch',
    },
    wrap: {
      flexWrap: 'wrap',
    },
    positionAbsolute: {
      position: 'absolute',
    },
    absoluteCenter: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    },
    absoluteStretchCentered: {
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    },
    alignContentStart: {
      alignContent: 'flex-start',
    },
    alignContentCenter: {
      alignContent: 'center',
    },
    /* Sizes Layouts */
    fill: {
      flex: 1,
    },
    fill90Percent: {
      flex: 0.9,
    },
    fill10Percent: {
      flex: 0.1,
    },
    fill20Percent: {
      flex: 0.2,
    },
    fill80Percent: {
      flex: 0.8,
    },
    fullSize: {
      height: '50%',
      width: '50%',
      alignSelf: 'center',
    },
    fullWidth: {
      width: '100%',
    },
    fullHeight: {
      height: '100%',
    },
    /* Operation Layout */
    mirror: {
      transform: [{ scaleX: -1 }],
    },
    rotate90: {
      transform: [{ rotate: '90deg' }],
    },
    rotate90Inverse: {
      transform: [{ rotate: '-90deg' }],
    },
    rotate30: {
      transform: [{ rotate: '30deg' }],
    },
    rotate30Inverse: {
      transform: [{ rotate: '-30deg' }],
    },
    rotate35: {
      transform: [{ rotate: '35deg' }],
    },
    rotate35Inverse: {
      transform: [{ rotate: '-35deg' }],
    },
    overflowhidden: { overflow: 'hidden' },
  })
}
