import { createSlice } from "@reduxjs/toolkit";
import UserDetail from "../../types/User";
import { addUser, fetchUsers } from "../thunks/userThunks";
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
 
            })
            .addCase(addUser.rejected, (state, action) => {
                state.isLoading = false;
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
            });
    },
});
export const usersReducer =userSlice.reducer
