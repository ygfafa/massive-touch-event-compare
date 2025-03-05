"use client";
import { motion } from "framer-motion";
import { useState } from "react";

const Page = () => {
  const [count, setCount] = useState(0);

  const handlePointerDown = () => {
    setCount(count + 1);
  };
  return (
    <div>
      <h1 className="text-4xl font-bold"> {count}</h1>
      <TouchableBox onPointerDown={handlePointerDown} />
    </div>
  );
};

type TouchableBoxProps = {
  onPointerDown: () => void;
};
const TouchableBox = ({ onPointerDown }: TouchableBoxProps) => {
  return (
    <motion.div
      whileTap={{ scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className="w-40 h-40 bg-blue-500 rounded-lg"
      onPointerDown={onPointerDown}
    />
  );
};

export default Page;
