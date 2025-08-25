// authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";

// ✅ check auth thunk
export const checkAuth = createAsyncThunk(
  "auth/check",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/auth/check"); // cookie automatically bheja jayega
      return res.data; // { user: {...} }
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);


export const registerUser = createAsyncThunk("auth/register", async (payload, { rejectWithValue }) => {
  try {
    const res = await api.post("/auth/register", payload, { withCredentials: true });
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data || err.message);
  }
});

export const loginUser = createAsyncThunk("auth/login", async (payload, { rejectWithValue }) => {
  try {
    const res = await api.post("/auth/login", payload, { withCredentials: true });
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data || err.message);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    status: "idle",
    error: null,
    isAuthenticated: false,
  },
  reducers: {
    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // register
      .addCase(registerUser.fulfilled, (s) => {
        s.isAuthenticated = true;
      })
      // login
      .addCase(loginUser.fulfilled, (s, a) => {
        s.isAuthenticated = true;
        s.user = a.payload.user || null;
      })
      // check auth
      .addCase(checkAuth.fulfilled, (s, a) => {
        s.isAuthenticated = true;
        s.user = a.payload.user;
      })
      .addCase(checkAuth.rejected, (s) => {
        s.isAuthenticated = false;
        s.user = null;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
