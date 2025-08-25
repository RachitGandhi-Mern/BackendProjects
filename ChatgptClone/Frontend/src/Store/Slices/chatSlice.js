import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";

export const fetchChats = createAsyncThunk(
  "chat/fetchChats",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/chat");
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const createChat = createAsyncThunk(
  "chat/createChat",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await api.post("/chat", payload);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    chats: [],
    currentChat: null,
    status: "idle",
    error: null,
  },
  reducers: {
    setCurrentChat(state, action) {
      state.currentChat = action.payload;
    },
    addChat(state, action) {
      state.chats.unshift(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChats.pending, (s) => {
        s.status = "loading";
      })
      .addCase(fetchChats.fulfilled, (s, a) => {
        s.status = "succeeded";
        s.chats = a.payload;
      })
      .addCase(fetchChats.rejected, (s, a) => {
        s.status = "failed";
        s.error = a.payload;
      })
      .addCase(createChat.fulfilled, (s, a) => {
        s.chats.unshift(a.payload);
        s.currentChat = a.payload;
      });
  },
});

export const { setCurrentChat, addChat } = chatSlice.actions;
export default chatSlice.reducer;
