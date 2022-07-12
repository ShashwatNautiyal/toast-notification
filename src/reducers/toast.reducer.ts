import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ToastState {
	queue: {
		id: number;
		message: string;
		description?: string;
		timeout?: number;
		type?: "success" | "error" | "info";
		showClose?: boolean;
	}[];
}

const initialState: ToastState = {
	queue: [],
};

export const ToastSlice = createSlice({
	name: "toast",
	initialState,
	reducers: {
		toast: (
			state,
			action: PayloadAction<{
				message: string;
				description?: string;
				timeout?: number;
				showClose?: boolean;
				type?: "success" | "error" | "info";
			}>
		) => {
			const _queue = [...state.queue];
			_queue.unshift({
				id: _queue.length !== 0 ? _queue[0].id + 1 : 0,
				message: action.payload.message,
				type: action.payload.type,
				description: action.payload.description,
				timeout: action.payload.timeout,
				showClose: action.payload.showClose,
			});
			state.queue = [..._queue];
		},

		remove: (state, action: PayloadAction<number>) => {
			const _queue = [...state.queue];
			state.queue = [..._queue.filter((item) => item.id !== action.payload)];
		},
	},
});

export const { toast, remove } = ToastSlice.actions;

export default ToastSlice.reducer;
