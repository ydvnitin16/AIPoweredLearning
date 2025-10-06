// src/components/landing/HeroSection.jsx
import React from "react";
import hero from "../../assets/hero.png";
import heroSm from "../../assets/hero2.png";
import Button from "../common/Button.jsx";
import { useNavigate } from "react-router-dom";
import { UseAuthStore } from "../../stores/UseAuthStore.jsx";

export default function HeroSection() {
  const userStore = UseAuthStore(s => s.userStore)
  const navigate = useNavigate();

  return (
    <section id="home" className="relative overflow-hidden" aria-labelledby="landing-heading">
      <div className="absolute inset-0 -z-10">
        <picture>
          <source media="(max-width: 767px)" srcSet={heroSm} />
          <img
            src={hero}
            alt=""
            aria-hidden="true"
            className="h-full w-full object-cover"
            loading="eager"
          />
        </picture>
        <div className="absolute inset-0 bg-black/40" aria-hidden="true" />
      </div>

      <div className="backdrop-blur-sm max-w-7xl mx-auto px-6 md:px-10 py-24 md:py-28 grid md:grid-cols-2 gap-12 items-center">
        <div className="text-white">
          <h1 id="landing-heading" className="text-4xl md:text-6xl font-extrabold leading-tight">
            Study Smarter
            <br />
            With <span className="text-yellow-300">AI-Powered Tools</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-slate-100/90 max-w-2xl">
            Organize your subjects, generate AI-assisted topics, create flashcards and quizzes,
            summarize key points, and visualize concepts—designed to make learning efficient and interactive.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button
              onClick={() => userStore ? navigate("/dashboard") : navigate('/login')}
              name="Start Free"
              bgColor="#facc15"
              color="#0f172a"
            />
            <Button name="Watch Demo" bgColor="#ffffff" color="#0f172a" />
          </div>
        </div>

        <div className="relative" aria-hidden="true">
          <div className="rounded-2xl border border-white/30 bg-white/10 backdrop-blur shadow-2xl p-4 md:p-6">
            <div className="h-72 md:h-[420px] w-full rounded-xl bg-gradient-to-br from-white/60 to-white/10 border border-white/40 flex items-center justify-center text-white/80">
              <span className="text-lg md:text-xl">App preview / screenshot here</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
