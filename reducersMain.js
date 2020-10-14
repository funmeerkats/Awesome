import { combineReducers } from 'redux'
import {stateApp} from './reducer'
import {asyncDataThunk, asyncDataSaga, setData} from './asyncReducer'

export default combineReducers({
  stateApp,
  asyncDataThunk,
  asyncDataSaga,
  setData
})
