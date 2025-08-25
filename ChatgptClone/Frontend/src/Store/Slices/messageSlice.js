import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../utils/api";

export const fetchMessages = createAsyncThunk(
  "message/fetchMessages",
  async (chatId, { rejectWithValue }) => {
    try {
      const res = await api.get(`/chat/${chatId}/messages`);
      return { chatId, messages: res.data };
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// messages are primarily delivered/created via socket events
const messageSlice = createSlice({
  name: "message",
  initialState: {
    byChat: {}, // { chatId: [messages...] }
    status: "idle",
    error: null,
  },
  reducers: {
    addMessage(state, action) {
      const { chatId, message } = action.payload;
      if (!state.byChat[chatId]) state.byChat[chatId] = [];
      state.byChat[chatId].push(message);
    },
    setMessages(state, action) {
      const { chatId, messages } = action.payload;
      state.byChat[chatId] = messages;
    },
    clearMessages(state) {
      state.byChat = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessages.pending, (s) => {
        s.status = "loading";
      })
      .addCase(fetchMessages.fulfilled, (s, a) => {
        s.status = "succeeded";
        s.byChat[a.payload.chatId] = a.payload.messages;
      })
      .addCase(fetchMessages.rejected, (s, a) => {
        s.status = "failed";
        s.error = a.payload;
      });
  },
});

export const { addMessage, setMessages, clearMessages } = messageSlice.actions;
export default messageSlice.reducer;
