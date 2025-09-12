import  UserForm  from "./components/UserForm"
import { CssVarsProvider } from '@mui/joy/styles';
import Sheet from '@mui/joy/Sheet';
import UserList from "./components/userList";
import { Routes,Route } from "react-router-dom";
import AgeGraph from "./components/AgeGraph";

function App(){
  return(
    <CssVarsProvider>
    <Sheet
    sx={{
    width: 1000,
    mx: 'auto', 
    my: 4, 
    py: 3, 
    px: 2, 
    display: 'flex',
    flexDirection: 'column',
    gap: 6,
    borderRadius: 'sm',
    boxShadow: 'md',
  }}>
    <Routes>
      <Route path="/" element={<UserForm/>}/>
      <Route path="/users" element={<UserList/>}/>
      <Route path="/graph" element={<AgeGraph/>}/>
    </Routes>  
    </Sheet>
    </CssVarsProvider>
  )
}
export default App;