/** @jsxImportSource @emotion/react */
"use client";

import { css } from "@emotion/react";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { useCountdown } from "usehooks-ts";

type ReadyOverlayProps = {
  onComplete?: () => void;
};

export const CountDownOverlay = ({ onComplete }: ReadyOverlayProps) => {
  const [count, { startCountdown }] = useCountdown({ countStart: 3 });

  useEffect(() => {
    if (count === 0) {
      onComplete?.();
    }
  }, [count]);

  useEffect(() => {
    startCountdown();
  }, []);

  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 1400,
      }}
    >
      <motion.div
        key={count}
        initial={{ scale: 2 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0 }}
        transition={{ duration: 0.5 }}
        css={css`
          font-size: 90px;
          font-weight: 700;
          line-height: 150%;
          background: linear-gradient(127deg, #ffe37a 33.34%, #f3bfd5 68.27%);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          z-index: 1001;
        `}
      >
        {count}
      </motion.div>
    </div>
  );
};
