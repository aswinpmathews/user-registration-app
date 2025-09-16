import { useEffect } from "react"
import { fetchUsers } from "../store/thunks/userThunks"
import { useThunk } from "../hooks/use-thunk"
import { useSelector} from "react-redux"
import { RootState } from "../store"
import UserListItem from "./UserListItem"
import { Skeleton, Button ,Typography} from "@mui/joy"
import { useNavigate } from "react-router-dom"


export default function UserList(){
    const [doFetchUsers,isLoadingUsers,loadingUsersError]=useThunk(fetchUsers)
    const users=useSelector((state:RootState)=>state.user.users)
    const navigate=useNavigate()
    useEffect(()=>{
        const loadUsers=async()=>{
        try{
            await doFetchUsers()
        }catch(err){
            console.log(err)
        }
        
        }
        loadUsers()
    },[doFetchUsers])

    console.log('All USers:',users)

    return (
        <div style={{display:"flex",flexDirection:"column",gap:"30px",padding:"20px",justifyContent:"space-between",alignContent:"center"}}>
           <Typography level="h2" component="h1"
      sx={{
        justifyContent: 'center',
        display: 'flex',
        mb: 4,
        fontSize: '2rem',
        fontWeight: 'bold',
        fontFamily: 'noto-sans',
      }}>
   Registered Users List
  </Typography>
            
            <Button onClick={()=>navigate('/graph')}>
                View Age Graph
            </Button>
          {isLoadingUsers ? (
    <div>
        <Skeleton variant="text" level="h2" /> 
        <Skeleton variant="text" level="h2" /> 
        <Skeleton variant="text" level="h2" /> 
        <Skeleton variant="text" level="h2" /> 
        <Skeleton variant="text" level="h2" /> 
        <Skeleton variant="text" level="h2" />
    </div>
) : loadingUsersError ? (
    <div>Error fetching data...</div>
) : (
    <div>
        {users.map((user) => <UserListItem key={user.id} user={user} />)}
    </div>
)}
        </div>
    );
}
   



    

