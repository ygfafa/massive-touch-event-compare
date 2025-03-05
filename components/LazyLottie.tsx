"use client";

import { useQuery } from "@tanstack/react-query";
import Lottie, { AnimationItem } from "lottie-web";
import {
  forwardRef,
  Suspense,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";

export type LottieRef = {
  goToAndStop: (value: number, isFrame?: boolean) => void;
  play: () => void;
  pause: () => void;
  stop: () => void;
};

type LottieProps<T extends Record<string, unknown>> = {
  /**
   * name 를 React Query 의 queryKey 로 사용합니다.
   * name 이 없을 시, 캐시된 다른 로띠가 사용될 수 있습니다.
   */
  name: string;
  getAnimationData: () => Promise<T>;
  height: number | string;
  width: number | string;
  onComplete?: () => void;
} & Partial<Pick<AnimationItem, "autoplay" | "loop">>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const LazyLottie = forwardRef<LottieRef, LottieProps<any>>(
  function LazyLottie(
    {
      name,
      height,
      width,
      loop,
      autoplay = true,
      getAnimationData,
      onComplete,
    },
    ref
  ) {
    const containerRef = useRef<HTMLDivElement>(null);
    const lottieRef = useRef<AnimationItem | null>(null);

    const { data } = useQuery({
      queryKey: [name],
      queryFn: getAnimationData,
      enabled: typeof window !== "undefined",
    });

    useEffect(() => {
      if (!data || !containerRef.current) return;

      const lottie = Lottie.loadAnimation({
        name,
        container: containerRef.current,
        renderer: "svg",
        animationData: data,
        autoplay,
        loop,
      });

      lottieRef.current = lottie;

      if (onComplete) {
        lottie.addEventListener("complete", onComplete);
      }

      return () => {
        if (onComplete) {
          lottie.removeEventListener("complete", onComplete);
        }
        lottieRef.current = null;
        Lottie.destroy(name);
      };
    }, [data, autoplay, loop]);

    useImperativeHandle(
      ref,
      () => ({
        goToAndStop: (value: number, isFrame?: boolean) => {
          lottieRef.current?.goToAndStop(value, isFrame);
        },
        play: () => {
          lottieRef.current?.play();
        },
        pause: () => {
          lottieRef.current?.pause();
        },
        stop: () => {
          lottieRef.current?.stop();
        },
      }),
      []
    );

    if (!data) {
      return <div style={{ height, width }} />;
    }

    return (
      <Suspense fallback={<div style={{ height, width }} />}>
        <div ref={containerRef} style={{ height, width }} />
      </Suspense>
    );
  }
);
