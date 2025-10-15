import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import UserDetail from "../../types/User";
import { AxiosResponse } from "axios";

// const addUser = createAsyncThunk<
//   UserDetail,
//   Omit<UserDetail, "id">,
//   { rejectValue: string }
// >("users/add", async (user: Omit<UserDetail, "id">, thunkAPI) => {
//   try {
//     const response: AxiosResponse = await axios.post(
//       "http://localhost:3005/users",
//       user
//     );
//     return response.data;
//   } catch (error) {
//     if (axios.isAxiosError(error)) {
//       return thunkAPI.rejectWithValue(error.response?.data?.message)||"An unknown error occurred while adding user";
//     } 
//   }});

const addUser = createAsyncThunk<
  UserDetail,
  UserDetail,
  
  { rejectValue: string }
>("users/add", async (user: Omit<UserDetail, "id">, thunkAPI) => {
  try {
    const response: AxiosResponse = await axios.post(
      "http://localhost:3005/users",
      user
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return thunkAPI.rejectWithValue(error.response?.data?.message)||"An unknown error occurred while adding user";
    } 
  }});


const fetchUsers = createAsyncThunk<
  UserDetail[],
  void,
  { rejectValue: string }
>("users/fetch", async (_, thunkAPI) => {
  try {
    const response: AxiosResponse = await axios.get(
      "http://localhost:3005/users"
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return thunkAPI.rejectWithValue(error.response?.data?.message) || "An unknown error occurred while fetching users";
    } 
  }
});
const removeUser = createAsyncThunk<
  UserDetail,
  UserDetail,
  { rejectValue: string }
>("users/remove", async (user, thunkAPI)=> {
  try {
    await axios.delete(`http://localhost:3005/users/${user.id}`);
    return user;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return thunkAPI.rejectWithValue(error.response?.data?.message) 
    }
  else{
    return thunkAPI.rejectWithValue("An unknown error occurred while deleting user");
  }
  }
});

const editUser = createAsyncThunk<
  UserDetail,
  UserDetail,
  { rejectValue: string }
>("users/edit", async (user, thunkAPI) => {
  try {
    const response: AxiosResponse = await axios.put(
      `http://localhost:3005/users/${user.id}`,
      user
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return thunkAPI.rejectWithValue(error.response?.data?.message) || 'An unknown error occurred while editing users';
    } 
  }
});

export { fetchUsers, addUser, removeUser, editUser };
