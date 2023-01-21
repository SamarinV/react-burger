import { createSlice } from '@reduxjs/toolkit'
import { TypeIngredientsElem } from '../types/types'

export const ingredientsSlice = createSlice({
	name: 'ingredients',
	initialState: { items: [] },
	reducers: {
		getAllIngredients: (state, action) => {
			state.items = action.payload
		},
		increseCountIngredient: (state, action) => {
			//для булок
			if (action.payload.type === 'bun') {
				state.items.map(elem => {
					if (elem._id === action.payload._id) {
						elem.count = 2
					}
				})
				state.items.map(elem => {
					if (elem.type === 'bun' && elem._id !== action.payload._id) {
						elem.count = 0
					}
				})
			}
			//для остального
			else {
				state.items.map(elem => {
					if (elem._id === action.payload._id) {
						elem.count++
					}
				})
			}
		},
		decreseCountIngredient: (state, action) => {
			state.items = state.items.map(elem => {
				if (elem._id === action.payload) {
					elem.count--
				}
				return elem;
			})
		}
	},
})

// Action creators are generated for each case reducer function
export const { getAllIngredients, increseCountIngredient, decreseCountIngredient } = ingredientsSlice.actions

export default ingredientsSlice.reducer