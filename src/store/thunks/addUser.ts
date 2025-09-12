import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import UserDetail from "../../types/User";
const addUser=createAsyncThunk('users/add',async(user: Omit<UserDetail, "id">)=>{
    const response=await axios.post('http://localhost:3005/users',user)
    return response.data;
})
export {addUser}
