import * as React from 'react';
import {Box, Container} from "@mui/system";
import {ThemeProvider} from "@mui/material/styles";
import theme from "~/mui/theme";

export default function Layout({children}: { children: React.ReactNode }) {

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="sm">
        <Box sx={{my: 4}}>
          {children}
          <div></div>
        </Box>
      </Container>
    </ThemeProvider>
  );
}