import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Firms from "@/components/Firms";
import PlanTable from "@/components/PlanTable";
import Why from "@/components/Why";
import Faq from "@/components/Faq";
import CtaBand from "@/components/CtaBand";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";

export default function Home() {
  return (
    <>
      <JsonLd />
      <Nav />
      <Hero />
      <Firms />
      <PlanTable />
      <Why />
      <Faq />
      <CtaBand />
      <Footer />
    </>
  );
}
