/**
 * By default, Remix will handle hydrating your app on the client for you.
 * You are free to delete this file if you'd like to, but if you ever want it revealed again, you can run `npx remix reveal` ✨
 * For more information, see https://remix.run/file-conventions/entry.client
 */

import {RemixBrowser} from "@remix-run/react";

import React from "react";
import * as ReactDOM from "react-dom/client";
import {CacheProvider} from "@emotion/react";
import CssBaseline from '@mui/material/CssBaseline';
import {createEmotionCache} from "~/mui/root";
import ClientStyleContext from "./mui/ClientStyleContext";
import {TaskOrderQueueMap} from "~/util/TaskOrderQueueMap";

interface ClientCacheProviderProps {
  children: React.ReactNode;
}

function ClientCacheProvider({children}: ClientCacheProviderProps) {
  const [cache, setCache] = React.useState(createEmotionCache());

  const clientStyleContextValue = React.useMemo(
    () => ({
      reset() {
        setCache(createEmotionCache());
      },
    }),
    [],
  );

  return (
    <ClientStyleContext.Provider value={clientStyleContextValue}>
      <CacheProvider value={cache}>{children}</CacheProvider>
    </ClientStyleContext.Provider>
  );
}

const hydrate = () => {
  React.startTransition(() => {
    ReactDOM.hydrateRoot(
      document,
      <ClientCacheProvider>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline/>
        <RemixBrowser/>
      </ClientCacheProvider>,
    );
  });
};
export const taskOrderQueueMap = new TaskOrderQueueMap()

if (window.requestIdleCallback) {
  window.requestIdleCallback(hydrate);
} else {
  // Safari doesn't support requestIdleCallback
  // https://caniuse.com/requestidlecallback
  setTimeout(hydrate, 1);
}