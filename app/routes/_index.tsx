import type { MetaFunction } from "@remix-run/node";
import {Box, Container} from "@mui/system";
import {Avatar,} from "@mui/material";
import React from 'react';
import NavItem from '../NavItem';
import * as React from "react";
import NaviEditWithModal from '../NaviPost'

// import BasicModal from "~/mui/BasicModal";

export const meta: MetaFunction = () => {
  return [
    { title: "Ensoku Kaido" },
    { name: "description", content: "ensokkaidou!!" },
  ];
};

export default function Index() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div className="font-sans p-4"  >
      <Container sx={{
        display:"flex",
        minWidth:"100%",
        py:4,
        backgroundColor: '#FBF8FF',
      }}>
        <Box sx={{
          width:"15%",
          position:"fixed",
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
            <Box >
              <NavItem to="/" fgColor="#515B92" bgColor="#D9EB99">トップ</NavItem>
              <NavItem to="/roadmap/list" fgColor="#515B92" bgColor="#D9EB99">一覧</NavItem>
              {/*<NavItem to="/" fgColor="#515B92" bgColor="#D9EB99">ログイン</NavItem>*/}
              <NavItem onClick={handleOpen} fgColor="#515B92" bgColor="#D9EB99">新規作成</NavItem>
            </Box>
          </Box>
          <NaviEditWithModal handleOpen={handleOpen} handleClose={handleClose} open={open}/>
        </Box>
        <Box sx={{
          width: "85%",
          marginLeft: "180px",
        }}>

          <h1>mainnnnnnnnnnnnn</h1>
          <h1>mainnnnnnnnnnnnn</h1>
          <h1>mainnnnnnnnnnnnn</h1>
          <h1>mainnnnnnnnnnnnn</h1>
          <h1>mainnnnnnnnnnnnn</h1>
          <h1>mainnnnnnnnnnnnn</h1>
          <h1>mainnnnnnnnnnnnn</h1>
          <h1>mainnnnnnnnnnnnn</h1>
          <h1>mainnnnnnnnnnnnn</h1>
          <h1>mainnnnnnnnnnnnn</h1>
          <h1>mainnnnnnnnnnnnn</h1>
          <h1>mainnnnnnnnnnnnn</h1>
          <h1>mainnnnnnnnnnnnn</h1>
          <h1>mainnnnnnnnnnnnn</h1>
          <h1>mainnnnnnnnnnnnn</h1>
          <h1>mainnnnnnnnnnnnn</h1>
          <h1>mainnnnnnnnnnnnn</h1>
          <h1>mainnnnnnnnnnnnn</h1>
          <h1>mainnnnnnnnnnnnn</h1>
          <h1>mainnnnnnnnnnnnn</h1>
          <h1>mainnnnnnnnnnnnn</h1>
          <h1>mainnnnnnnnnnnnn</h1>
          <h1>mainnnnnnnnnnnnn</h1>
          <h1>mainnnnnnnnnnnnn</h1>
          <h1>mainnnnnnnnnnnnn</h1>
          <h1>mainnnnnnnnnnnnn</h1>
          <h1>mainnnnnnnnnnnnn</h1>
          <h1>mainnnnnnnnnnnnn</h1>
          <h1>mainnnnnnnnnnnnn</h1>
          <h1>mainnnnnnnnnnnnn</h1>
          <h1>mainnnnnnnnnnnnn</h1>
          <h1>mainnnnnnnnnnnnn</h1>
          <h1>mainnnnnnnnnnnnn</h1>
          <h1>mainnnnnnnnnnnnn</h1>
          <h1>mainnnnnnnnnnnnn</h1>
          <h1>mainnnnnnnnnnnnn</h1>
          <h1>mainnnnnnnnnnnnn</h1>
          <h1>mainnnnnnnnnnnnn</h1>
          <h1>mainnnnnnnnnnnnn</h1>
          <h1>mainnnnnnnnnnnnn</h1>
          <h1>mainnnnnnnnnnnnn</h1>
          <h1>mainnnnnnnnnnnnn</h1>
          <h1>mainnnnnnnnnnnnn</h1>
          <h1>mainnnnnnnnnnnnn</h1>
          <h1>mainnnnnnnnnnnnn</h1>
          <h1>mainnnnnnnnnnnnn</h1>
          <h1>mainnnnnnnnnnnnn</h1>
          <h1>mainnnnnnnnnnnnn</h1>
          <h1>mainnnnnnnnnnnnn</h1>
          <h1>mainnnnnnnnnnnnn</h1>

        </Box>

      </Container>

    </div>
  );
}



