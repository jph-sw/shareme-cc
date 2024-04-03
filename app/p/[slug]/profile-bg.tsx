import React from "react";
import { useEffect } from "react";
import { AuroraBackground } from "@/components/ui/aurora-background";

export default function ProfileBg(props: any): JSX.Element {
  return (
    <div>
      {props.background == "aurora" ? (
        <AuroraBackground>{props.children}</AuroraBackground>
      ) : props.background == "grid" ? (
        <div className="h-screen w-full dark:bg-black bg-white  dark:bg-grid-white/[0.2] bg-grid-black/[0.2] relative flex items-center justify-center">
          <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
          {props.children}
        </div>
      ) : props.background == "dots" ? (
        <div className="h-[50rem] w-full dark:bg-black bg-white  dark:bg-dot-white/[0.2] bg-dot-black/[0.2] relative flex items-center justify-center">
          <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
          {props.children}
        </div>
      ) : (
        props.children
      )}
    </div>
  );
}
