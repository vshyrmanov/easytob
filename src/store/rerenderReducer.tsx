import {IRerenderState} from "../types/rerender";

const defaultState: IRerenderState = {
	categories: false,
	subcategories: false,
	positions: false,
}

const RERENDER_CATEGORY = 'RERENDER_CATEGORY';
const RERENDER_SUBCATEGORY = 'RERENDER_SUBCATEGORY';
const RERENDER_POSITION = 'RERENDER_POSITION';

export const rerenderReducer = (state = defaultState, action) => {
	switch (action.type) {
		case RERENDER_CATEGORY:
			return {...state, categories: action.payload};
		case RERENDER_SUBCATEGORY:
			return {...state, subcategories: action.payload};
		case RERENDER_POSITION:
			return {...state, positions: action.payload};
		default:
			return state;
	};
};

export const rerenderCategory = (payload) => ({type: RERENDER_CATEGORY, payload});
export const rerenderPosition = (payload) => ({type: RERENDER_POSITION, payload});
export const rerenderSubcategory = (payload) => ({type: RERENDER_SUBCATEGORY, payload});