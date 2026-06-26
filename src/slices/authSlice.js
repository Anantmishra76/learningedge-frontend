/**
 * Auth slice for managing authentication state
 */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  signupData: null,
  loading: false,
  token: (() => {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) return null;
    try {
      return JSON.parse(storedToken);
    } catch {
      return storedToken;
    }
  })(),
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    /**
     * Sets the signup data in the state
     * @param {Object} state - Current state
     * @param {Object} value - Action payload containing signup data
     */
    setSignupData(state, value) {
      state.signupData = value.payload;
    },
    /**
     * Sets the loading state
     * @param {Object} state - Current state
     * @param {Object} value - Action payload containing loading boolean
     */
    setLoading(state, value) {
      state.loading = value.payload;
    },
    /**
     * Sets the authentication token
     * @param {Object} state - Current state
     * @param {Object} value - Action payload containing token
     */
    setToken(state, value) {
      state.token = value.payload;
    },
  },
});

export const { setSignupData, setLoading, setToken } = authSlice.actions;

export default authSlice.reducer;
