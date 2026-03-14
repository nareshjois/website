"use client";
import { cn } from "@/lib/utils";
import { createContext, useContext, useEffect, useRef, useState } from "react";

const STORAGE_KEY = "animations-off";
const EVENT_NAME = "animations-off-change";

/** Shared across islands (Header is a separate Astro island). Read/write + event for sync. */
export function getAnimationsOff(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(STORAGE_KEY) === "true";
}

export function setAnimationsOffGlobal(value: boolean): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, String(value));
  window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: value }));
}

const AnimationsOffContext = createContext<{
  animationsOff: boolean;
  setAnimationsOff: (value: boolean) => void;
}>({ animationsOff: false, setAnimationsOff: () => {} });

export function useAnimationsOff() {
  return useContext(AnimationsOffContext);
}

export const BackgroundGradientAnimation = ({
  gradientBackgroundStart = "rgb(108, 0, 162)",
  gradientBackgroundEnd = "rgb(0, 17, 82)",
  firstColor = "18, 113, 255",
  secondColor = "221, 74, 255",
  thirdColor = "100, 220, 255",
  fourthColor = "200, 50, 50",
  fifthColor = "180, 180, 50",
  pointerColor = "140, 100, 255",
  size = "80%",
  blendingValue = "hard-light",
  children,
  className,
  interactive = true,
  containerClassName,
}: {
  gradientBackgroundStart?: string;
  gradientBackgroundEnd?: string;
  firstColor?: string;
  secondColor?: string;
  thirdColor?: string;
  fourthColor?: string;
  fifthColor?: string;
  pointerColor?: string;
  size?: string;
  blendingValue?: string;
  children?: React.ReactNode;
  className?: string;
  interactive?: boolean;
  containerClassName?: string;
}) => {
  const interactiveRef = useRef<HTMLDivElement>(null);

  const [animationsOff, setAnimationsOffState] = useState(() =>
    getAnimationsOff()
  );

  useEffect(() => {
    const handler = (e: Event) =>
      setAnimationsOffState((e as CustomEvent<boolean>).detail);
    window.addEventListener(EVENT_NAME, handler);
    return () => window.removeEventListener(EVENT_NAME, handler);
  }, []);

  const setAnimationsOff = (value: boolean) => {
    setAnimationsOffState(value);
    setAnimationsOffGlobal(value);
  };

  const [curX, setCurX] = useState(0);
  const [curY, setCurY] = useState(0);
  const [tgX, setTgX] = useState(0);
  const [tgY, setTgY] = useState(0);
  useEffect(() => {
    document.body.style.setProperty(
      "--gradient-background-start",
      gradientBackgroundStart
    );
    document.body.style.setProperty(
      "--gradient-background-end",
      gradientBackgroundEnd
    );
    document.body.style.setProperty("--first-color", firstColor);
    document.body.style.setProperty("--second-color", secondColor);
    document.body.style.setProperty("--third-color", thirdColor);
    document.body.style.setProperty("--fourth-color", fourthColor);
    document.body.style.setProperty("--fifth-color", fifthColor);
    document.body.style.setProperty("--pointer-color", pointerColor);
    document.body.style.setProperty("--size", size);
    document.body.style.setProperty("--blending-value", blendingValue);
  }, []);

  useEffect(() => {
    function move() {
      if (!interactiveRef.current) {
        return;
      }
      setCurX(curX + (tgX - curX) / 20);
      setCurY(curY + (tgY - curY) / 20);
      interactiveRef.current.style.transform = `translate(${Math.round(
        curX
      )}px, ${Math.round(curY)}px)`;
    }

    move();
  }, [tgX, tgY]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (interactiveRef.current) {
      const rect = interactiveRef.current.getBoundingClientRect();
      setTgX(event.clientX - rect.left);
      setTgY(event.clientY - rect.top);
    }
  };

  const [isSafari, setIsSafari] = useState(false);
  useEffect(() => {
    setIsSafari(/^((?!chrome|android).)*safari/i.test(navigator.userAgent));
  }, []);

  return (
    <AnimationsOffContext.Provider value={{ animationsOff, setAnimationsOff }}>
      {/* Solid-color strips for Safari iOS 26+ toolbar tinting (samples fixed elements near edges) */}
      <div
        className="fixed top-0 left-0 right-0 h-1 min-h-[4px] w-full pointer-events-none z-0 bg-[#001152]"
        aria-hidden
      />
      <div
        className="fixed bottom-0 left-0 right-0 h-[3px] min-h-[3px] w-full pointer-events-none z-0 bg-[#001152]"
        aria-hidden
      />
      <div
        className={cn(
          "fixed inset-0 min-h-[100dvh] w-screen pointer-events-none bg-[linear-gradient(40deg,var(--gradient-background-start),var(--gradient-background-end))]",
          containerClassName
        )}
      >
        {!animationsOff && (
          <>
            <svg className="hidden">
              <defs>
                <filter id="blurMe">
                  <feGaussianBlur
                    in="SourceGraphic"
                    stdDeviation="10"
                    result="blur"
                  />
                  <feColorMatrix
                    in="blur"
                    mode="matrix"
                    values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
                    result="goo"
                  />
                  <feBlend in="SourceGraphic" in2="goo" />
                </filter>
              </defs>
            </svg>
            <div
              className={cn(
                "gradients-container h-full w-full blur-lg",
                isSafari ? "blur-2xl" : "[filter:url(#blurMe)_blur(40px)]"
              )}
            >
              <div
                className={cn(
                  `absolute [background:radial-gradient(circle_at_center,_var(--first-color)_0,_var(--first-color)_50%)_no-repeat]`,
                  `[mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)]`,
                  `[transform-origin:center_center]`,
                  `animate-first`,
                  `opacity-100`
                )}
              ></div>
              <div
                className={cn(
                  `absolute [background:radial-gradient(circle_at_center,_rgba(var(--second-color),_0.8)_0,_rgba(var(--second-color),_0)_50%)_no-repeat]`,
                  `[mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)]`,
                  `[transform-origin:calc(50%-400px)]`,
                  `animate-second`,
                  `opacity-100`
                )}
              ></div>
              <div
                className={cn(
                  `absolute [background:radial-gradient(circle_at_center,_rgba(var(--third-color),_0.8)_0,_rgba(var(--third-color),_0)_50%)_no-repeat]`,
                  `[mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)]`,
                  `[transform-origin:calc(50%+400px)]`,
                  `animate-third`,
                  `opacity-100`
                )}
              ></div>
              <div
                className={cn(
                  `absolute [background:radial-gradient(circle_at_center,_rgba(var(--fourth-color),_0.8)_0,_rgba(var(--fourth-color),_0)_50%)_no-repeat]`,
                  `[mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)]`,
                  `[transform-origin:calc(50%-200px)]`,
                  `animate-fourth`,
                  `opacity-70`
                )}
              ></div>
              <div
                className={cn(
                  `absolute [background:radial-gradient(circle_at_center,_rgba(var(--fifth-color),_0.8)_0,_rgba(var(--fifth-color),_0)_50%)_no-repeat]`,
                  `[mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)]`,
                  `[transform-origin:calc(50%-800px)_calc(50%+800px)]`,
                  `animate-fifth`,
                  `opacity-100`
                )}
              ></div>

              {interactive && (
                <div
                  ref={interactiveRef}
                  onMouseMove={handleMouseMove}
                  className={cn(
                    `absolute [background:radial-gradient(circle_at_center,_rgba(var(--pointer-color),_0.8)_0,_rgba(var(--pointer-color),_0)_50%)_no-repeat]`,
                    `[mix-blend-mode:var(--blending-value)] w-full h-full -top-1/2 -left-1/2`,
                    `opacity-70`
                  )}
                ></div>
              )}
            </div>
          </>
        )}
      </div>
      <div className={cn("relative z-10 overflow-y-auto", className)}>
        {children}
      </div>
    </AnimationsOffContext.Provider>
  );
};
