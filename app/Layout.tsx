import * as React from 'react';
import {ThemeProvider} from "@mui/material/styles";
import theme from "~/mui/theme";

export default function Layout({children}: { children: React.ReactNode }) {

  return (
    <ThemeProvider theme={theme}>
      {children}
      <div></div>
    </ThemeProvider>
  );
}