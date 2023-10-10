import { createSlice } from '@reduxjs/toolkit'

interface NavigationState {
  currentRoute: string
}

const NAVIGATION_ACTION = 'navigation'
const ACTION_SET_ROUTE = 'setRoute'
// eslint-disable-next-line max-len
export const NAVIGATION_ACTION_NAVIGATE = `${NAVIGATION_ACTION}/${ACTION_SET_ROUTE}`

const initialState: NavigationState = {
  currentRoute: '',
}

export const navigationSlice = createSlice({
  name: NAVIGATION_ACTION,
  initialState,
  reducers: {
    [ACTION_SET_ROUTE]: (state, action) => {
      state.currentRoute = action.payload
    },
  },
})

export const { setRoute } = navigationSlice.actions
export const navigationReducer = navigationSlice.reducer
