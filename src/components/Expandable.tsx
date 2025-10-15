import UserDetail from "../types/User";
import { Box, Stack, Card } from "@mui/joy";
import { Divider, Button } from "@mui/joy";
import Avatar from "@mui/joy/Avatar";
import { GrEdit } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import { FaAngleLeft, FaAngleDown } from "react-icons/fa";

type ExpandablePanelProps = {
  header: React.ReactNode;
  user: UserDetail;
  children: React.ReactNode;
  expanded: boolean;
  onExpand: () => void;
};

function ExpandablePanel({
  header,
  user,
  children,
  expanded,
  onExpand,
}: ExpandablePanelProps) {
  const navigate = useNavigate();
  return (
    <Card variant="outlined" sx={{ mb: 2, p: 2 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Box display="flex" alignItems="center" gap={2}>
          <Avatar />
          {header}
        </Box>
        <Box
          display="flex"
          alignItems="center"
          fontSize="1.2rem"
          fontWeight="bold"
        >
          <Button
            variant="plain"
            color="neutral"
            startDecorator={<GrEdit />}
            onClick={() => navigate("/add", { state: { user } })}
          ></Button>
          <Button
            color="neutral"
            onClick={onExpand}
            variant="plain"
            startDecorator={expanded ? <FaAngleDown /> : <FaAngleLeft />}
          ></Button>
        </Box>
      </Stack>
      {expanded && (
        <>
          <Divider sx={{ my: 1 }} />
          <Box>{children}</Box>
        </>
      )}
    </Card>
  );
}

export default ExpandablePanel;
