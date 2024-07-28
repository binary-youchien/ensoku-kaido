import {Links, Meta, Outlet, Scripts, ScrollRestoration, useActionData,} from "@remix-run/react";
import ClientStyleContext from "~/mui/ClientStyleContext";
import {ReactNode, useContext} from "react";
import {unstable_useEnhancedEffect} from "@mui/material";
import Layout from "~/Layout";
import {withEmotionCache} from '@emotion/react';
import {Request} from "@remix-run/web-fetch";
import {RoadmapNewFormNs} from "~/routes/_form/roadmapNewForm";
import {FormError} from "~/mui/StyledForm";

interface DocumentProps {
  children: ReactNode;
  title?: string;
}


const Document = withEmotionCache(({children, title}: DocumentProps, emotionCache) => {
  const clientStyleData = useContext(ClientStyleContext);

  // Only executed on client
  unstable_useEnhancedEffect(() => {
    // re-link sheet container
    emotionCache.sheet.container = document.head;
    // re-inject tags
    const tags = emotionCache.sheet.tags;
    emotionCache.sheet.flush();
    tags.forEach((tag) => {
      // eslint-disable-next-line no-underscore-dangle
      (emotionCache.sheet as any)._insertTag(tag);
    });
    // reset cache to reapply global styles
    clientStyleData.reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <Meta/>
        <Links/>
        <title>{title}</title>
        <meta name="emotion-insertion-point" content="emotion-insertion-point"/>
      </head>
      <body>
        {children}
        <ScrollRestoration/>
        <Scripts/>
      </body>
    </html>
  );
})

export async function action({request}: { request: Request }) {
  console.debug("on action")
  return await RoadmapNewFormNs.action(request)
}

export default function App() {
  const formError: FormError | undefined = useActionData<typeof action>();
  return <Document title={"遠足街道"}>
    <Layout formError={formError}>
      <Outlet/>
    </Layout>
  </Document>;
}
