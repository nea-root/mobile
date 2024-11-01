/**
 * @format
 */

import { AppRegistry, LogBox } from 'react-native'
import App from './src/App'
import { name as appName } from './app.json'

LogBox.ignoreLogs(['Require cycle: node_modules/victory']) // Added as per documentation: https://github.com/FormidableLabs/victory/issues/2230

AppRegistry.registerComponent(appName, () => App)