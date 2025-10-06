import React, { useMemo } from "react";
import { Check } from "lucide-react";

export default function PricingSection() {
  const plans = useMemo(
          () => [
              {
                  name: 'Free',
                  price: '$0',
                  desc: 'Perfect to get started and explore basic features.',
                  features: ['Basic AI notes', 'Flashcards', 'Limited sharing'],
              },
              {
                  name: 'Pro',
                  price: '$9/mo',
                  desc: 'Best for students who want to ace their exams.',
                  features: [
                      'Unlimited subjects & topics',
                      'Smart AI explanations',
                      'Advanced quiz generator',
                      'Export & sharing options',
                  ],
                  popular: true,
              },
              {
                  name: 'Team',
                  price: '$19/mo',
                  desc: 'For study groups & organizations.',
                  features: [
                      'Everything in Pro',
                      'Team collaboration',
                      'Shared workspaces',
                      'Priority support',
                  ],
              },
          ],
          []
      );

  return (
    <section
                id="pricing"
                className="py-20 border-slate-200 bg-white dark:bg-zinc-900 dark:border-slate-800 transition-colors duration-300"
            >
                <div className="max-w-6xl mx-auto px-6">
                    {/* Heading */}
                    <h2 className="text-3xl md:text-4xl font-bold text-center text-zinc-900 dark:text-white">
                        Pricing Plans
                    </h2>
                    <p className="text-center text-slate-600 dark:text-slate-300 mt-2 mb-12">
                        Choose a plan that fits your study journey
                    </p>

                    {/* Plans Grid */}
                    <div className="grid md:grid-cols-3 gap-6">
                        {plans.map((plan, i) => (
                            <div
                                key={i}
                                className={`p-6 rounded-2xl border shadow-sm transition
                bg-zinc-50 dark:bg-zinc-800
                border-zinc-200 dark:border-zinc-700
                hover:shadow-lg ${plan.popular ? 'ring-2 ring-blue-500' : ''}`}
                            >
                                <h3 className="text-xl font-semibold text-zinc-900 dark:text-white">
                                    {plan.name}
                                </h3>
                                <p className="mt-2 text-3xl font-bold text-blue-600 dark:text-blue-400">
                                    {plan.price}
                                </p>
                                <p className="text-sm mt-2 text-slate-600 dark:text-slate-400">
                                    {plan.desc}
                                </p>

                                <ul className="mt-6 space-y-2">
                                    {plan.features.map((f, idx) => (
                                        <li
                                            key={idx}
                                            className="flex items-center text-slate-700 dark:text-slate-300"
                                        >
                                            <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                                            {f}
                                        </li>
                                    ))}
                                </ul>

                                <button
                                    className={`mt-6 w-full py-2 rounded-lg font-semibold transition
                  ${
                      plan.popular
                          ? 'bg-blue-600 text-white hover:bg-blue-700'
                          : 'bg-zinc-200 dark:bg-zinc-700 text-zinc-900 dark:text-white hover:bg-zinc-300 dark:hover:bg-zinc-600'
                  }`}
                                >
                                    {plan.popular
                                        ? 'Get Started'
                                        : 'Choose Plan'}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
  );
}
