import React, { useState } from "react";
import { addUser } from '../store/thunks/addUser'
// import {  useDispatch } from "react-redux"; 
import UserDetail from "../types/User";
// import { addUser } from "../store/slice/UserSlice";
import { useThunk } from "../hooks/use-thunk";
import UserListItem from "./userListItem";
function UserForm(){
    const [doAddUser,isAddingUser,addUserError]=useThunk(addUser)

    // const dispatch=useDispatch()
    const [formData,setFormData]=useState<UserDetail >({
        name:'',
        email:'',
        age:0,
    })
    const handleChange=(event:React.ChangeEvent<HTMLInputElement>)=>{
        const {name,value}=event.target
        setFormData(prev=>({
            ...prev,
            [name]:value
        }))
 
    }


const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.name && formData.email && formData.age) {
        doAddUser(formData); // pass formData to your thunk
        setFormData({ name: '', email: '', age: 0 }); // reset
    } else {
        alert("Fill all fields");
    }
};      



return (
<div>
    <h1 className="items-center">User Details</h1>
    <div>
        <form onSubmit={handleSubmit} >
            <label>Name:</label>
            <input placeholder="Enter your Name" value={formData.name} name="name" type="name" onChange={handleChange}></input>
            <label>Email:</label>
            <input placeholder="Enter your Email" value={formData.email} name="email" type="email" onChange={handleChange}></input>
            <label>Age:</label>
            <input placeholder="Enter your age" value={formData.age} name="age" type="age" onChange={handleChange}></input>
            <button onClick={handleSubmit}>Proceed</button>
        </form>
    </div>
    <div className="bg-red-200">
        <UserListItem />
    </div>
</div>
)
}
export default UserForm;