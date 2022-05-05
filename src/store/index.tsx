import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {
	persistStore,
	persistReducer,
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from 'redux-persist';
import {positionsReducer} from './positionsReducer';
import {rerenderReducer} from './rerenderReducer';
import {categoryReducer} from './categoryReducer';
import storage from 'redux-persist/lib/storage';
import thunkMiddleware from 'redux-thunk'


const rootReducer = combineReducers({
		positions: positionsReducer,
		rerender: rerenderReducer,
		categories: categoryReducer
})

const persistConfig = {
	key: 'root',
	storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
	reducer: persistedReducer,
	middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware({
				thunk: true,
				serializableCheck: {
					ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
				},
			}),
})
export const persistor = persistStore(store);
export default store;