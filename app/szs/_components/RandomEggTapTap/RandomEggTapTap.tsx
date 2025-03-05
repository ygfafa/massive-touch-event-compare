"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { TapArea } from "./TapArea";

type RandomEggTapTapProps = {
  onTap?: () => void;
  /**
   * 탭을 몇번 했을 때 이동할지 설정
   */
  tapsToMove: number;
  /**
   * 탭 영역 크기
   */
  tabAreaSize: number;
  disabled?: boolean;
  broken?: boolean;
};

export const RandomEggTapTap = ({
  tapsToMove,
  tabAreaSize,
  disabled,
  broken,
  onTap,
}: RandomEggTapTapProps) => {
  const [boardSize, setBoardSize] = useState<Size>({
    width: 0,
    height: 0,
  });
  const [position, setPosition] = useState<Position | null>(null);
  const tapCountRef = useRef(0);
  const boardRef = useRef<HTMLDivElement>(null);

  const _tabAreaSize = useMemo(
    () => ({
      width: tabAreaSize,
      height: tabAreaSize * ASPECT_RATIO,
    }),
    [tabAreaSize]
  );

  const handleTap = () => {
    if (disabled) return;

    onTap?.();

    tapCountRef.current += 1;

    if (tapCountRef.current >= tapsToMove) {
      tapCountRef.current = 0;
      setPosition(generateRandomPosition(boardSize, _tabAreaSize));
    }
  };

  useEffect(() => {
    if (!boardRef.current) return;

    const resizeObserver = new ResizeObserver(() => {
      if (boardRef.current) {
        const boardSize = boardRef.current.getBoundingClientRect();
        setBoardSize({ width: boardSize.width, height: boardSize.height });
        setPosition(generateCenterPosition(boardSize, _tabAreaSize));
      }
    });

    resizeObserver.observe(boardRef.current);

    return () => resizeObserver.disconnect();
  }, []);

  return (
    <div
      ref={boardRef}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
      }}
    >
      {position && (
        <TapArea
          position={position}
          size={_tabAreaSize}
          onTap={handleTap}
          disabled={disabled}
          broken={broken}
        />
      )}
    </div>
  );
};

const ASPECT_RATIO = 215 / 190;

export type Size = {
  width: number;
  height: number;
};

export type Position = {
  x: number;
  y: number;
};

const generateCenterPosition = (boardSize: Size, tabAreaSize: Size) => {
  return {
    x: (boardSize.width - tabAreaSize.width) / 2,
    y: (boardSize.height - tabAreaSize.height) / 2,
  };
};

const generateRandomPosition = (boardSize: Size, tabAreaSize: Size) => {
  return {
    x: Math.random() * (boardSize.width - tabAreaSize.width),
    y: Math.random() * (boardSize.height - tabAreaSize.height),
  };
};
