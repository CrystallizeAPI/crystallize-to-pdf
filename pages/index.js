import React from "react";
import Link from "next/link";
export default function App() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Link href="/comics" passHref>
        <a style={{ border: "1px solid #000", padding: 20, marginRight: 20 }}>
          Comics
        </a>
      </Link>
      <Link href="/products">
        <a style={{ border: "1px solid #000", padding: 20 }}>Products</a>
      </Link>
    </div>
  );
}
