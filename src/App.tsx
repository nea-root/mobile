import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/lib/integration/react'
import { store, persistor } from '@/Store'
import ApplicationNavigator from '@/Navigators/Application'
import { Provider as PaperProvider } from 'react-native-paper'
import { useEffect } from 'react'
// import NativeLocalStorage from '../specs/NativeLocalStorage'
import NativeRNConfig from '../specs/NativeRNConfig'
import NativeLocalStorage from '../specs/NativeLocalStorage'
const App = () => {
  // const getLocalStorage = async () => {
  //   NativeLocalStorage.setItem("json", "123456")
  //     setTimeout(()=>{
  //       const val = NativeLocalStorage.getItem("json")
  //       console.log(val)
  //     },1000)

  // }
  useEffect(()=>{
    console.log(NativeRNConfig.getEnv())
    console.log(NativeLocalStorage.getItem("json"))
  },[])

  return (
    <Provider store={store}>
      {/**
         * PersistGate delays the rendering of the app's UI until the persisted state has been retrieved
         * and saved to redux.
         * The `loading` prop can be `null` or any react instance to show during loading (e.g. a splash screen),
         * for example `loading={<SplashScreen />}`.
         * @see https://github.com/rt2zz/redux-persist/blob/master/docs/PersistGate.md
         */}
        <PaperProvider>
          <ApplicationNavigator />
        </PaperProvider>
    </Provider>
  )
}

export default App

