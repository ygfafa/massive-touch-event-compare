"use client";
import dynamic from "next/dynamic";
import type { LottieRef } from "@/components/LazyLottie";

const LazyLottie = dynamic(
  () => import("@/components/LazyLottie").then((mod) => mod.LazyLottie),
  {
    ssr: false,
  }
);
import { motion } from "framer-motion";
import { useRef, useState } from "react";

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
  const [isPressed, setIsPressed] = useState(false);
  const lottieRef = useRef<LottieRef>(null);

  const handlePointerDown = () => {
    if (isPressed) return;

    setIsPressed(true);
    onPointerDown();
  };

  const handlePointerUp = () => {
    setIsPressed(false);
  };
  return (
    <motion.div
      animate={{ scale: isPressed ? 1.1 : 1 }}
      transition={{ duration: 0.1 }}
      className="w-40 h-40 bg-blue-500 rounded-lg"
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
    >
      <LazyLottie
        ref={lottieRef}
        autoplay={false}
        loop={false}
        name="ani_object_egg_crack(success)_3d_250224"
        getAnimationData={() =>
          import("./ani_object_egg_crack(success)_3d_250224.json")
        }
        width="100%"
        height="100%"
      />
    </motion.div>
  );
};

export default Page;
