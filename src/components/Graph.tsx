import { useSelector,useDispatch  } from 'react-redux';
import { AppDispatch } from '../store/store';
import { Sheet, Typography, Stack, Box ,Checkbox } from '@mui/joy';
import { useEffect ,useState} from 'react';
import { fetchUsers } from '../store/thunks/userThunks';
import { useMemo } from 'react';
import { style,countStyle,titleStyle,sheetStyle } from '../style/Graphstyle';
import { selectUsers } from '../store/slice/UserSlice';

export default function Graph() {
const [selectedGraph, setSelectedGraph] = useState<'age' | 'occupation'>('age');

  const users = useSelector(selectUsers);

  const dispatch= useDispatch<AppDispatch>();

  useEffect(() => {
    if (!users || users.length === 0) {
      dispatch(fetchUsers());
    }
  }, [dispatch, users]);

  const data=useMemo(()=>{
    const count=users.reduce<Record<string|number, number>>((acc, user) => {
      const key : string | number |null=
      selectedGraph === 'occupation' && typeof user.occupation === 'string'
      ? user.occupation 
      : selectedGraph === 'age' && typeof user.age === 'number' && !isNaN(user.age) 
      ? user.age
      :null;
    if (key !== null){
        acc[key] = (acc[key] || 0) + 1;
    }
      return acc;
},{});
    
    return Object.entries(count)
    .map(([label, count]) => ({ 
      label: isNaN(Number(label)) ? label : Number(label), count }))
    .sort((a, b) => 
      typeof a.label === 'number' && typeof b.label === 'number'
      ? a.label - b.label
      : String(a.label).localeCompare(String(b.label))
    );
  },[users,selectedGraph]);



  const isAgeGraph :boolean= selectedGraph === 'age';
  const graphTitle:string = isAgeGraph ? 'Age Distribution Graph' : 'Occupation Distribution Graph';
  const maxCount:number = Math.max(...data.map((d) => d.count), 1);
  
  return (
    <Box>
    {users.length === 0 ? (<div>No user data available to display the graph.</div>):
    
    <Stack>  
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
        </Stack>
} </  Box>);
}
