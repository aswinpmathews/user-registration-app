import { useSelector,useDispatch  } from 'react-redux';
import { RootState ,AppDispatch } from '../store/index';
import { Sheet, Typography, Stack, Box ,Checkbox } from '@mui/joy';
import { useEffect ,useState} from 'react';
import { fetchUsers } from '../store/thunks/userThunks';
import { useMemo } from 'react';
import { style,countStyle,titleStyle,sheetStyle } from '../style/Graphstyle';

export default function AgeGraph() {
const [selectedGraph, setSelectedGraph] = useState<'age' | 'occupation'>('age');


  const users = useSelector((state: RootState) => state.user.users);

  const dispatch= useDispatch<AppDispatch>();

  useEffect(() => {
    if (!users || users.length === 0) {
      dispatch(fetchUsers());
    }
  }, [dispatch, users]);

    const ageData = useMemo(() => {
    const ageCount = users.reduce<Record<number, number>>((acc, user) => {
      if (typeof user.age === 'number' && !isNaN(user.age)) {
        acc[user.age] = (acc[user.age] || 0) + 1;
      }
      return acc;
    }, {});

    return Object.entries(ageCount)
      .map(([age, count]) => ({ label: Number(age), count }))
      .sort((a, b) => a.label - b.label);
  }, [users]);

   const occupationData = useMemo(() => {
    const occupationCount = users.reduce<Record<string, number>>((acc, user) => {
      if (user.occupation && typeof user.occupation === 'string') {
        acc[user.occupation] = (acc[user.occupation] || 0) + 1;
      }
      return acc;
    }, {});

    return Object.entries(occupationCount)
      .map(([occupation, count]) => ({ label: occupation, count }))
      .sort((a, b) => a.label.localeCompare(b.label));
  }, [users]);
  

  const isAgeGraph = selectedGraph === 'age';
  const data = isAgeGraph ? ageData : occupationData;
  const graphTitle = isAgeGraph ? 'Age Distribution Graph' : 'Occupation Distribution Graph';
  const maxCount = Math.max(...data.map((d) => d.count), 1);
  
  return (
    <>
    {users.length === 0 ? (<div>No user data available to display the graph.</div>):
    
    <div>  
    <Checkbox label="Age" variant="solid" checked={isAgeGraph} onChange={() => setSelectedGraph('age')}/>
            
    <Checkbox label="Occupation" variant="solid" checked={!isAgeGraph} onChange={() => setSelectedGraph('occupation')}/>

   <Typography level="h2" component="h1"
      sx={{...titleStyle}}>

      
      {graphTitle}
  </Typography>
    
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
        </div>
} </>);
}
