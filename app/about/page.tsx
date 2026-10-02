import type { Metadata } from "next";
import Nav from "@/components/Nav";
import PageHero from "@/components/PageHero";
import Statement from "@/components/Statement";
import ChefSplit from "@/components/ChefSplit";
import Triptych from "@/components/Triptych";
import Milestones from "@/components/Milestones";
import CtaBand from "@/components/CtaBand";
import Footer from "@/components/Footer";
import { about } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description: "The story of Verdigris: a former foundry, one oak-fired hearth and ten years of cooking with two local farms.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <Nav />
      <main id="main">
        <PageHero
          kicker="About us"
          lines={["Ten years", "at the fire"]}
          intro="A small dining room in an old foundry, run by the same two people since the day it opened."
          image={{ src: "/images/about-hero.jpg", alt: "A linen napkin on a wooden table in the candlelit dining room" }}
        />
        <Statement text={about.story} label="Our story" />
        <ChefSplit />
        <Triptych word="Hearth" items={about.values} label="What we believe" />
        <Milestones />
        <CtaBand />
      </main>
      <Footer />
    </>
  );
}
