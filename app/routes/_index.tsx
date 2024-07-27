import type { MetaFunction } from "@remix-run/node";
import {Box} from "@mui/system";
import {Avatar,} from "@mui/material";

import NavItem from '../NavItem';

export const meta: MetaFunction = () => {
  return [
    { title: "Ensoku Kaido" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  const theme ={
    navfgColor:"#515B92",
    navbgColor:"#D9EB99",
  }

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
        <Box >
          <NavItem to="/" fgColor="#515B92" bgColor="#D9EB99">一覧</NavItem>
          <NavItem to="/" fgColor="#515B92" bgColor="#D9EB99">トップ</NavItem>
          <NavItem to="/" fgColor="#515B92" bgColor="#D9EB99">ログイン</NavItem>
        </Box>
      </Box>



    </div>
  );
}



