import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BASE_URL } from "../constants";
import { TypeIngredientsElem } from "../types/types";
import { checkResponse } from "../utils/checkResponse";

type IngredientsState = {
  items: TypeIngredientsElem[] | [],
	status: null | 'loading' | 'resolved' | 'rejected',
	error: any,
}

const initialState: IngredientsState = {
		items: [],
		status: null,
		error: null,
}

export const fetchAllIngredients = createAsyncThunk(
	"ingredients/fetchAllIngredients",
	async function (_, {rejectWithValue}) {
		try {
			const {data} = await fetch(`${BASE_URL}/ingredients`).then(checkResponse);
			const ingredientsWithCount = data.map((elem: TypeIngredientsElem) => {
				elem.count = 0;
				return elem;
			});
			return ingredientsWithCount;
		} catch (error: any) {
			return rejectWithValue(error.message)
		}
	}
);

export const ingredientsSlice = createSlice({
	name: "ingredients",
	initialState,
	reducers: {
		increseCountIngredient: (state, action: PayloadAction<TypeIngredientsElem>) => {
			//для булок
			if (action.payload.type === "bun") {
				state.items.map((elem: TypeIngredientsElem) => {
					if (elem._id === action.payload._id) {
						elem.count = 2;
					}
				});
				state.items.map((elem: TypeIngredientsElem) => {
					if (elem.type === "bun" && elem._id !== action.payload._id) {
						elem.count = 0;
					}
				});
			}
			//для остального
			else {
				state.items.map((elem: TypeIngredientsElem) => {
					if (elem._id === action.payload._id) {
						elem.count++;
					}
				});
			}
		},
		decreseCountIngredient: (state, action: PayloadAction<string>) => {
			state.items.map((elem: TypeIngredientsElem) => {
				if (elem._id === action.payload) {
					elem.count--;
				}
			});
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchAllIngredients.pending, (state) => {
				state.status = "loading";
				state.error = null;
			})
			.addCase(fetchAllIngredients.fulfilled, (state, action: any) => {
				state.items = action.payload;
				state.status = "resolved";
			})
			.addCase(fetchAllIngredients.rejected, (state, action) => {
				state.status = "rejected";
				state.error = action.payload;
			});
	},
});

export const { increseCountIngredient, decreseCountIngredient } =
	ingredientsSlice.actions;

export default ingredientsSlice;
