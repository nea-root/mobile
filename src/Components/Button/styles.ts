import { CommonParams } from '@/Theme/theme'
import { StyleSheet } from 'react-native'


export default function <C>({
  Colors,
  Gutters,
  Layout,
  FontSize,
  MetricsSizes,
  ViewSizes,
  Dimens,
  Fonts,
}: Partial<CommonParams<C>> = {}) {
  // let buttonHeight = 40;
  // let buttonPadding = 10;
  // let fontSize = 16;

  // switch (size) {
  //   case 'small':
  //     buttonHeight = 30;
  //     buttonPadding = 8;
  //     fontSize = 14;
  //     break;
  //   case 'large':
  //     buttonHeight = 60;
  //     buttonPadding = 16;
  //     fontSize = 20;
  //     break;
  // }

  return StyleSheet.create({
    container: {
        display: 'flex',
        width: '90%',
        height: 48,
        paddingTop: 8,
        paddingRight: 16,
        paddingBottom: 8,
        paddingLeft: 16,
        gap: 8,
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'nowrap',
        backgroundColor: '#4ac16a',
        borderRadius: 100,
        position: 'relative',
        marginTop: 0,
        marginRight: 'auto',
        marginBottom: 0,
        marginLeft: 'auto',
      },
      text: {
        display: 'flex',
        height: 22,
        justifyContent: 'center',
        alignItems: 'flex-start',
        flexShrink: 0,
        flexBasis: 'auto',
        fontFamily: 'Montserrat',
        fontSize: 14,
        fontWeight: '600',
        lineHeight: 22,
        color: '#0b0b14',
        letterSpacing: -0.14,
        position: 'relative',
        textAlign: 'center',
      },
      disabledContainer: {
        backgroundColor: '#BDBDBD',
      },
  })
}
