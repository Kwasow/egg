import { combineReducers } from '@reduxjs/toolkit'
import { navigationReducer } from '../../components/navigation/redux/slice'

export const rootReducer = combineReducers({
  navigation: navigationReducer,
})
