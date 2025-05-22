"use client";
import { useState } from "react";
import { motion } from "framer-motion";
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
        <motion.button
          style={{ padding: 42, backgroundColor: "lightgreen" }}
          onPointerDown={() => setCount(count + 1)}
          whileTap={{ scale: 0.9 }}
        >
          +
        </motion.button>
        <motion.button
          style={{ padding: 42, backgroundColor: "lightsalmon" }}
          onPointerDown={() => setCount(count + 1)}
          whileTap={{ scale: 0.9 }}
        >
          -
        </motion.button>
      </div>
    </div>
  );
};

export default Page;
