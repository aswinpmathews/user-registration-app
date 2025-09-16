import  UserForm  from "./components/UserForm"
import UserList from "./components/userList";
import { Routes,Route } from "react-router-dom";
import AgeGraph from "./components/Graph";
import AppLayout from "./components/AppLayout";

function App(){
  return(
  <AppLayout>
    <Routes>
      <Route path="/" element={<UserForm/>}/>
      <Route path="/users" element={<UserList/>}/>
      <Route path="/graph" element={<AgeGraph/>}/>
    </Routes>  

  </AppLayout>
  )
}
export default App;