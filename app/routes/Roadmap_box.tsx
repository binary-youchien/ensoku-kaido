import { Box } from "@mui/material";
const MyComponent = ({ nodeRes }) => {
  const fgColor = "#fdcf58";

  return (
    <Box padding="0 20px" display="flex">
      <Box padding="20px 0">
        <Box
          sx={{
            position: 'relative',
            backgroundColor: fgColor,
            borderRadius: '2px',
            height: '150px',
            width:"500px",
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
              borderTopColor: '#fdcf58',
              width: 0,
              height: 0,
              zIndex: 1,
            },
            '& h2': {
              margin: '10px 0 5px 0',
              padding: '0 10px',
            },
            '& p': {
              margin: '5px 0 10px 0',
              padding: '0 10px',
            },
          }}
        >
          <h2>
            {nodeRes.title}
          </h2>
          <p>
            {nodeRes.description}
          </p>
          </Box>
      </Box>
    </Box>
  );
};

export default MyComponent;
