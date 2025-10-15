import UserDetail from "../types/User";
import {
  Typography,
  Stack,
  Button,
  Modal,
  ModalDialog,
  DialogTitle,
  DialogContent,
} from "@mui/joy";
import ExpandablePanel from "./Expandable";
import { MdDelete } from "react-icons/md";
import { useState } from "react";
import { useAppDispatch } from "../hooks/custom";
import { removeUser } from "../store/thunks/userThunks";

function UsersListItem({ user,expanded,onExpand }:{ user: UserDetail;expanded:boolean;onExpand:()=>void }) {
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();
  const handleYesClick = async() => {
     await dispatch(removeUser(user))
      .unwrap()
      .then(() => {
        console.log(`Deleting user with id: ${user.id}`);
      })
      .catch((err:string) => {
        console.error(err)
      });
   
    setOpen(false);
  };

  const header = (
     <Stack direction="row" spacing={2} alignItems="center">
      <Typography level="h4">{user.name}</Typography>
      <Typography sx={{ ml: "auto" }}>Age: {user.age}</Typography>
    </Stack>
  );

  return (
      (<ExpandablePanel header={header} user={user} expanded={expanded} onExpand={onExpand}>
      <Stack direction="column" spacing={2}>
        <Typography>Email: {user.email}</Typography>
        <Typography>DOB: {user.dob}</Typography>
        <Typography>Address: {user.address}</Typography>
        <Typography>Occupation: {user.occupation}</Typography>
         <Stack
                direction="row"
                spacing={2}
                justifyContent={"flex-end"}
                mt={2}

              >
        <Button
          color="danger"
          startDecorator={<MdDelete />}
          onClick={() => setOpen(true)}

        >
          Delete
        </Button></Stack>
        <Modal open={open} onClose={() => setOpen(false)}>
          <ModalDialog>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogContent>
              Are you sure you want to delete {user.name}?
              <Stack
                direction="row"
                spacing={2}
                justifyContent="flex-end"
                mt={2}
              >
                  <Button onClick={() => setOpen(false)}>
                  No
                </Button>
                <Button color="danger" onClick={handleYesClick}>
                  Yes
                </Button>
              </Stack>
            </DialogContent>
          </ModalDialog>
        </Modal>
      </Stack>
    </ExpandablePanel>)
   ) 
  ;
}

export default UsersListItem;
