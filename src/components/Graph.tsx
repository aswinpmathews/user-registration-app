import { Typography, Stack, Box, Checkbox, Button, Skeleton } from "@mui/joy";
import { useEffect, useState } from "react";
import { fetchUsers } from "../store/thunks/userThunks";
import { useMemo } from "react";
import { titleStyle, COLORS } from "../style/graphStyle";
import { selectUsers, selectIsLoading } from "../store/slice/userSlice";
import { useAppDispatch, useAppSelector } from "../hooks/custom";
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
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const users = useAppSelector(selectUsers);
  const isLoadingUsers = useAppSelector(selectIsLoading);
  const dispatch = useAppDispatch();

  useEffect(() => {
      dispatch(fetchUsers())
        .unwrap()
        .catch((err) => {
          setError(err);
          console.log(err);
        });
  }, [dispatch]);

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
      ) : error !== null ? (
        <Box>Error Fetching Data...</Box>
      ) : users.length === 0 ? (
        <Typography
          sx={{
            justifyContent: "center",
            fontFamily: "not-sans",
            fontWeight: "bold",
            display: "flex",
          }}
        >
          No users found. Please add some users.
        </Typography>
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
                    <YAxis allowDecimals={false} />
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
                <PieChart width={500} height={500}>
                  <Pie
                    data={data}
                    dataKey="count"
                    nameKey="label"
                    cx="50%"
                    cy="50%"
                    outerRadius={180}
                    label={({ name, value }) => `${name}: ${value}`}
                  >
                    {data.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
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
