import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import { persistReducer } from 'redux-persist'
import cart from './cartSlice.js'
import user from './userSlice.js'

const persistConfig = {
    key : 'root',
    storage : storage,
    whitelist : ['cart', 'user'],
    blacklist : [],
}

const reducer = combineReducers({
    cart : cart.reducer,
    user:  user.reducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
    reducer: persistedReducer,
})

export default store;