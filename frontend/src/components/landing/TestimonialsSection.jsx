import React from "react";
import { Quote } from "lucide-react";

export default function TestimonialsSection() {
  const testimonials = [
    {
                    name: 'Nisha',
                    role: 'Master of Commerce',
                    text: 'SmartStudyAI makes it easy to organize and manage multiple topics and subjects, something that’s hard to do when using AI content alone like chatgpt',
                    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBUEgbDYobsw28lU5DjhvNysrHKFqb1i8IOg&s',
                },
  ];

  return (
    <section className="py-20 border-slate-200 bg-white dark:bg-zinc-900 dark:border-slate-800">
                    <div className="max-w-7xl mx-auto px-6">
                        {/* Heading */}
                        <h3 className="text-3xl md:text-4xl dark:text-white font-bold text-center mb-2">
                            Loved by Students
                        </h3>
                        <p className="text-center text-slate-600 dark:text-slate-300 mb-12">
                            Join thousands of students who've transformed their
                            learning with AI Learn
                        </p>
    
                        {/* Testimonials Grid */}
                        <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
                            {testimonials.map((item) => (
                                <article
                                    key={`${item.name}-${item.role}`}
                                    className="p-6 rounded-xl bg-gradient-to-br from-[#f8fbff] to-[#eef3ff]  dark:bg-gradient-to-br dark:from-[#15151f] dark:to-[#0f0f1c] border-[1px] border-gray-300 dark:border-gray-800 transition"
                                >
                                    <header className="flex items-center gap-4 mb-4">
                                        <Quote className="dark:text-white" />
                                        <div>
                                            <h4 className="font-semibold dark:text-white">
                                                {item.name}
                                            </h4>
                                            <p className="text-xs dark:text-slate-400">
                                                {item.role}
                                            </p>
                                        </div>
                                    </header>
                                    <p className="text-sm italic dark:text-slate-300">
                                        "{item.text}"
                                    </p>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>
  );
}
