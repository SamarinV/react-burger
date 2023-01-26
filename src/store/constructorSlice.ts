import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TypeIngredientsElem } from '../types/types'

type ConstructorState = {
  items: TypeIngredientsElem[]
}

const initialState: ConstructorState = {
		items: []
}

export const constructorSlice = createSlice({
	name: 'constructor',
	initialState,
	reducers: {
		addIngInConstructor: (state, action: PayloadAction<TypeIngredientsElem>) => {
			state.items.push(action.payload)
		},
		updateConstructor: (state, action: PayloadAction<TypeIngredientsElem[]>) => {
			state.items = action.payload
		},
		resetConstructorIng: (state) => {
			state.items = []
		}
	},
})

// Action creators are generated for each case reducer function
export const { addIngInConstructor, updateConstructor, resetConstructorIng } = constructorSlice.actions

export default constructorSlice

