import { ICategoryState } from "../types/category";

const defaultState: ICategoryState = {
	currentCategoryId: "",
	currentSubcategoryId: {type: null, id: null},
	currentLanguage: 0,
	breadCrumb: [{title: "Home", path: "/home"}],
	currentTitle: "",
	role: "",
	userId: "",
	token: "",
	// cart: []
}

const CHANGE_CURRENT_CATEGORY_ID = 'CHANGE_CURRENT_CATEGORY_ID';
const CHANGE_CURRENT_SUBCATEGORY_ID = 'CHANGE_CURRENT_SUBCATEGORY_ID';
const CHANGE_CURRENT_LANGUAGE = 'CHANGE_CURRENT_LANGUAGE';
const ADD_BREADCRUMB = 'CHANGE_BREADCRUMB'
const REMOVE_BREADCRUMB = 'REMOVE_BREADCRUMB'
const CURRENT_TITLE = 'CURRENT_TITLE'
const ROLE = 'ROLE'
const USER_ID = 'USER_ID'
const TOKEN = 'TOKEN'
// const ADD_CART = 'ADD_CART'
// const REMOVE_CART = 'REMOVE_CART'


export const categoryReducer = (state = defaultState, action) => {
	switch(action.type) {
		case CHANGE_CURRENT_CATEGORY_ID:
			return {...state, currentCategoryId: action.payload};
		case CHANGE_CURRENT_SUBCATEGORY_ID:
			return {...state, currentSubcategoryId: action.payload};
		case CHANGE_CURRENT_LANGUAGE:
			return {...state, currentLanguage: action.payload};
		case ADD_BREADCRUMB:
			return {...state, breadCrumb: [...state.breadCrumb, action.payload]};
		case REMOVE_BREADCRUMB:
			return {...state, breadCrumb: action.payload};
		case CURRENT_TITLE:
			return {...state, currentTitle: action.payload};
		case ROLE:
			return {...state, role: action.payload};
		case USER_ID:
			return {...state, userId: action.payload};
		case TOKEN:
			return {...state, token: action.payload};
		// case ADD_CART:
		// 	return {...state, cart: [...state.cart, action.payload]};
		// case REMOVE_CART:
		// 	return {...state, cart: action.payload};
		default:
			return state;
	}
}

export const changeCurrentCategoryId = (payload) => ({type: CHANGE_CURRENT_CATEGORY_ID, payload});
export const changeCurrentSubcategoryId = (payload) => ({type: CHANGE_CURRENT_SUBCATEGORY_ID, payload});
export const changeCurrentLanguage = (payload) => ({type: CHANGE_CURRENT_LANGUAGE, payload});
export const addToBreadcrumb = (payload) => ({type: ADD_BREADCRUMB, payload});
export const removeFromBreadcrumb = (payload) => ({type: REMOVE_BREADCRUMB, payload});
export const currentTitle = (payload) => ({type: CURRENT_TITLE, payload});
export const changeRole = (payload) => ({type: ROLE, payload});
export const changeUserId = (payload) => ({type: USER_ID, payload});
export const changeToken = (payload) => ({type: TOKEN, payload});
// export const addToCart = (payload) => ({type: TOKEN, payload});
// export const removeFromCart = (payload) => ({type: REMOVE_CART, payload});











