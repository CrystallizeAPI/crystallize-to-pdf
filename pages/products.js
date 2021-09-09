import React from "react";
import { PDFViewer } from "@react-pdf/renderer";
import Products, { query } from "./../page-components/products";

const tenantIdentifier = `furniture`;

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
  if (!data) {
    return <div>Loading ...</div>;
  }

  console.log({ data });
  return (
    <div style={{ display: "flex", alignItems: "center", height: "100vh" }}>
      {typeof window !== "undefined" && (
        <PDFViewer style={{ width: "100%", height: "100%" }}>
          <Products pages={data?.data?.catalogue?.folders} />
        </PDFViewer>
      )}
    </div>
  );
}
