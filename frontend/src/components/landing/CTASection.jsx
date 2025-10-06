import React from "react";
import { useNavigate } from "react-router";
import { UseAuthStore } from "../../stores/UseAuthStore";

export default function CTASection() {
  const userStore = UseAuthStore(s => s.userStore) 
  const navigate = useNavigate()
  return (
    <section className="py-20 bg-indigo-600 text-white text-center">
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="text-4xl font-bold mb-4">
          Ready to Supercharge Your Learning?
        </h2>
        <p className="text-lg text-indigo-100 mb-8">
          Start using SmartStudyAI today and make revision effortless, interactive, and AI-powered.
        </p>
        <button onClick={() => userStore ? navigate("/dashboard") : navigate('/login')} className="bg-white text-indigo-600 px-8 py-3 rounded-xl font-semibold hover:bg-indigo-100 transition cursor-pointer">
          Get Started for Free
        </button>
      </div>
    </section>
  );
}
