import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { UserData } from "../../types/UsersArr";
const fetchUsers=createAsyncThunk<UserData>('users/fetch',async()=>{
    const response=await axios.get('http://localhost:3005/users');
    return response.data
})
export {fetchUsers}