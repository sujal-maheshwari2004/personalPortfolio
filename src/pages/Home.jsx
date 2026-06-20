import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Stack from "@/components/Stack";
import OpenSource from "@/components/OpenSource";
import Contact from "@/components/Contact";
import SideIndex from "@/components/SideIndex";
import useDocumentMeta from "@/hooks/useDocumentMeta";
import { scrollToId } from "@/lib/scroll";

export default function Home() {
  const { state } = useLocation();

  useDocumentMeta({
    title: "Sujal Maheshwari — Full-Stack AI Developer",
    description:
      "Full-Stack AI Developer building production-grade LLM systems, training language models from scratch, and shipping agentic infrastructure.",
  });

  useEffect(() => {
    if (state?.scrollTo) {
      const t = setTimeout(() => scrollToId(state.scrollTo), 120);
      return () => clearTimeout(t);
    }
  }, [state]);

  return (
    <>
      <SideIndex />
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Stack />
      <OpenSource />
      <Contact />
    </>
  );
}
