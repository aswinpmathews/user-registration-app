import { Sheet, Typography, Stack, Box ,Checkbox } from '@mui/joy';
import { useEffect ,useState} from 'react';
import { fetchUsers } from '../store/thunks/userThunks';
import { useMemo } from 'react';
import { style,countStyle,titleStyle,sheetStyle } from '../style/Graphstyle';
import { selectUsers } from '../store/slice/UserSlice';
import { useAppDispatch ,useAppSelector} from '../Custom/custom';

export default function Graph() {
const [selectedGraph, setSelectedGraph] = useState<'age' | 'occupation'>('age');

  const users = useAppSelector(selectUsers);

  const dispatch= useAppDispatch();

  useEffect(() => {
    if (!users || users.length === 0) {
      dispatch(fetchUsers())
      .catch((err)=>console.log(err))
    }
  }, [dispatch, users]);


const data = useMemo(() => {
    const counts = users.reduce<Record<string, number>>((acc, user) => {
      const key = user[selectedGraph];
      if (key != null && key !== '') {
        acc[key] = (acc[key] || 0) + 1;
      }
      return acc;
    }, {});
    return Object.entries(counts)
      .map(([label, count]) => ({ label, count }))
      .sort((a, b) => {
        if (selectedGraph === 'age') {
          return Number(a.label) - Number(b.label);
        }
        return a.label.localeCompare(b.label);
      });
  }, [users, selectedGraph]);



  const isAgeGraph :boolean= selectedGraph === 'age';
  const graphTitle:string = isAgeGraph ? 'Age Distribution Graph' : 'Occupation Distribution Graph';
  const maxCount:number = Math.max(...data.map((d) => d.count), 1);
  
  return (
    <Box> <Typography level="h2" component="h1"
      sx={{...titleStyle}}>


      
      {graphTitle}
  </Typography>
    {users.length === 0 ? (<Box>Error Fetching Data</Box>):
    
    <Stack>  
    <Checkbox label="Age" variant="solid" checked={isAgeGraph} onChange={() => setSelectedGraph('age')}/>
            
    <Checkbox label="Occupation" variant="solid" checked={!isAgeGraph} onChange={() => setSelectedGraph('occupation')}/>

    <Sheet
      variant="outlined"
      sx={{...sheetStyle}}
    >
      <Stack  direction="row" spacing={2} alignItems="flex-end" justifyContent="center">
        {data.map(({ label, count }) => {
          const barHeight = (count / maxCount) * 200; 

          return (
            <Box key={label} sx={{ position: 'relative', textAlign: 'center', bgcolor: '#ffffffff', p: 1}}>
              <Box
                sx={{...style(barHeight)}}
              >
                <Typography
                  
                  sx={{...countStyle}}
                >
                  {count}
                </Typography>
              </Box>

              <Typography  mt={1} sx={{fontWeight:'bold'}}>
                {label}
              </Typography>
            </Box>
          );
        })}
      </Stack>
    </Sheet>
        </Stack>
} </  Box>);
}
