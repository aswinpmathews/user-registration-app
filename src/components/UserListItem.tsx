import UserDetail from "../types/User";
import {  Typography,  Stack } from "@mui/joy";
import ExpandablePanel from "./Expandable";
function UsersListItem({ user }: { user: UserDetail }) {


  const header = <Stack direction="row" spacing={2} alignItems="center" >
       <Typography level="h4">{user.name}</Typography>
       <Typography  sx={{ ml: "auto" }}>
         Age: {user.age}
        </Typography>
      </Stack>

  return (
    <ExpandablePanel header={header}>
      <Stack direction="column" spacing={2}  >
         <Typography >Email: {user.email}</Typography>
         <Typography >DOB: {user.dob}</Typography>
         <Typography >Address: {user.address}</Typography>
         <Typography >Occupation: {user.occupation}</Typography>
         </Stack>
    </ExpandablePanel>
  );
}

export default UsersListItem;
