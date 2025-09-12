import { useEffect } from "react"
import { fetchUsers } from "../store/thunks/fetchUsers"
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
        doFetchUsers()
    },[doFetchUsers])

    console.log('All USers:',users)

let content;
      if (isLoadingUsers) {
    content= (<div>
        <Skeleton variant="text" level="h2" /> 
        <Skeleton variant="text" level="h2" /> 
        <Skeleton variant="text" level="h2" /> 
        <Skeleton variant="text" level="h2" /> 
        <Skeleton variant="text" level="h2" /> 
        <Skeleton variant="text" level="h2" /> 

    </div> );
  } else if (loadingUsersError) {
   content= <div>Error fetching data...</div>;
  }else{
    content=users.map((user)=>{
        return <UserListItem key={user.id} user={user} />;
    })
  }
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
            {content}
        </div>
    );
}
   



    

