import { combineReducers, applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import storeReducer from "../reducers/storeReducer";
import ProductReducer from "../reducers/productReducer";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
const middleware = [thunk];
const Reducer = combineReducers({
  store: storeReducer,
  product: ProductReducer
});
const persistConfig = {
  key: "root",
  storage
};
const persistedReducer = persistReducer(persistConfig, Reducer);
export const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(...middleware))
);
export const persistor = persistStore(store);
