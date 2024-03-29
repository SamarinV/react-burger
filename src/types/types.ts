export type TypeIngredientsElem = {
		_id: string,
		name: string,
		type: string,
		proteins?: number,
		fat?: number,
		carbohydrates?: number,
		calories?: number,
		price: number,
		image?: string,
		image_mobile?: string,
		image_large?: string,
		__v?: number,
		count: number | 0,
		key_uuid?: string,
}

export type TypeConstructorElem = {
		_id: string,
		id_for_key?: string,
		type?: "top" | "bottom",
		isLocked?: boolean,
		text: string,
		price: number,
		thumbnail: string,
}