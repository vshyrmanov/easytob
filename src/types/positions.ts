interface IName {
	name: string,
	language: string
}

export interface IPosition {
	_id: string,
	name: IName[],
	desc: string,
	price: number,
	image: string
}

export interface ICart {
	_id: string,
	name: string,
	desc: string,
	price: number
}

export interface IPositionState {
	positions: IPosition[],
	cart: ICart[],
	forward: string,
	hideButtons: boolean,
}