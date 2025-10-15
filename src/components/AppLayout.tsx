import { CssVarsProvider } from '@mui/joy/styles';
import Sheet from '@mui/joy/Sheet';
import { ReactNode } from 'react';

type AppLayoutProps = {
  children: ReactNode;
};

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <CssVarsProvider>
      <Sheet
        sx={{
          width: 1200,
          mx: 'auto',
          my: 4,
          py: 3,
          px: 2,
          display: 'flex',
          flexDirection: 'column',
          gap: 6,
          borderRadius: 'sm',
          boxShadow: 'md',
        }}
      >
        {children}
      </Sheet>
    </CssVarsProvider>
  );
}