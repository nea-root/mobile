import { createSlice } from '@reduxjs/toolkit'
// This slice is being used for dummy screen test we are storing first and last name here
export const initialState = { firstName: null, lastName: null } as DummyState;
const slice = createSlice({
  name: 'dummySlice',
  initialState: initialState,
  reducers: {
    changeNames: (
      state,
      { payload: { firstName, lastName } }: ChangeNameDummyPayload,
    ) => {
      if (typeof firstName !== 'undefined') {
        state.firstName = firstName
      }
      if (typeof lastName !== 'undefined') {
        state.lastName = lastName
      }
    },
  },
})

export const { changeNames } = slice.actions

export default slice.reducer

export type DummyState = {
  firstName: null | string
  lastName: string | null
}

type ChangeNameDummyPayload = {
  payload: Partial<DummyState>
}
