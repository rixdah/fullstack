import { createSlice } from "@reduxjs/toolkit"


const notificationSlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    changeNotification(state, action) {
      const notification = action.payload
      state = notification
      return state
    },
    clearNotification(state, action) {
      state = ''
      return state
    }
  }
})

export const {changeNotification, clearNotification} = notificationSlice.actions

let timeoutID

export const setNotification = (text, time) => {
  return async dispatch => {
    dispatch(changeNotification(text))
    if (timeoutID) {
      clearTimeout(timeoutID)
    }
    timeoutID = setTimeout(() => {
      dispatch(clearNotification())
    }, time*1000)
  }
}

export default notificationSlice.reducer