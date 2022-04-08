const defaultState = {
	stores: [],
	currentStore: ''
}

export const reducer = (state = defaultState, action) => {
	switch(action.type) {
		case 'ADD_STORES':
			return {...state, stores: action.payload};
		case 'SET_STORE':
			return {...state, currentStore: action.payload};
		default:
			return state;
	}
}

