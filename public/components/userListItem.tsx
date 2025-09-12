import { useEffect } from "react"
import { fetchUsers } from "../store/thunks/fetchUsers"
import { useThunk } from "../hooks/use-thunk"
import { useSelector, UseSelector } from "react-redux"
import UserDetail from "../types/User"
import { UserData } from "../types/UsersArr"
import { RootState } from "../store"

export default function UserListItem(){
    const [doFetchUsers,isLoadingUsers,loadingUsersError]=useThunk(fetchUsers)
    const data=useSelector((state:RootState)=>{
        return state.user.users as UserData
    })
    useEffect(()=>{
        doFetchUsers()
    },[doFetchUsers])
    let content=data.map((user:UserDetail)=>{
        return <div key={user.id} > 
        Name:{user.name} email:{user.email}
        </div>
    })
    
    
  
return (<div>{content}</div>)

}

    

