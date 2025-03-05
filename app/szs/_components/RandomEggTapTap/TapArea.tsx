"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import dynamic from "next/dynamic";
import type { LottieRef } from "@/components/LazyLottie";

const LazyLottie = dynamic(
  () => import("@/components/LazyLottie").then((mod) => mod.LazyLottie),
  { ssr: false }
);

import { Position, Size } from "./RandomEggTapTap";

type TapAreaProps = {
  position: Position;
  size: Size;
  onTap: () => void;
  broken?: boolean;
  disabled?: boolean;
};

export const TapArea = ({
  position,
  size,
  disabled,
  broken,
  onTap,
}: TapAreaProps) => {
  const [isPressed, setIsPressed] = useState(false);
  const lottieRef = useRef<LottieRef>(null);

  const handlePointerDown = () => {
    if (disabled || isPressed) return;

    setIsPressed(true);
    onTap();
  };

  const handlePointerUp = () => {
    setIsPressed(false);
  };

  useEffect(() => {
    if (broken) {
      lottieRef.current?.play();
    }
  }, [broken]);

  return (
    <motion.div
      style={{
        width: size.width,
        height: size.height,
        left: position.x,
        top: position.y,
        userSelect: "none",
        touchAction: "none",
        WebkitUserSelect: "none",
        WebkitTapHighlightColor: "transparent",
      }}
      animate={{ scale: isPressed ? 1.1 : 1 }}
      transition={{ duration: 0.1 }}
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
