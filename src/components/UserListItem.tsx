import UserDetail from "../types/User";
import { Card, Typography, Divider, Stack } from "@mui/joy";

export default function UserListItem({ user }: { user: UserDetail }) {
  return (
    <Card variant="outlined"  sx={{ mb: 2, p: 2 }}>
      <Stack direction="row" spacing={2} alignItems="center">
        <Typography level="h4">{user.name}</Typography>
        <Typography  sx={{ ml: "auto" }}>
          Age: {user.age}
        </Typography>
      </Stack>
      <Divider sx={{ my: 1 }} />
      <Typography >Email: {user.email}</Typography>
      <Typography >DOB: {user.dob}</Typography>
      <Typography >Address: {user.address}</Typography>
      <Typography >Occupation: {user.occupation}</Typography>
    </Card>
  );
}
