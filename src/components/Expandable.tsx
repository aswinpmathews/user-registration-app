

import { useState } from 'react';
import { GoChevronDown, GoChevronLeft } from 'react-icons/go';
import { Box,Stack,Card } from '@mui/joy';
import { Divider } from '@mui/joy';

type ExpandablePanelProps = {
  header: React.ReactNode;      
  children: React.ReactNode; 
};


function ExpandablePanel({ header, children}: ExpandablePanelProps) {
  const [expanded, setExpanded] = useState(false);

  const handleClick = () => {
    setExpanded(!expanded);
  };

    return (
    <Card variant="outlined" sx={{ mb: 2, p: 2 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" onClick={handleClick}
        sx={{ cursor: 'pointer' }}
      >
        {header}
        {expanded ? <GoChevronDown /> : <GoChevronLeft />}
      </Stack>
      {expanded && (
        <>
          <Divider sx={{ my: 1 }} />
          <Box>
            {children}
          </Box>
        </>
      )}
    </Card>
  );
}

export default ExpandablePanel;