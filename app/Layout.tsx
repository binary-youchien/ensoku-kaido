import * as React from 'react';
import {Box, Container} from "@mui/system";

export default function Layout({children}: { children: React.ReactNode }) {
  return (
    <Container maxWidth="sm">
      <Box sx={{my: 4}}>
        {children}
        <div></div>
      </Box>
    </Container>
  );
}