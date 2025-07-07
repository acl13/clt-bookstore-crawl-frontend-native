import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchBookstores = createAsyncThunk("fetchBookstores", async () => {
  const response = await axios.get(`http://localhost:8000/bookstores`);
  return response.data;
});

// Define the type for slice's state
interface BookstoreDataState {
  isLoading: boolean;
  data: null | object;
  error: boolean;
}

// Define the initial state for slice
const initialState: BookstoreDataState = {
  isLoading: false,
  data: null,
  error: false,
};

export const bookstoreSlice = createSlice({
  name: "bookstores",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBookstores.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchBookstores.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchBookstores.rejected, (state) => {
      state.isLoading = false;
      state.error = true;
    });
  },
});

export default bookstoreSlice.reducer;
