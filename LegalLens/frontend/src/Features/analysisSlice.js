import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../utils/axios";

export const analyzeText = createAsyncThunk("analysis/text", async (text) => {
  const res = await api.post("/analysis/from-text", { text });
  return res.data;
});

export const analyzeFile = createAsyncThunk("analysis/file", async (fileId) => {
  const res = await api.post(`/analysis/from-file/${fileId}`);
  return res.data;
});

export const listAnalyses = createAsyncThunk("analysis/list", async () => {
  const res = await api.get("/analysis");
  return res.data;
});

export const getAnalysis = createAsyncThunk("analysis/get", async (id) => {
  const res = await api.get(`/analysis/${id}`);
  return res.data;
});

export const deleteAnalysis = createAsyncThunk(
  "analysis/delete",
  async (id) => {
    const res = await api.delete(`/analysis/${id}`);
    return res.data.id;
  }
);
const slice = createSlice({
  name: "analysis",
  initialState: { items: [], current: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(listAnalyses.fulfilled, (state, action) => {
        state.items = action.payload;
      })
      .addCase(analyzeText.fulfilled, (state, action) =>
        state.items.unshift(action.payload)
      )
      .addCase(analyzeFile.fulfilled, (state, action) =>
        state.items.unshift(action.payload)
      )
      .addCase(getAnalysis.fulfilled, (state, action) => {
        state.current = action.payload;
      })
      .addCase(deleteAnalysis.fulfilled, (state, action) => {
        state.items = state.items.filter(a => a._id !== action.payload)
        if (state.current && state.current._id === action.payload) state.current = null
      })
  },
});

export default slice.reducer;
