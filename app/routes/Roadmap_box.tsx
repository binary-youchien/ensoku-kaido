import { Box } from "@mui/material";

const MyComponent = ({ nodeRes }) => {
  const fgColor = "#e0edff";

  return (
    <Box padding="0 20px" display="flex">
      <Box padding="20px 0">
        <Box
          sx={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: fgColor,
            borderRadius: '2px',
            height: '80px',
            width:"90px",
            marginBottom: '16px',
            boxShadow:"3px 3px 3px black",
            '&::before': {
              position: 'absolute',
              content: '""',
              top: 'calc(100% + 3px)',
              left: '35px',
              border: '15px solid transparent',
              borderTopColor: 'rgba(0, 0, 0, 0.7)',
              filter: 'blur(1px)',
              width: 0,
              height: 0,
              zIndex: 0,
            },
            '&::after': {
              position: 'absolute',
              content: '""',
              top: '100%',
              left: '30px',
              border: '15px solid transparent',
              borderTopColor: '#e0edff',
              width: 0,
              height: 0,
              zIndex: 1,
            },
          }}
        >
          {nodeRes.title}
        </Box>
      </Box>
    </Box>
  );
};

export default MyComponent;
