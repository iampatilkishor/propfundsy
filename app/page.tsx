import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import PromoHero from "@/components/PromoHero";
import Firms from "@/components/Firms";
import PlanTable from "@/components/PlanTable";
import Why from "@/components/Why";
import Faq from "@/components/Faq";
import CtaBand from "@/components/CtaBand";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { SpeedInsights } from "@vercel/speed-insights/next";

export default function Home() {
  return (
    <>
      <SpeedInsights />
      <JsonLd />
      <Nav />
      <Hero />
      <PromoHero />
      <Firms />
      <PlanTable />
      <Why />
      <Faq />
      <CtaBand />
      <Footer />
    </>
  );
}
