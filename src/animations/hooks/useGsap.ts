"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";




export const useGsap = (
  callback: gsap.ContextFunc,
  dependencies: any[] = [],
  scope?: React.RefObject<Element | null>,
) => {
  useGSAP(callback, { dependencies, scope });
};

export { gsap };

