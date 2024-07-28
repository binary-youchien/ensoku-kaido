import { json, LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Box, Typography, List, ListItem, Link as MuiLink, Paper, Divider } from "@mui/material";

// Loader function to fetch data
export const loader: LoaderFunction = async ({ request }) => {
  const data = await fetchDataFromDatabaseOrAPI();
  return json(data);
};

async function fetchDataFromDatabaseOrAPI() {
  return {
    roadmapTitle: "えんそく街道",
    message: "直観的なロードマップ",
    steps: [
      { id: 1, title: "ステップ1: 　一覧表示", description: "モダンフレームワーク(Remix)により、数多くのロードマップが表示可能" },
      { id: 2, title: "ステップ2: Google認証によるアカウント作成", description: "高セキュリティによるGoogleにより、セキュリティ対策" },
      { id: 3, title: "ステップ3: 今までにないロードマップ新規作成", description: "分岐により、新規エディタ可能" },
      { id: 4, title: "ステップ3: ロードマップの編集が可能", description: "間違えても問題なし" }
    ],
  };
}

export default function RoadmapTop() {
  const data = useLoaderData<typeof loader>();

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h2" gutterBottom sx={{ marginBottom: 2, marginTop: 2}}>
        {data.roadmapTitle}
      </Typography>
      <Typography variant="body1" paragraph sx={{ marginBottom: 4 }}>
        {data.message}
      </Typography>
      <Divider sx={{ marginBottom: 4 }} />
      <Typography variant="h3" gutterBottom sx={{ marginBottom: 2 }}>
        SNS版ロードマップ
      </Typography>
      <List sx={{ marginBottom: 4 }}>
        {data.steps.map((step) => (
          <ListItem key={step.id} sx={{ marginBottom: 2, marginTop: 3, padding: 2, backgroundColor: '#FDCF58FF', borderRadius: '8px', boxShadow: '1px 1px 1px 1px'  }}>
            <Box>
              <Typography variant="h4">{step.title}</Typography>
              <Typography variant="body1" sx={{ marginTop: 4, marginLeft: 2}}>{step.description}</Typography>
            </Box>
          </ListItem>
        ))}
      </List>
      <Divider sx={{ marginBottom: 4 }} />
      <Typography variant="h3" gutterBottom sx={{ marginBottom: 2 }}>
        他のページへのリンク
      </Typography>
      <List>
        <ListItem sx={{ marginBottom: 1 }}>
          <MuiLink href="/roadmap/step1" underline="hover">
            ステップ1: 準備
          </MuiLink>
        </ListItem>
        <ListItem sx={{ marginBottom: 1 }}>
          <MuiLink href="/roadmap/step2" underline="hover">
            ステップ2: スタート
          </MuiLink>
        </ListItem>
        <ListItem sx={{ marginBottom: 1 }}>
          <MuiLink href="/roadmap/step3" underline="hover">
            ステップ3: 進行
          </MuiLink>
        </ListItem>
        <ListItem sx={{ marginBottom: 1 }}>
          <MuiLink href="/roadmap/step4" underline="hover">
            ステップ4: 完了
          </MuiLink>
        </ListItem>
      </List>
    </Box>
  );
}
