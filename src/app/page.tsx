
import Image from "next/image";
import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";
import HowItWork from "@/components/landing/HowItWork";
import WhatToAsk from "@/components/landing/WhatToAsk";
import PricingSection from "@/components/landing/PricingSection";
import CTAs from "@/components/landing/CTAs";
import Footers from "@/components/landing/Footers";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";



export default async function Home() {

  const user = await currentUser()

  //redirect auth user to dashboard 
  if (user) redirect("/dashboard");
  return(
    <div className = "min-h-screen bg-background">
        <Header/>
        <Hero/>
        <HowItWork/>
        <WhatToAsk/>
        <PricingSection/>
        <CTAs/>
        <Footers/>
        
       
    </div>
  );
}
