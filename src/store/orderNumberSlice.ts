import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { API_ORDER } from '../constants';

type OrderNumberState = {
  orderNumber: null | number,
	status: null | 'loading' | 'resolved' | 'rejected',
	error: any,
}

const initialState: OrderNumberState = {
		orderNumber: null,
		status: null,
		error: null,
}

export const fetchOrder = createAsyncThunk(
	"ingredients/fetchOrder",
	async (ingredientsID: string[],  {rejectWithValue, dispatch}) => {
		try {
			const response = await fetch(API_ORDER, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ ingredients: ingredientsID }),
			});
			if (!response.ok) {
				throw new Error('Ошибка сервера')
			}
			const data = await response.json()
			dispatch(addOrder(data.order.number));
			
		} catch (error: any) {
			return rejectWithValue(error.message)
		}
	}
);

export const orderNumberSlice = createSlice({
	name: 'orderNumber',
	initialState,
	reducers: {
		addOrder: (state, action: PayloadAction<number>) => {
			state.orderNumber = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchOrder.pending, (state) => {
				state.status = "loading";
				state.error = null;
			})
			.addCase(fetchOrder.fulfilled, (state) => {
				state.status = 'resolved';
			})
			.addCase(fetchOrder.rejected, (state, action) => {
				state.status = "rejected";
				state.error = action.payload
			});
	},
})

export const { addOrder } = orderNumberSlice.actions

export default orderNumberSlice