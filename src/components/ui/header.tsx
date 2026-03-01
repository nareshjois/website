"use client";
import { useEffect, useState } from "react";
import { GlassTabs, GlassTabsList, GlassTabsTrigger } from "./glass-tabs";
import { GlassSwitch } from "./glass-switch";
import {
  GlassTooltip,
  GlassTooltipContent,
  GlassTooltipProvider,
  GlassTooltipTrigger,
} from "./glass-tooltip";
import {
  getAnimationsOff,
  setAnimationsOffGlobal,
} from "./background-gradient-animation";

export default function HeaderWithTabs({ pathname }: { pathname: string }) {
  const [activeTab, setActiveTab] = useState("home");
  const [animationsOff, setAnimationsOff] = useState(false);

  // Sync from localStorage after mount / when returning to a page that shows the switch (SSR gives false)
  useEffect(() => {
    setAnimationsOff(getAnimationsOff());
  }, [pathname]);

  useEffect(() => {
    if (pathname === "/") {
      setActiveTab("home");
    } else if (pathname.startsWith("/blog")) {
      setActiveTab("blog");
    } else if (pathname === "/about") {
      setActiveTab("about");
    }
  }, [pathname]);

  const isHome = pathname === "/";

  return (
    <header className="fixed top-2 z-50 bg-transparent w-full flex justify-center">
      <GlassTabs value={activeTab} onValueChange={setActiveTab}>
        <GlassTabsList className="w-full max-w-2xl">
          <img src="/logo.svg" alt="Logo" className="w-10 h-10" />
          <GlassTabsTrigger value="home" asChild>
            <a href="/" className="text-white">Home</a>
          </GlassTabsTrigger>
          <GlassTabsTrigger value="blog" asChild>
            <a href="/blog" className="text-white">Blog</a>
          </GlassTabsTrigger>
          <GlassTabsTrigger value="about" asChild>
            <a href="/about" className="text-white">About</a>
          </GlassTabsTrigger>
          {!isHome && (
            <div className="ml-auto flex items-center">
              <GlassTooltipProvider>
                <GlassTooltip>
                  <GlassTooltipTrigger asChild>
                    <span className="inline-flex cursor-pointer">
                      <GlassSwitch
                        checked={!animationsOff}
                        onCheckedChange={(value) => {
                          setAnimationsOff(!value);
                          setAnimationsOffGlobal(!value);
                        }}
                      />
                    </span>
                  </GlassTooltipTrigger>
                  <GlassTooltipContent>
                    {animationsOff ? "ADHD. need distractions." : "Turn off background animations, its fucking distracting"}
                  </GlassTooltipContent>
                </GlassTooltip>
              </GlassTooltipProvider>
            </div>
          )}
        </GlassTabsList>
      </GlassTabs>
    </header>
  );
}
