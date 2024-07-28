import {Box} from "@mui/system";
import React, {MouseEventHandler} from "react";
import {Link} from "@remix-run/react";

interface NavItemProps {
  to?: string | undefined;
  children: React.ReactNode;
  fgColor: string;
  bgColor: string;
  onClick?: MouseEventHandler<any> | undefined;
}

const NavItem: React.FC<NavItemProps> = (
  {
    fgColor, bgColor, children, to, onClick
  }) => {

  const child = <Box>
    <Box sx={{
      position: "absolute",
      top: 0,
      left: "5%",
      width: 0,
      height: 0,
      borderTop: `13px solid ${bgColor}`,
      borderLeft: "25px solid transparent",
      borderRight: "25px solid transparent",
      borderBottom: "0px solid bgColor",
      backgroundColor: fgColor,
      // borderColor:bgColor,
    }}>
    </Box>
    <Box sx={{
      position: "absolute",
      top: "100%",
      left: "5%",
      width: 0,
      height: 0,
      borderTop: `13px solid ${fgColor}`,
      borderLeft: "25px solid transparent",
      borderRight: "25px solid transparent",
      borderBottom: `0px solid ${bgColor}`,
      backgroundColor: bgColor,
    }}>
    </Box>
    {children}
  </Box>


  return (
    <Box sx={{
      mb: 2, "& > *": {
        display: 'flex',
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: fgColor,
        borderRadius: '2px',
        height: "80px",
        width: "100%"
      }
    }}>

      {to
        ? <Link onClick={onClick} to={to}>
          {child}
        </Link>
        : <Box onClick={onClick} sx={{cursor: "pointer"}}>
          {child}
        </Box>
      }
    </Box>
  );
};

export default NavItem;
