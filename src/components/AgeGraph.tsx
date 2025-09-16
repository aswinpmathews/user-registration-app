import { useSelector,useDispatch  } from 'react-redux';
import { RootState ,AppDispatch } from '../store/index';
import { Sheet, Typography, Stack, Box } from '@mui/joy';
import { useEffect } from 'react';
import { fetchUsers } from '../store/thunks/userThunks';
import { useMemo } from 'react';
const style = (barHeight : number) => ({
                  width: 40,
                  height: `${barHeight}px`,
                  bgcolor: '#1a71d4ff',
                  borderRadius: 1,
                  position: 'relative',
                })

export default function AgeGraph() {
  const users = useSelector((state: RootState) => state.user.users);

  const dispatch= useDispatch<AppDispatch>();

  useEffect(() => {
    if (!users || users.length === 0) {
      dispatch(fetchUsers());
    }
  }, [dispatch, users]);

    const data = useMemo(() => {
    const ageCount = users.reduce<Record<number, number>>((acc, user) => {
      if (typeof user.age === 'number' && !isNaN(user.age)) {
        acc[user.age] = (acc[user.age] || 0) + 1;
      }
      return acc;
    }, {});

    return Object.entries(ageCount)
      .map(([age, count]) => ({ age: Number(age), count }))
      .sort((a, b) => a.age - b.age);
  }, [users]);

  const maxCount = Math.max(...data.map((d) => d.count), 1);

  return (
    <>
    {users.length === 0 ? (<div>No user data available to display the graph.</div>):
    
    <div>
   <Typography level="h2" component="h1"
      sx={{
        justifyContent: 'center',
        display: 'flex',
        mb: 4,
        fontSize: '2rem',
        fontWeight: 'bold',
        fontFamily: 'noto-sans',
      }}>
    Age Distribution Graph
  </Typography>
    
    <Sheet
      variant="outlined"
      sx={{
  
        padding: 10,
        borderRadius: 'md',
        boxShadow: 'md',
        maxWidth: 600,
        margin: 'auto',
        mt: 5,
        mb: 5,
      }}
    >
    

      <Stack direction="row" spacing={2} alignItems="flex-end" justifyContent="center">
        {data.map(({ age, count }) => {
          const barHeight = (count / maxCount) * 200; 

          return (
            <Box key={age} sx={{ position: 'relative', textAlign: 'center', bgcolor: '#ffffffff', p: 1}}>
              <Box
                sx={{...style(barHeight)}}
              >
                <Typography
                  
                  sx={{position: 'absolute',top: '10px',left: '50%',transform: 'translateX(-50%)',color: 'white',fontWeight: 'bold',}}
                >
                  {count}
                </Typography>
              </Box>


              <Typography  mt={1}
                sx={{
                  fontWeight:'bold',
                }}
              >
                {age}
              </Typography>
            </Box>
          );
        })}
      </Stack>
    </Sheet>
        </div>
} </>);
}
