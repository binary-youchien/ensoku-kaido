import * as React from 'react';
import {ThemeProvider} from "@mui/material/styles";
import theme from "~/mui/theme";
import {Box, Container} from "@mui/system";
import {Avatar} from "@mui/material";
import NavItem from "~/NavItem";
import NaviEditWithModal from "~/NaviPost";
import {FormError} from "~/mui/StyledForm";

export default function Layout(
  {
    children,
    formError
  }: {
    children: React.ReactNode,
    formError: FormError | undefined
  }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <ThemeProvider theme={theme}>
      <div className="font-sans p-4">
        <Container sx={{
          display: "flex",
          minWidth: "100%",
          py: 4,
          backgroundColor: '#FBF8FF',
        }}>
          <Box sx={{
            width: "15%",
            position: "fixed",
          }}>
            <Box sx={{
              width: "160px",
              // mx:"auto",
              backgroundColor: '#D9EB99',
              borderRadius: "30px",
              boxShadow: '0px 2px 1px rgba(0, 0, 0, 0.2)',
              height: "93vh",
            }}>
              <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: "20%",
                width: "100%",
              }}>
                <Avatar sx={{width: 56, height: 56, mb: 2}}/>
              </Box>
              <Box>
                <NavItem to="/" fgColor="#515B92" bgColor="#D9EB99">トップ</NavItem>
                <NavItem to="/roadmap/list" fgColor="#515B92" bgColor="#D9EB99">一覧</NavItem>
                {/*<NavItem to="/" fgColor="#515B92" bgColor="#D9EB99">ログイン</NavItem>*/}
                <NavItem onClick={handleOpen} fgColor="#515B92" bgColor="#D9EB99">新規作成</NavItem>
              </Box>
            </Box>
            <NaviEditWithModal formError={formError} handleClose={handleClose} open={open}/>
          </Box>
          <Box sx={{
            width: "85%",
            marginLeft: "180px",
          }}>

            {children}
          </Box>

        </Container>

      </div>
    </ThemeProvider>
  );
}