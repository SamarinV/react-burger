import { configureStore } from '@reduxjs/toolkit';
import constructorSlice from './constructorSlice';
import ingredientsSlice from './ingredientsSlice';
import modalContentSlice from './modalContentSlice';
import orderNumberSlice from './orderNumberSlice';

export const store = configureStore({
  reducer: {
    construtorIng: constructorSlice.reducer,
		ingredients: ingredientsSlice.reducer,
		modalContent: modalContentSlice.reducer,
		order: orderNumberSlice.reducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch