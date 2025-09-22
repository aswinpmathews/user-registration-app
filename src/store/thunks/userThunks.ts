import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import UserDetail from "../../types/User";
import { AxiosResponse } from "axios";

const addUser=createAsyncThunk<UserDetail, Omit<UserDetail, "id">,{rejectValue:string}>('users/add',async(user: Omit<UserDetail, "id">,thunkAPI)=>{
    try{
    const response:AxiosResponse= await axios.post('http://localhost:3005/users',user)
    return response.data
    }catch(error){
        if(axios.isAxiosError(error)){
            return thunkAPI.rejectWithValue(error.response?.data?.message || " Unknown Error Occured While Adding User")
        }
    }
})

const fetchUsers=createAsyncThunk<UserDetail[],void,{rejectValue:string}>('users/fetch',async(_,thunkAPI)=>{
   try{
    const response:AxiosResponse=await axios.get('http://localhost:3005/users');
    return response.data
    }catch(error){
        if(axios.isAxiosError(error)){
            return thunkAPI.rejectWithValue(error.response?.data?.message ||" Unknown Error Occured While Fetching User")
        }
    }
})
export {fetchUsers, addUser}








