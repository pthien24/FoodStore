// import { configureStore, Store } from "@reduxjs/toolkit";
// import { cartReducer } from "./reducers/carSlice";
// import { persistStore, persistReducer } from "redux-persist";
// import storage from "redux-persist/lib/storage";
// import {
//   FLUSH,
//   REHYDRATE,
//   PAUSE,
//   PERSIST,
//   PURGE,
//   REGISTER,
// } from "redux-persist";
// export type RootState = ReturnType<typeof cartReducer>;
// const persistConfig = {
//   key: "root",
//   storage,
// };
// const persistedReducer = persistReducer(persistConfig, cartReducer);
// export const store: Store<RootState> = configureStore({
//   reducer: persistedReducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: {
//         ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//       },
//     }),
// });
// export const persistor = persistStore(store);

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authSlice";
import { cartReducer } from "./reducers/carSlice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";
import {
  createStateSyncMiddleware,
  initMessageListener,
} from "redux-state-sync";

const autPersistConfig = { key: "auth", storage };
const cartPersistConfig = { key: "cart", storage };
const rootReducer = combineReducers({
  auth: persistReducer(autPersistConfig, authReducer),
  cart: persistReducer(cartPersistConfig, cartReducer),
});

const syncConfig = {
  blacklist: ["persist/PERSIST"],
};

const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk, createStateSyncMiddleware(syncConfig)],
});
initMessageListener(store);

export type RootState = ReturnType<typeof store.getState>;
export default store;
export const persistor = persistStore(store);
