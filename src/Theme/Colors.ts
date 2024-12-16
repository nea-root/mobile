import { Palette } from './Palette'
const tintColorLight = '#2f95dc';
const tintColorDark = '#fff';
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
   * Nea Primary Colors
   */

  light: {
    text: '#000',
    background: '#fff',
    tint: tintColorLight,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#fff',
    background: '#000',
    tint: tintColorDark,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorDark,
  },
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
  transparentLight13: 'rgba(255, 255, 255, 0.13)',
  /**
   * The video screen background.
   */
  videoBackground: Palette.deepPurple,
  /**
   * The screen background.
   */
  background: Palette.deepPurple,
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
   * The UI/dark color
   */
  uiDark: '#083125',

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

  /**
   * Background colors
   */
  inputBackground: 'rgba(245,245,245,0.34)',
  remoteControlBottomSheetBackground: '#33564E',
  dropdownBtnStyleBackground: 'rgba(245, 245, 245, 0.34)',
  dropdownStyleBackground: '#EFEFEF',
  dropdownRowBottomBorder: '#C5C5C5',
  greenButtonBackground: '#02fa9c',
  menuItemBorder: 'rgba(255, 255, 255, 0.24)',
  funcButton: '#D9D9D9',
  itemTitle: '#FFFFFF',
  remoteControlButtonLightGradient: [
    'rgba(6, 118, 85, 0.67)',
    'rgba(226, 255, 247, 0.19)',
  ],
  remoteControlButtonDarkGradient: [
    'rgba(6, 118, 85, 0.67)',
    'rgba(10, 62, 47, 0.19)',
  ],
  progressBar: Palette.lightGreen,
  progressBarAlter: 'rgba(157, 211, 245, 1)',

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
  menuItemComponentBackground: 'rgba(255, 255, 255, 0.63)',

  backgroundTextInput: 'rgba(255, 255, 255, 0.15)',
  textInputColor: Palette.white,
  textInputSelectionColor: Palette.lightGreen,
  borderErrorTextInputContainerColor: 'rgba(255, 77, 0, 1)',
  topLabelTextInputColor: 'rgba(243, 243, 243, 1)',
  toggleEyeIconColor: 'rgba(245, 245, 245, 0.3)',
  errorTextInputColor: '#FF4D4D',
  signInGroupButtonBackgroundColor: Palette.lightGreen,
  signInGroupButtonTextColor: '#86A795',
  textDontHaveAnAccountLabel: Palette.white,
  signInTextSignUpButton: 'rgba(245,245,245, 0.34)',
  termsBackground: Palette.deepPurple,
  termsNavigationBarBackground: Palette.white,
  termsContent: Palette.white,
  termsAcceptButtonBackgroundColor: Palette.lightGreen,
  termsAcceptButtonTextColor: '#86A795',
  activityIndicatorBoxBackgroundColor: 'rgba(0, 0, 0, 0.5)',
  progressBarCharging: Palette.deepPurple,

  /**
   * Home button
   *
   */

  homeButtonDisabled: 'rgba(159, 237, 203, 0.5)',

  /**
   * call screen button  background color
   */

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
  tabBarOnFocus: 'rgba(159, 237, 203, 1)',

  callButtonShadow: '#587A72',
  gray: '#A6A6A7',
  darkblue: '#2196F3',

  /**
   * Remote control colors
   */
  remoteControlItemText: Palette.black,

  /**
   * BG Text color
   */
  bgTextColor: 'rgba(255, 255, 255, .10)',

  /**
   * Climate
   */
  climateItemBackground: 'rgba(2, 13, 5, 0.62)',
  sliderOnColor: 'rgba(255, 255, 255, 1)',
  sliderOffColor: 'rgba(255, 255, 255, 0.5)',
  switchOffBackground: 'rgba(196, 196, 196, 1)',
  switchOnBackground: 'rgba(77, 155, 141, 1)',
  lilyWhite: 'rgba(240, 243, 241, 1)',

  /**
   * Alert modal
   **/
  alertShadowColor: '#000',
  alertTextColor: '#25042D',
  alertDividerColor: '#A09BFF',

  removeButtonColor: 'rgba(235, 85, 69, 1)',
  checkBoxCardContainerColor: 'rgba(0, 0, 0, 0.29)',
  additionalRed: '#EB5545',
  cardPaymentPlacholderTextColor: '#C0C6D0',
}
