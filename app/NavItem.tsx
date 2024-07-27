import { Link } from "@remix-run/react";
import { Box } from "@mui/system";
import React from "react";

interface NavItemProps {
  to: string;
  children: React.ReactNode;
  fgColor: string;
  bgColor: string;
}

const NavItem: React.FC<NavItemProps> = ({ to,fgColor,bgColor , children }) => {
  const [isHovered, setIsHovered] = React.useState(false);
  return (
    <Box sx={{ mb: 2}}>
      <Box sx={{
        display: 'flex',
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: fgColor,
        borderRadius: '2px',
        height: isHovered ? '80px' : '60px',
        transition: 'height 0.1s linear',
        transformOrigin: 'center top',

        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)
      }>
        <Box sx={{
          position:"absolute",
          top: 0,
          left: "5%",
          width: 0,
          height: 0,
          borderTop: `13px solid ${bgColor}`,
          borderLeft: "25px solid transparent",
          borderRight: "25px solid transparent",
          borderBottom: "0px solid bgColor",
          backgroundColor: fgColor,
        }}>
        </Box>
        <Link to={to} style={{ textDecoration: 'none', color: 'white',fontSize:"inherit" }}>
          {children}
        </Link>
       <Box sx={{
          position:"absolute",
          top: "100%",
          left: "5%",
          width: 0,
          height: 0,
          borderTop: `13px solid ${fgColor}`,
          borderLeft: "25px solid transparent",
          borderRight: "25px solid transparent",
          borderBottom: `0px solid ${bgColor}`,
          backgroundColor:bgColor,
       }}>
        </Box>
      </Box>
    </Box>
  );
};

export default NavItem;
