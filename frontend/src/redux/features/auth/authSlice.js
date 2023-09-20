import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const initialState = {
	token: null,
	needsPasswordChange: true,
	user: null,
};

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setAuth: (state, action) => {
			localStorage.setItem(
				"auth",
				JSON.stringify({
					token: action.payload.accessToken,
					needsPasswordChange: action.payload.needsPasswordChange,
				})
			);
			state.token = action.payload.accessToken;
			state.needsPasswordChange = action.payload.needsPasswordChange;
		},
		logout: (state) => {
			state.token = null;
			toast.success("Successfully logged out");
		},
	},
});

export const { setAuth, logout } = authSlice.actions;

export default authSlice.reducer;
