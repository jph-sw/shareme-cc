import React from "react";
import { useEffect } from "react";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { BackgroundGradientAnimation } from "@/components/ui/bg-gradient-animation";

export default function ProfileBg(props: any): JSX.Element {
  return (
    <div className="h-full w-full">
      {props.background == "aurora" ? (
        <AuroraBackground>{props.children}</AuroraBackground>
      ) : props.background == "grid" ? (
        <div className="h-full w-full dark:bg-grid-white/[0.2] bg-grid-black/[0.2]">
          <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
          {props.children}
        </div>
      ) : props.background == "dots" ? (
        <div className="h-full dark:bg-dot-white/[0.2] bg-dot-black/[0.2]">
          <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
          {props.children}
        </div>
      ) : props.background == "gradient-animation" ? (
        <div className="h-full w-full">
          <BackgroundGradientAnimation>
            {props.children}
          </BackgroundGradientAnimation>
        </div>
      ) : (
        props.children
      )}
    </div>
  );
}
