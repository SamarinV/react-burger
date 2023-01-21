import { createSlice } from '@reduxjs/toolkit'

export const orderNumberSlice = createSlice({
	name: 'orderNumber',
	initialState: { items: null },
	reducers: {
		addOrder: (state, action) => {
			state.items = action.payload
		},
	},
})

// Action creators are generated for each case reducer function
export const { addOrder } = orderNumberSlice.actions

export default orderNumberSlice.reducer