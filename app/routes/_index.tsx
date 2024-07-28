import type {MetaFunction} from "@remix-run/node";
import {Box} from "@mui/system";
import {Avatar,} from "@mui/material";
import React from 'react';
import NavItem from '../NavItem';
import NaviEditWithModal from '../NaviPost'

// import BasicModal from "~/mui/BasicModal";

export const meta: MetaFunction = () => {
  return [
    {title: "Ensoku Kaido"},
    {name: "description", content: "Welcome to Remix!"},
  ];
};

export default function Index() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (

    <div className="font-sans p-4">

      <Box sx={{
        width: "160px",
        backgroundColor: '#D9EB99',
        borderRadius: "30px",
        boxShadow: '0px 2px 1px rgba(0, 0, 0, 0.2)',
        height: "90vh",
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
      <NaviEditWithModal handleOpen={handleOpen} handleClose={handleClose} open={open}/>
    </div>
  );
}




