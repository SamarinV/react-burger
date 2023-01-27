import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TypeIngredientsElem } from '../types/types'

type ModalState = {
  item: null | TypeIngredientsElem,
}

const initialState: ModalState = {
		item: null,
}

export const modalContentSlice = createSlice({
	name: 'modalContent',
	initialState,
	reducers: {
		addModalContent: (state, action: PayloadAction<TypeIngredientsElem>) => {
			state.item = action.payload
		},
		deleteModalContent: (state) => {
			state.item = null
		},
	},
})

export const { addModalContent, deleteModalContent } = modalContentSlice.actions

export default modalContentSlice