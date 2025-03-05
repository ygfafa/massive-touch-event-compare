/** @jsxImportSource @emotion/react */
"use client";

import { css } from "@emotion/react";
import { motion, useAnimation } from "framer-motion";
import { forwardRef, useImperativeHandle, useState } from "react";

type GameProgressBarProps = {
  duration: number;
};

export type GameProgressBarRef = {
  start: () => void;
  stop: () => void;
};

export const GameProgressBar = forwardRef<
  GameProgressBarRef,
  GameProgressBarProps
>(({ duration }, ref) => {
  const controls = useAnimation();
  const [timeLeft, setTimeLeft] = useState(duration);

  useImperativeHandle(
    ref,
    () => ({
      start: () => {
        const startTime = Date.now();

        controls.start({
          width: "0%",
          transition: {
            duration,
            ease: "linear",
            onUpdate: () => {
              const elapsed = (Date.now() - startTime) / 1000;
              setTimeLeft(duration - elapsed);
            },
          },
        });
      },
      stop: () => {
        controls.stop();
        setTimeLeft(duration);
      },
    }),
    [controls, duration]
  );

  return (
    <div
      css={css`
        position: relative;
        width: 100%;
        height: 14px;
        background-color: #ffffff;
        border-radius: 8px;
        overflow: hidden;
      `}
    >
      <motion.div
        initial={{ width: "100%" }}
        animate={controls}
        css={css`
          position: absolute;
          left: 0;
          top: 0;
          height: 100%;
          background-color: ${timeLeft <= 3 ? "#FF0000" : "#0000FF"};
          border-radius: 8px;
        `}
      />
    </div>
  );
});

GameProgressBar.displayName = "GameProgressBar";
