import { createSlice } from '@reduxjs/toolkit'
import themes from '@/Theme/themes'
import themeState from '@/Store/States/ThemeState'

export const initialState = themeState
const ThemeSlice = createSlice({
  name: 'theme',
  initialState: initialState,
  reducers: {
    changeTheme: (state, { payload: { theme, darkMode } }: ThemePayload) => {
      if (typeof theme !== 'undefined') {
        state.theme = theme
      }
      if (typeof darkMode !== 'undefined') {
        state.darkMode = darkMode
      }
    },
    setDefaultTheme: (
      state,
      { payload: { theme, darkMode } }: ThemePayload,
    ) => {
      if (!state.theme) {
        if (typeof theme !== 'undefined') {
          state.theme = theme
        }
        if (typeof darkMode !== 'undefined') {
          state.darkMode = darkMode
        }
      }
    },
  },
})

export const { changeTheme, setDefaultTheme } = ThemeSlice.actions

export default ThemeSlice.reducer

type DarkProps<T> = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  [K in keyof T]: K extends `${infer Prefix}_dark` ? K : never
}[keyof T]

type PropsWithoutDark<T> = Omit<T, DarkProps<T>>

export type ThemeState = {
  theme: 'default' | keyof PropsWithoutDark<typeof themes>
  darkMode: boolean | null
}

type ThemePayload = {
  payload: Partial<ThemeState>
}
