import { Box, List, ListItem, ListItemText } from "@mui/material";
import { LoaderFunctionArgs } from "@remix-run/router";
import { json, LoaderFunction } from "react-router";
import { ApiResult, Results } from "~/client/result";
import { ErrorIds } from "~/client/error";
import { NodeClient, NodeRes } from "~/client/nodeClient";
import { useLoaderData } from "@remix-run/react";
import React from "react";

export const loader: LoaderFunction = async ({ request }: LoaderFunctionArgs): Promise<Response> => {
  const url = new URL(request.url);
  const title = url.searchParams.get('title') || undefined;

  const nodes = await NodeClient.RoadMapGetAll(title);
  return json(nodes);
};

// Component rendering function
export default function RoadmapList({ ...props }: NewProps) {
  const nodes: ApiResult<NodeRes[]> = useLoaderData();

  return (
    <Box {...props} className="bg-white">
      <List sx={{
        display: 'flex',
        flexWrap: 'wrap',
        mx: 'auto',
      }}>
        {nodes.value?.map((node) => (
          <ListItem key={node.id} sx={{
            position: 'relative',
            width: '24%',
            minHeight: '100px',
            border: '1px solid #ccc',
            borderRadius: '15px',
            backgroundColor:"#DEE1FF",
            margin: '8px 5px',
            boxShadow: '1px 2px 2px rgba(0, 0, 0, 0.2)',
            "&:hover": {
              transform: 'scale(1.01)',
              transtion: 'all 0.3s',
            },

          }}>
            <a href={`./${node.id}`} style={{textDecoration:"none",display: 'box',  position: 'absolute',width: '90%',height:"100%"}}>
              <ListItemText primary={node.title} sx={{display: 'box',color: '#182456',}} />
            </a>
            <Box sx={{
              position: 'absolute',
              top: "100%",
              left: "5%",
              width: "12%",
              minWidth: "45px",
              height: "15px",
              clipPath: "polygon(0 0, 100% 0, 50% 100%)",
              backgroundColor:"rgba(0, 0, 0, 1)",
              filter: "blur(25px)",
             }}></Box>
            <Box  sx={{
              position: 'absolute',
              top: "99%",
              left: "5%",
              width: "10%",
              minWidth: "40px",
              height: "12px",
              clipPath: "polygon(0 0, 100% 0, 50% 100%)",
              backgroundColor:"#DEE1FF",
            }}></Box>

          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export interface NewProps {}
