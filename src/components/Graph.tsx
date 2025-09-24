import { Typography, Stack, Box, Checkbox, Button } from "@mui/joy";
import { useEffect, useState } from "react";
import { fetchUsers } from "../store/thunks/userThunks";
import { useMemo } from "react";
import { titleStyle, COLORS } from "../style/Graphstyle";
import { selectUsers } from "../store/slice/userSlice";
import { useAppDispatch, useAppSelector } from "../Custom/custom";
import { useNavigate } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { IoHome } from "react-icons/io5";

export default function Graph() {
  const [selectedGraph, setSelectedGraph] = useState<"age" | "occupation">(
    "age"
  );

  const navigate = useNavigate();

  const users = useAppSelector(selectUsers);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!users || users.length === 0) {
      dispatch(fetchUsers()).catch((err) => {
        console.log(err);
      });
    }
  }, [dispatch, users]);

  const data = useMemo(() => {
    const counts = users.reduce<Record<string, number>>((acc, user) => {
      const key = user[selectedGraph];
      if (key != null && key !== "") {
        acc[key] = (acc[key] || 0) + 1;
      }
      return acc;
    }, {});
    return Object.entries(counts)
      .map(([label, count]) => ({ label, count }))
      .sort((a, b) => {
        if (selectedGraph === "age") {
          return Number(a.label) - Number(b.label);
        }
        return a.label.localeCompare(b.label);
      });
  }, [users, selectedGraph]);

  const isAgeGraph: boolean = selectedGraph === "age";
  const graphTitle: string = isAgeGraph ? "AGE GRAPH" : "OCCUPATION GRAPH";

  return (
    <Box sx={{ minHeight: "70vh", bgcolor: "#ffffffff", p: 2 }}>
      <Button startDecorator={<IoHome />} onClick={() => navigate("/")}>
        Home
      </Button>
      <Typography level="h2" component="h1" sx={titleStyle}>
        {graphTitle}
      </Typography>

      {users.length === 0 ? (
        <Box>Error Fetching Data</Box>
      ) : (
        <Stack>
          <Checkbox
            label="Age"
            variant="solid"
            checked={isAgeGraph}
            onChange={() => setSelectedGraph("age")}
          />
          <Checkbox
            label="Occupation"
            variant="solid"
            checked={!isAgeGraph}
            onChange={() => setSelectedGraph("occupation")}
          />
          <Box
            flexDirection={"column"}
            display="flex"
            gap={5}
            justifyContent={"space-between"}
          >
            {isAgeGraph ? (
              <Box sx={{ p: 4 }}>
                <ResponsiveContainer width="100%" aspect={3}>
                  <LineChart
                    width={500}
                    height={300}
                    data={data}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid />
                    <XAxis dataKey="label" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      strokeWidth={4}
                      dataKey="count"
                      stroke="#8884d8"
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Box>
            ) : (
              <ResponsiveContainer width="100%" aspect={2}>
                <PieChart width={400} height={400}>
                  <Pie
                    data={data}
                    dataKey="count"
                    nameKey="label"
                    cx="50%"
                    cy="50%"
                    outerRadius={120}
                    label
                  >
                  {data.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                  </Pie >
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            )}
          </Box>
        </Stack>
      )}
    </Box>
  );
}
