import type { Metadata } from "next";
import Nav from "@/components/Nav";
import PageHero from "@/components/PageHero";
import MenuList from "@/components/MenuList";
import Courses from "@/components/Courses";
import Statement from "@/components/Statement";
import CtaBand from "@/components/CtaBand";
import Footer from "@/components/Footer";
import Magnetic from "@/components/Magnetic";

export const metadata: Metadata = {
  title: "Courses",
  description: "The Verdigris autumn tasting menu: seven courses cooked over oak, with an optional wine pairing.",
  alternates: { canonical: "/courses" },
};

export default function CoursesPage() {
  return (
    <>
      <Nav />
      <main id="main">
        <PageHero
          kicker="The menu"
          lines={["Seven", "courses"]}
          intro="One tasting menu, served to every table, changing every five or six weeks with the farms."
          image={{ src: "/images/course-4.jpg", alt: "Beef tenderloin with pomme purée, mushrooms and asparagus" }}
        >
          <Magnetic href="#menu" variant="ghost">
            Read the menu
          </Magnetic>
        </PageHero>
        <MenuList />
        <Courses />
        <Statement
          text="Every course is plated at the pass in front of the counter, and most leave the kitchen less than a minute after they come off the fire."
          label="How we serve"
        />
        <CtaBand title="Book the tasting menu" text="Seven courses, about two and a half hours. Tell us about allergies when you book." />
      </main>
      <Footer />
    </>
  );
}
