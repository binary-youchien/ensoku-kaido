import { Box, List, ListItem, ListItemText } from "@mui/material";
import { LoaderFunctionArgs } from "@remix-run/router";
import { json, LoaderFunction } from "react-router";
import { ApiResult, Results } from "~/client/result";
import { ErrorIds } from "~/client/error";
import { NodeClient, NodeRes } from "~/client/nodeClient";
import { useLoaderData } from "@remix-run/react";

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
