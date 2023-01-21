import { createSlice } from '@reduxjs/toolkit'
import { TypeConstructorElem, TypeIngredientsElem } from '../types/types'

const initialState = {
	items: [],
}

export const constructorSlice = createSlice({
	name: 'constructor',
	initialState,
	reducers: {
		addIngInConstructor: (state, action) => {
			state.items.push(action.payload)
		},
		updateConstructorItems: (state, action) => {
			state.items = action.payload
		},
	},
})

// Action creators are generated for each case reducer function
export const { addIngInConstructor, updateConstructorItems } = constructorSlice.actions

export default constructorSlice.reducer

