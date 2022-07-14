import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "../reducers/theme.reducer";
import toastReducer from "../reducers/toast.reducer";

const store = configureStore({
	reducer: {
		queue: toastReducer,
		theme: themeReducer,
	},
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
