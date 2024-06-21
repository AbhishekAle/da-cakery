import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authSlice from "../features/authSlice";
import persistStore from "redux-persist/es/persistStore";
import productSlice from "../features/productSlice";
import cartSlice from "../features/cartSlice";
import orderSlice from "../features/orderSlice";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const reducer = combineReducers({
  auth: authSlice,
  product: productSlice,
  cart: cartSlice,
  order: orderSlice,
});

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
