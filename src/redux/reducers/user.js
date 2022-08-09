import { createSlice } from '@reduxjs/toolkit'

const initialState = { isLoggedIn: false, userData: {} }

const counterSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload
      return state
    },
    setUser: (state, action) => {
      state.userData = action.payload.userData
      state.isLoggedIn = action.payload.isLoggedIn
      return state
    }
  },
})

export const { setLoggedIn, setUser } = counterSlice.actions
export default counterSlice.reducer
