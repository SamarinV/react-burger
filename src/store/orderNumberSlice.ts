import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { BASE_URL } from '../constants';
import { checkResponse } from '../utils/checkResponse';
import { resetConstructorIng } from './constructorSlice';

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
			const response = await fetch(`${BASE_URL}/orders`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ ingredients: ingredientsID }),
			}).then(checkResponse);
			dispatch(addOrder(response.order.number));
    	dispatch(resetConstructorIng());
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