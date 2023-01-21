import { configureStore } from '@reduxjs/toolkit';
import constructorReducer from './constructorSlice';
import ingredientsReducer from './ingredientsSlice';
import modalContentReducer from './modalContentSlice';
import orderNumberReducer from './orderNumberSlice';

export const store = configureStore({
  reducer: {
    construtorIng: constructorReducer,
		ingredients: ingredientsReducer,
		modalContent: modalContentReducer,
		orderNumber: orderNumberReducer,
  },
})

