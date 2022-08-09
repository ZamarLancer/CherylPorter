import { createSlice } from '@reduxjs/toolkit'

const initialState = { level: 0 }

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setLevel: (state, action) => {
      state.level = action.payload
      return state
    },
  },
})

export const { setLevel } = dataSlice.actions
export default dataSlice.reducer
