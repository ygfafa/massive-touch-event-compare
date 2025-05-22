"use client";

import { useState } from "react";

const Page = () => {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p
        style={{
          width: "100%",
          textAlign: "center",
          fontSize: 32,
          fontWeight: 800,
          marginBottom: 32,
        }}
      >
        {count}
      </p>

      <div style={{ display: "flex", gap: 24 }}>
        <button
          style={{ padding: 42, backgroundColor: "lightgreen" }}
          onPointerDown={() => setCount(count + 1)}
        >
          +
        </button>
        <button
          style={{ padding: 42, backgroundColor: "lightsalmon" }}
          onPointerDown={() => setCount(count + 1)}
        >
          -
        </button>
      </div>
    </div>
  );
};

export default Page;
