const defaultState = {
	positions: [],
	cart: [],
}

const ADD_CART = 'ADD_CART';
const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
const GET_POSITIONS = 'GET_POSITIONS';

export const positionsReducer = (state = defaultState, action) => {
	switch(action.type) {
		case ADD_CART:
			return {...state, cart: [...state.cart, action.payload]};
		case REMOVE_FROM_CART:
			return {...state, cart: state.cart.filter(e => e._id !== action.payload)};
		case GET_POSITIONS:
			return {...state, positions: [...action.payload]};
		default:
			return state;
	}
}

export const addToCart = (payload) => ({type: ADD_CART, payload})
export const removeFromCart = (payload) => ({type: REMOVE_FROM_CART, payload})
export const getAllPositions = (payload) => ({type: GET_POSITIONS, payload})


