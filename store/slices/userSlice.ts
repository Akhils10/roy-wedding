import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
	username?: string;
	token?: string;
	id?: string;
	isAuthenticated?: boolean;
	roles?: string[]
}

const initialState: User = {
	username: "",
	token: "",
	id: "",
	isAuthenticated: false,
};

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		updateUser: (state, action: PayloadAction<User>) => {
			Object.assign(state, action.payload);
		},
		clearUser: state => initialState,
	},
});

export default userSlice.reducer;
export const { updateUser, clearUser } = userSlice.actions;