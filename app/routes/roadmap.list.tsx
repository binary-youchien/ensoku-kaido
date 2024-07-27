import { Box, List, ListItem, ListItemText } from "@mui/material";
import { LoaderFunctionArgs } from "@remix-run/router";
import { json, LoaderFunction } from "react-router";
import { ApiResult, Results } from "~/client/result";
import { ErrorIds } from "~/client/error";
import { NodeClient, NodeRes } from "~/client/nodeClient";
import { useLoaderData } from "@remix-run/react";

export const loader: LoaderFunction = async (): Promise<Response> => {
    const nodes = await NodeClient.RoadMapGetAll();
    return json(nodes);
};

// Component rendering function
export default function RoadmapList({ ...props }: NewProps) {
  const nodes: ApiResult<NodeRes[]> = useLoaderData();

  return (
    <Box {...props} className="bg-white">
      <List>
        {nodes.value?.map((node) => (
          <ListItem key={node.id} >
            <a href={`./${node.id}`}>
              <ListItemText primary={node.title} />
            </a>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export interface NewProps {}
