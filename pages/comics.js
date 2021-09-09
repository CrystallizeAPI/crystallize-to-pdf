import React from "react";
import { PDFViewer } from "@react-pdf/renderer";
import ComicBook, { query } from "./../page-components/comic-book";

const tenantIdentifier = `crystallize_marketing`;

export async function getStaticProps() {
  const body = JSON.stringify({ query });
  const response = await fetch(
    `https://api.crystallize.com/${tenantIdentifier}/catalogue`,
    {
      method: "post",
      headers: {
        "content-type": "application/json",
      },
      body,
    }
  );

  return {
    props: {
      data: await response.json(),
    },
  };
}

export default function CreatePdf({ data }) {
  const {
    data: {
      catalogue: { children },
    },
  } = data;

  if (!data) {
    return <div>Loading ...</div>;
  }

  return (
    <div style={{ display: "flex", alignItems: "center", height: "100vh" }}>
      {typeof window !== "undefined" && (
        <PDFViewer style={{ width: "100%", height: "100%" }}>
          <ComicBook pages={children} />
        </PDFViewer>
      )}
    </div>
  );
}
