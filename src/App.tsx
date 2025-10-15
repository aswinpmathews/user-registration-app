import  UserForm  from "./components/UserForm"
import UserList from "./components/UserList";
import { Routes,Route } from "react-router-dom";
import Graph from "./components/Graph";
import AppLayout from "./components/AppLayout";

function App(){
  return(
  <AppLayout>
    <Routes>
      <Route path="/" element={<UserList/>}/>
      <Route path="/add" element={<UserForm/>}/>
      <Route path="/graph" element={<Graph/>}/>
    </Routes>  

  </AppLayout>
  )
}
export default App;