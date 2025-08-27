"use client";

import CustomInput from "@/components/CustomInput";
import Grid from "@/components/Grid";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ReactTyped } from "react-typed";
import { toast } from "sonner";

const Hero = () => {
  const [title, setTitle] = useState<string>("");
  const router = useRouter()

  const handleClick = ()=>{
      if(!title || title.length === 0) return toast.error("You must enter a title");
      

      router.push(`/create?title=${title}`)
  }

  return (
    <main className="hero-main">
      <Grid />
      {/* Hero Section */}
      <section className="hero-section">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <Image
            src="/logo.png" // replace with your logo path
            alt="Forge AI Logo"
            width={80}
            height={80}
            className="rounded-md"
            priority
          />
        </div>

        {/* Title */}
        <h1 className="hero-title">
          Generate Stunning <span className="hero-title-gradient">Logos</span>{" "}
          with Forge AI
        </h1>

        {/* Subtitle */}
        <h2 className="hero-subtitle">
          <ReactTyped
            strings={[
              "Turn your ideas into professional logos instantly.",
              "AI-powered design tailored for your brand.",
              "Save time, boost creativity, and stand out.",
            ]}
            typeSpeed={40}
            backSpeed={20}
            loop
          />
        </h2>

        {/* Input */}
        <div className="hero-input-wrapper">
          <div className="hero-input-container">
            <CustomInput placeholder="Enter Your Logo Name" value={title} setValue={setTitle}/>
          </div>

            <Button onClick={handleClick} className="font-semibold w-full p-5 sm:w-auto" type="button">
              Create
            </Button>
        </div>
      </section>
    </main>
  );
};

export default Hero;
