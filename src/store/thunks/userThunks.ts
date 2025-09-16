import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import UserDetail from "../../types/User";
import { AxiosResponse } from "axios";
const addUser=createAsyncThunk('users/add',async(user: Omit<UserDetail, "id">)=>{
    const response:AxiosResponse=await axios.post('http://localhost:3005/users',user)
    return response.data;
})

const fetchUsers=createAsyncThunk<UserDetail[]>('users/fetch',async()=>{
    const response:AxiosResponse=await axios.get('http://localhost:3005/users');
    return response.data
})
export {fetchUsers, addUser}



