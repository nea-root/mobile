import { Palette } from './Palette'

/**
 * Roles for colors. You can access Colors in Variable by const {Colors} = useTheme()  Prefer using these over the palette.  It makes it easier
 * to change things.
 *
 * The only roles we need to place in here are the ones that span through the app.
 *
 * If you have a specific use-case, like a spinner color.  It makes more sense to
 * put that in the <Spinner /> component.
 */
export const Color = {
  /**
   * The palette is available to use, but prefer using the name.
   */
  Palette,
  /**
   * A helper for making something see-thru. Use sparingly as many layers of transparency
   * can cause older Android devices to slow down due to the excessive compositing required
   * by their under-powered GPUs.
   */
  transparent: 'rgba(0, 0, 0, 0)',
  transparent65: 'rgba(0, 0, 0, 0.65)',
  transparentLight65: 'rgba(255, 255, 255, 0.3)',
  /**
   * The video screen background.
   */
  videoBackground: 'rgba(0, 0, 0, 0)',
  /**
   * The screen background.
   */
  background: 'rgba(15, 43, 37, 1)',
  /**
   * The main tinting color.
   */
  primary: '#12D6DF',

  /**
   * The main light color.
   */
  primaryLighter: '#BCE9EB',
  /**
   * The main tinting color, but darker.
   */
  primaryDarker: '#12797D',
  /**
   * The link  color.
   */
  link: '#27AE60',

  /**
   * The highlight color.
   */
  highlight: '#f3a212',
  /**
   * A subtle color used for borders and lines.
   */
  line: Palette.offWhite,
  /**
   * The default color of text in many components.
   */
  text: Palette.white,
  textDark: 'rgba(0, 0, 0, 0.65)',
  /**
   * Secondary information.
   */
  dim: Palette.lightGrey,
  /**
   * Error messages and icons.
   */
  error: Palette.angry,

  /**
   * Storybook background for Text stories, or any stories where
   * the text color is color.text, which is white by default, and does not show
   * in Stories against the default white background
   */
  storybookDarkBg: Palette.black,

  /**
   * Storybook text color for stories that display Text components against the
   * white background
   */
  storybookTextColor: Palette.black,

  gradientColorsMain: ['#F70FFF', '#12D6DF'],
  gradientColorsMain50: ['rgba(247, 15, 255, 0.6)', 'rgba(18, 212, 222, 0.6)'],

  gradientColorsDark: ['#330C5E', '#0F2A58'],
  /**
   * Variant color
   */

  surfaceVariant: Palette.offWhite,

  /**
   * Surface components background color
   */

  surface: 'rgba(255, 251, 254, 1)',

  inputBackground: 'rgba(245,245,245,0.34)',

  dropdownBtnStyleBackground: 'rgba(245, 245, 245, 0.34)',
  dropdownStyleBackground: '#EFEFEF',
  dropdownRowBottomBorder: '#C5C5C5',
  greenButtonBackground: '#02fa9c',
  remoteControlButtonGradient: ['#17563A', 'rgba(131, 235, 189, 0.86)'],
  backgroundTextInput: 'rgba(245, 245, 245, 0.34)',
  textInputColor: Palette.white,
  textInputSelectionColor: '#1C2933',
  borderErrorTextInputContainerColor: 'rgba(255, 77, 0, 1)',
  topLabelTextInputColor: 'rgba(243, 243, 243, 1)',
  toggleEyeIconColor: 'rgba(245, 245, 245, 0.3)',
  signInGroupButtonBackgroundColor: Palette.white,
  signInGroupButtonTextColor: Palette.darkGreen,
  textDontHaveAnAccountLabel: '#4D9B8D',
  signInTextSignUpButton: Palette.white,
  termsBackground: Palette.white,
  termsNavigationBarBackground: Palette.black,
  termsContent: Palette.darkGreen,
  termsAcceptButtonBackgroundColor: Palette.darkGreen,
  termsAcceptButtonTextColor: Palette.white,
  activityIndicatorBoxBackgroundColor: 'rgba(0, 0, 0, 0.5)',
  progressBar: Palette.lightGreen,
  progressBarAlter: 'rgba(157, 211, 245, 1)',
  progressBarCharging: Palette.darkGreen,
  /**
   * call screen button  background color
   */
  lightGreen: Palette.lightGreen,

  /**
   * BottomSheet styles
   */
  blurBottomSheetBackground: 'rgba(255, 255, 255, .25)',

  /**
   * HomePage menu styles
   */
  menuItemComponentBackground: 'rgba(255, 255, 255, 0.53)',

  darkGreen: Palette.darkGreen,

  /**
   * Chart colors
   */
  chartBlue: 'rgba(59, 0, 237, 1)',
  chartFuchsia: 'rgba(156, 39, 176, 1)',
  chartRose: 'rgba(216, 27, 96, 1)',
  chartAmber: 'rgba(255, 152, 0, 1)',
  chartLime: 'rgba(192, 202, 51, 1)',

  /**
   * Avatar component
   */
  avatarBorderColor: Palette.white,

  /**
   * Tab bar component
   */
  tabBarBackground: 'rgba(1, 36, 28, 1)',

  /**
   * BG Text color
   */
  bgTextColor: 'rgba(255, 255, 255, .10)',
}
