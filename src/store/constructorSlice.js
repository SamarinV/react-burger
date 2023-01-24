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
		updateConstructor: (state, action) => {
			state.items = action.payload
		},
		replaceIngredient: (state, action) => {
			// state.items.splice(action.payload.hoverIndex, 0, state.items.splice(action.payload.dragIndex, 1)[0]);
		},
	},
})

// Action creators are generated for each case reducer function
export const { addIngInConstructor, updateConstructor, replaceIngredient } = constructorSlice.actions

export default constructorSlice.reducer

