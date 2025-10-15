import { createSlice } from "@reduxjs/toolkit";
import UserDetail from "../../types/User";
import {
  addUser,
  fetchUsers,
  removeUser,
  editUser,
} from "../thunks/userThunks";

import { RootState } from "../store";

interface UserState {
  users: UserDetail[];
  isLoading: boolean;
}
const initialState: UserState = {
  users: [],
  isLoading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users.push(action.payload);
      })
      .addCase(addUser.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        return {
          ...state,
          isLoading: false,
          users: action.payload,
        };
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(removeUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(removeUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = state.users.filter(
          (user) => user.id !== action.payload.id
        );
      })
      .addCase(removeUser.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(editUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editUser.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.users.findIndex(
          (user) => user.id === action.payload.id
        );
        if (index !== -1) {
          state.users[index] = action.payload;
        }
      })
      .addCase(editUser.rejected, (state, action) => {
        state.isLoading = false;
      });
  },
});
export const usersReducer = userSlice.reducer;
export const selectUsers = (state: RootState) => state.user.users;
export const selectIsLoading = (state: RootState) => state.user.isLoading;
