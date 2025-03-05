/** @jsxImportSource @emotion/react */
"use client";

import { css } from "@emotion/react";
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
        css={css`
          flex: 1;
          display: flex;
          align-items: center;
          position: relative;
        `}
      >
        <RandomEggTapTap
          disabled={!isGamePlaying}
          onTap={() => {
            tapCounter.increment();
            /**
             * 이벤트 처리를 위해 성공횟수 도달까지 소용된 시간을 저장합니다.
             * 완벽하게 시간이 일치하지 않아도 무방합니다.
             */
            if (tapCounter.count === gameConfigStore.successCount) {
              successTimeRef.current = gameLeftTime;
            }
          }}
          tabAreaSize={gameConfigStore.touchWidth!}
          /**
           * 성공 횟수의 20%로 랜덤 위치로 변경
           */
          tapsToMove={Math.floor(gameConfigStore.successCount! * 0.2)}
          /**
           * 성공 횟수의 50%이상 클릭 시 알 깨지는 로티로 변경
           */
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

      <div>
        <GameProgressBar duration={GAME_TIME} ref={gameProgressBarRef} />
      </div>
    </div>
  );
};

export default Page;
