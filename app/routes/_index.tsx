import type {MetaFunction} from "@remix-run/node";
import React from 'react';
export const meta: MetaFunction = () => {
  return [
    {title: "Ensoku Kaido"},
    {name: "description", content: "ensokkaidou!!"},
  ];
};

export default function Index() {
  return (
    <></>
  );
}



