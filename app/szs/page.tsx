"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useCountdown, useCounter } from "usehooks-ts";

import { CountDisplay } from "./_components/CountDisplay";
import { CountDownOverlay } from "./_components/CountDownOverlay";
import {
  GameProgressBar,
  GameProgressBarRef,
} from "./_components/GameProgressBar";
import { RandomEggTapTap } from "./_components/RandomEggTapTap";
import { GAME_TIME } from "./_constants";
import { useGameConfigStore } from "./_stores/gameConfigStore";
// import { useGameResultStore } from "./_stores/gameResultStore";

const Page = () => {
  const router = useRouter();
  const gameConfigStore = useGameConfigStore();
  const tapCounter = useCounter(0);

  const [isOverlayShow, setIsOverlayShow] = useState(true);
  const [isGamePlaying, setIsGamePlaying] = useState(false);

  const [gameLeftTime, { startCountdown: startGameCountdown }] = useCountdown({
    countStart: GAME_TIME,
  });

  const gameProgressBarRef = useRef<GameProgressBarRef>(null);

  const successTimeRef = useRef(0);

  const prefetchByResult = () => {
    if (tapCounter.count >= gameConfigStore.successCount!) {
      router.prefetch("/rewards/taptap/play/success");
      router.prefetch("/rewards/taptap/play/success-ranked");

      return;
    }

    router.prefetch("/rewards/taptap/play/failure");
  };

  useEffect(() => {
    if (gameLeftTime === 0) {
      prefetchByResult();
      setIsGamePlaying(false);
    }
  }, [gameLeftTime]);

  /**
   * Dim 영역과 status bar / safe area 색상 억지로 맞추기 위해 사용
   * TODO.
   * 공통으로 처리할 필요가 있음
   */

  return (
    <div className="flex flex-col items-center justify-center">
      <span className="text-4xl font-bold">{gameLeftTime}</span>
      <CountDisplay count={tapCounter.count} />

      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          position: "relative",
        }}
      >
        <RandomEggTapTap
          disabled={!isGamePlaying}
          onTap={() => {
            tapCounter.increment();

            if (tapCounter.count === gameConfigStore.successCount) {
              successTimeRef.current = gameLeftTime;
            }
          }}
          tabAreaSize={gameConfigStore.touchWidth!}
          tapsToMove={20}
          broken={tapCounter.count >= gameConfigStore.successCount! * 0.5}
        />
        {isOverlayShow && (
          <CountDownOverlay
            onComplete={() => {
              setIsOverlayShow(false);
              setIsGamePlaying(true);

              startGameCountdown();
              gameProgressBarRef.current?.start();
            }}
          />
        )}
      </div>

      <div className="fixed bottom-0 left-0 right-0">
        <GameProgressBar duration={GAME_TIME} ref={gameProgressBarRef} />
      </div>
    </div>
  );
};

export default Page;
