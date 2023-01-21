import { createSlice } from '@reduxjs/toolkit'

export const modalContentSlice = createSlice({
	name: 'modalContent',
	initialState: { items: null },
	reducers: {
		addModalContent: (state, action) => {
			state.items = action.payload
		},
		deleteModalContent: (state) => {
			state.items = null
		},
	},
})

// Action creators are generated for each case reducer function
export const { addModalContent, deleteModalContent } = modalContentSlice.actions

export default modalContentSlice.reducer