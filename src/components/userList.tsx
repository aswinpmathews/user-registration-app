import { useEffect } from "react"
import { fetchUsers } from "../store/thunks/userThunks"
import { useThunk } from "../hooks/use-thunk"
import { useSelector} from "react-redux"
import UserListItem from "./UserListItem"
import { Skeleton, Button ,Typography, Box} from "@mui/joy"
import { useNavigate } from "react-router-dom"
import { selectUsers } from "../store/slice/UserSlice"


export default function UserList(){
    const [doFetchUsers,isLoadingUsers,loadingUsersError]=useThunk(fetchUsers)
    const users=useSelector(selectUsers)
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
        <Box sx={{display:"flex",flexDirection:"column",gap:"30px",padding:"20px",justifyContent:"space-between",alignContent:"center"}}>
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
   <Box>
            {Array.from({ length: 6 }).map((_, index) => (
                    <Skeleton key={index} variant="text" level="h2" sx={{ marginBottom: '16px' }} />
                ))}
            </Box>
) : loadingUsersError ? (
    <Box>Error fetching data...</Box>
) : (
    <Box>
        {users.map((user) => <UserListItem key={user.id} user={user} />)}
    </Box>
)}
        </Box>
    );
}
   



    

