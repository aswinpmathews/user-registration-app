import { createSlice } from "@reduxjs/toolkit";
import UserDetail from "../../types/User";
import { addUser } from "../thunks/addUser";
import { fetchUsers } from "../thunks/fetchUsers";

interface UserState{
    users:UserDetail[],
    isLoading:boolean,
    error:string|null;
}
const initialState:UserState={
    users:[],
    isLoading:false,
    error:null,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        },
 extraReducers: (builder) => {
        builder
            .addCase(addUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(addUser.fulfilled, (state, action) => {
                state.isLoading = false;
                // state.users.push(action.payload);  
            })
            .addCase(addUser.rejected, (state, action) => {
                state.isLoading = false;
                // state.error = action.error.message;
            })
            .addCase(fetchUsers.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.isLoading = false;
                state.users=action.payload;  
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.isLoading = false;
                // state.error = action.error.message;
            });
    },
});
export const usersReducer =userSlice.reducer
