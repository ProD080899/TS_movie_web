import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import cartmovieReducer from "../compoments/Home/CartMovieSlice";
import counterReducer from "../features/counter/counterSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    cartmovie: cartmovieReducer,
  },
});
// store.subscribe(() => {
//   // localStorage.setItem("reduxState", JSON.stringify(store.getState()));
//   window.localStorage.setItem("reduxState", JSON.stringify(store.getState()));
// });
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
