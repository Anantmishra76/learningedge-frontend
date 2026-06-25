/**
 * Profile slice for managing user profile state
 */
import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    // Initialize user from localStorage to persist login state across page refreshes
    user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
    loading: false,
};

const profileSlice = createSlice({
    name: "profile",
    initialState: initialState,
    reducers: {
        /**
         * Sets the user data in the state
         * @param {Object} state - Current state
         * @param {Object} value - Action payload containing user data
         */
        setUser(state, value) {
            state.user = value.payload;
        },
        /**
         * Sets the loading state
         * @param {Object} state - Current state
         * @param {Object} value - Action payload containing loading boolean
         */
        setLoading(state, value) {
            state.loading = value.payload
        }
    },
});

export const { setUser, setLoading } = profileSlice.actions;
export default profileSlice.reducer;