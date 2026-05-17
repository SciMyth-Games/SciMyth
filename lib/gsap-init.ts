"use client";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let initialized = false;

export function initGSAP() {
  if (initialized) return;
  if (typeof window === "undefined") return;
  gsap.registerPlugin(ScrollTrigger);
  initialized = true;
}

export { gsap, ScrollTrigger };
