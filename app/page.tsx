"use client";

import { useState } from "react";

import IntroOpening from "@/components/TextOpening";
import Home from "./home/page";

export default function Page() {
  const [introDone, setIntroDone] = useState(false);

  return (
    <>
      {!introDone && (
        <IntroOpening onFinish={() => setIntroDone(true)} />
      )}

      {introDone && <Home />}
    </>
  );
}
