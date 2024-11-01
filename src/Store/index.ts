
import AsyncStorage from '@react-native-async-storage/async-storage'
import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'

import theme from './Theme'
import dummy from './Slices/DummySlice'
import { useDispatch, TypedUseSelectorHook, useSelector } from 'react-redux'


const reducers = combineReducers({
    theme,
    dummy
})

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['theme'],
}

const persistedReducer = persistReducer(persistConfig, reducers)

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware => {
    const middlewares = getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })

    // // @ts-ignore
    // if (__DEV__ && !process.env.JEST_WORKER_ID) {
    //   const createDebugger = require('redux-flipper').default
    //   middlewares.push(createDebugger())
    // }

    return middlewares
  },
})

const persistor = persistStore(store)

setupListeners(store.dispatch)

export type StoreStateType = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
export const useSelectorHook: TypedUseSelectorHook<StoreStateType> = useSelector

export { store, persistor }
