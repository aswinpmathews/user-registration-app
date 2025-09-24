import { useEffect } from "react";
import { fetchUsers } from "../store/thunks/userThunks";
import UserListItem from "./UserListItem";
import { Skeleton, Button, Typography, Box } from "@mui/joy";
import { useNavigate } from "react-router-dom";
import { selectUsers, selectIsLoading } from "../store/slice/userSlice";
import { useAppDispatch, useAppSelector } from "../Custom/custom";
import { Boxsx, Titlesx } from "../style/ListStyle";
import { useState } from "react";
import { IoMdAdd } from "react-icons/io";

export default function UserList() {
  const dispatch = useAppDispatch();
  const isLoadingUsers = useAppSelector(selectIsLoading);
  const [loadError, setLoadError] = useState<string | null>(null);

  const users = useAppSelector(selectUsers);

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchUsers())
      .unwrap()
      .catch((err: string) => {
        setLoadError(err);
        console.error(err);
      });
  }, [dispatch]);

  return (
    <Box sx={Boxsx}>
      <Typography level="h2" component="h1" sx={Titlesx}>
       USERS LIST
      </Typography>
      <Box
        flexDirection={"row"}
        display="flex"
        gap={2}
        mb={2}
        justifyContent={"space-between"}
      >
        <Button startDecorator={<IoMdAdd/>}  onClick={() => navigate("/add")}>Add User</Button>
        <Button onClick={() => navigate("/graph")}>Show Graphs</Button>
      </Box>

      {isLoadingUsers ? (
        <Box>
          {Array.from({ length: 6 }).map((_, index) => (
            <Skeleton
              key={index}
              variant="text"
              level="h2"
              sx={{ marginBottom: "16px" }}
            />
          ))}
        </Box>
      ) : loadError ? (
        <Box>Error fetching data...</Box>
      ) : (
        <Box>
          {users.map((user) => (
            <UserListItem key={user.id} user={user} />
          ))}
        </Box>
      )}
    </Box>
  );
}
