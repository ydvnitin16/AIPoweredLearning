// src/pages/LandingPage.jsx
import React, { useState } from 'react';
import image from '../assets/AiPoweredImage.png';
import Button from '../components/common/button'; // uses your custom Button (name, bgColor, color, ...)
import {
    BookOpen,
    Brain,
    Sparkles,
    Share2,
    BarChart3,
    MessageSquare,
    Layers,
    CheckCircle2,
    Users,
    Twitter,
    Linkedin,
} from 'lucide-react';

export default function LandingPage() {
    const categories = [
        {
            key: 'Notes',
            title: 'Smart Note Taking',
            desc: [
                'Auto-summarize long texts',
                'Highlight key concepts',
                'Organize by topic',
            ],
            img: image,
        },
        {
            key: 'Flashcards',
            title: 'AI Flashcards',
            desc: [
                'Instantly generate flashcards',
                'Spaced repetition learning',
                'Engage with quizzes',
            ],
            img: '/images/flashcards.png',
        },
        {
            key: 'Quizzes',
            title: 'Auto Quizzes',
            desc: [
                'Generate MCQs instantly',
                'Track progress & accuracy',
                'Adaptive difficulty levels',
            ],
            img: '/images/quizzes.png',
        },
        {
            key: 'Summaries',
            title: 'AI Summaries',
            desc: [
                'Condense lengthy texts',
                'Key point extraction',
                'Multiple summary styles',
            ],
            img: '/images/summaries.png',
        },
        {
            key: 'AI Tutor',
            title: 'Personal AI Tutor',
            desc: [
                'Ask any question',
                'Step-by-step explanations',
                '24/7 instant guidance',
            ],
            img: '/images/tutor.png',
        },
    ];
    const plans = [
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
    ];
    const testimonials = [
        {
            name: 'Sarah Chen',
            role: 'Computer Science @ MIT',
            text: 'AI Learn helped me ace my finals by condensing 200 pages of notes into digestible flashcards. Study time cut by 70%!',
            image: 'https://i.pravatar.cc/100?img=1',
        },
        {
            name: 'Marcus Johnson',
            role: 'Pre-Med @ Stanford',
            text: 'The AI tutor explains complex anatomy concepts better than my professors. My grades went from B+ to A+ in one semester!',
            image: 'https://i.pravatar.cc/100?img=2',
        },
        {
            name: 'Priya Patel',
            role: 'Business @ Wharton',
            text: 'Shared study guides with my study group and we all scored top 10% in our finance exam. Collaboration made easy!',
            image: 'https://i.pravatar.cc/100?img=3',
        },
        {
            name: 'Alex Kim',
            role: 'Engineering @ Berkeley',
            text: 'The quiz generator creates questions that feel exactly like my actual exams. Best study tool I’ve ever used!',
            image: 'https://i.pravatar.cc/100?img=4',
        },
        {
            name: 'Emma Rodriguez',
            role: 'Law @ Harvard',
            text: 'Summarized 500-page case studies into key points. Saved me 15 hours per exam!',
            image: 'https://i.pravatar.cc/100?img=5',
        },
    ];

    const [activeCategory, setActiveCategory] = useState(categories[0]);

    return (
        <div className="min-h-screen flex flex-col font-sans text-slate-800">
            {/* Navbar */}
            <header className="w-full sticky top-0 z-50 backdrop-blur border-gray-700 border-b-[0.1px]">
                <div className="max-w-7xl mx-auto flex items-center justify-between py-4 px-6">
                    <a
                        href="#home"
                        className="text-2xl font-extrabold bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent"
                    >
                        AI Learn
                    </a>
                    <nav className="hidden md:flex gap-8 text-sm font-medium text-slate-700">
                        {[
                            { href: '#features', label: 'Features' },
                            { href: '#specialties', label: 'Why Us' },
                            { href: '#pricing', label: 'Pricing' },
                            { href: '#docs', label: 'Docs' },
                            { href: '#contact', label: 'Contact' },
                        ].map((item) => (
                            <a
                                key={item.href}
                                href={item.href}
                                className="relative group"
                            >
                                {item.label}
                                <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600 transition-all duration-300 group-hover:w-full" />
                            </a>
                        ))}
                    </nav>
                    <div className="hidden md:block min-w-[140px]">
                        <Button name="Get Started" bgColor="#4f46e5" />
                    </div>
                    <div className="md:hidden">
                        <Button name="Get Started" bgColor="#4f46e5" />
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section id="home" className="relative overflow-hidden">
                <div className="absolute inset-0 -z-10 bg-gradient-to-br from-violet-600 via-indigo-600 to-blue-600" />
                <div
                    className="absolute inset-0 -z-10 opacity-20"
                    style={{
                        backgroundImage:
                            'radial-gradient(800px 300px at 10% 20%, rgba(255,255,255,0.35), transparent), radial-gradient(600px 300px at 90% 60%, rgba(255,255,255,0.2), transparent)',
                    }}
                />

                <div className="max-w-7xl mx-auto px-6 md:px-10 py-24 md:py-28 grid md:grid-cols-2 gap-12 items-center">
                    <div className="text-white">
                        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
                            Unlock Smarter Learning
                            <br />
                            With <span className="text-yellow-300">AI</span>
                        </h1>
                        <p className="mt-6 text-lg md:text-xl text-slate-100/90 max-w-2xl">
                            Transform your study routine with AI‑powered tools.
                            Generate notes, flashcards, quizzes, summaries, and
                            get personalized tutoring—all in one platform.
                        </p>
                        <div className="mt-8 flex flex-wrap gap-4">
                            <Button
                                name="Start Free"
                                bgColor="#facc15"
                                color="#0f172a"
                            />
                            <Button
                                name="Watch Demo"
                                bgColor="#ffffff"
                                color="#0f172a"
                            />
                        </div>
                        <div className="mt-10 flex flex-wrap items-center gap-6 text-slate-100/90">
                            <div className="flex items-center gap-2">
                                <CheckCircle2 className="w-5 h-5" /> No credit
                                card
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle2 className="w-5 h-5" /> 2-minute
                                setup
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle2 className="w-5 h-5" /> Cancel
                                anytime
                            </div>
                        </div>
                    </div>

                    {/* Hero mockup */}
                    <div className="relative">
                        <div className="rounded-2xl border border-white/30 bg-white/10 backdrop-blur shadow-2xl p-4 md:p-6">
                            <div className="h-72 md:h-[420px] w-full rounded-xl bg-gradient-to-br from-white/60 to-white/10 border border-white/40 flex items-center justify-center text-white/80">
                                <span className="text-lg md:text-xl">
                                    App preview / screenshot here
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Categories showcase */}
            <section
                id="features"
                className="py-20 border-t border-slate-200 bg-white dark:bg-zinc-900 dark:border-slate-800"
            >
                <div className="max-w-7xl mx-auto px-6">
                    {/* Heading */}
                    <h3 className="text-3xl md:text-4xl font-bold text-center mb-4 text-slate-900 dark:text-white">
                        Everything You Need to Learn Smarter
                    </h3>
                    <p className="text-slate-600 dark:text-slate-300 text-center max-w-2xl mx-auto mb-10">
                        Explore our powerful AI tools designed to accelerate
                        your learning journey.
                    </p>

                    {/* Tabs */}
                    <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-10">
                        {categories &&
                            categories.map((c) => (
                                <button
                                    key={c.key}
                                    onClick={() => setActiveCategory(c)}
                                    className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                                        activeCategory === c.key
                                            ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow'
                                            : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700'
                                    }`}
                                >
                                    {c.key}
                                </button>
                            ))}
                    </div>

                    {/* Active Tab Panel */}
                    <div className="grid md:grid-cols-2 gap-10 md:gap-12 items-center">
                        {/* Left side */}
                        <div>
                            <h4 className="text-2xl font-semibold mb-4 text-slate-900 dark:text-white">
                                {activeCategory.title}
                            </h4>
                            <ul className="space-y-2 mb-6">
                                {activeCategory.desc.map((d, i) => (
                                    <li
                                        key={i}
                                        className="flex items-start gap-2 text-slate-700 dark:text-slate-300"
                                    >
                                        <span className="text-green-500">
                                            ✓
                                        </span>{' '}
                                        {d}
                                    </li>
                                ))}
                            </ul>
                            <div className="flex gap-3">
                                <Button
                                    name={`Try ${activeCategory}`}
                                    bgColor="#4f46e5"
                                    color="#fff"
                                />
                                <Button
                                    name="See Docs"
                                    bgColor="#e2e8f0"
                                    color="#0f172a"
                                />
                            </div>
                        </div>

                        {/* Right side (Image) */}
                        <div className="flex justify-center">
                            <img
                                src={activeCategory.img}
                                alt={activeCategory.title}
                                className="rounded-xl border border-slate-200 dark:border-slate-700 shadow-lg w-full max-w-md"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Us / Specialties */}
            <section id="specialties" className="py-20 bg-zinc-900 text-white">
                <div className="max-w-7xl mx-auto px-6">
                    <h3 className="text-3xl md:text-4xl font-bold text-center mb-4">
                        Why Choose AI Learn?
                    </h3>
                    <p className="text-slate-400 text-center max-w-2xl mx-auto mb-12">
                        Experience the future of learning with cutting-edge AI
                        technology designed for your success
                    </p>

                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            {
                                title: 'Fastest Revision',
                                desc: 'Condense hours of study into minutes with AI-powered skimming and summarization.',
                                icon: '🚀',
                            },
                            {
                                title: 'Subject Agnostic',
                                desc: 'From math to medicine, learn any subject with specialized AI assistance.',
                                icon: '📚',
                            },
                            {
                                title: 'Personalized AI Tutor',
                                desc: 'Get tailored explanations and guidance based on your unique learning style.',
                                icon: '🎯',
                            },
                            {
                                title: 'Real Exam Practice',
                                desc: 'Practice with AI-generated questions modeled after actual exams and certifications.',
                                icon: '📝',
                            },
                            {
                                title: 'Share & Import',
                                desc: 'Collaborate with peers and import resources from anywhere in seconds.',
                                icon: '🌍',
                            },
                            {
                                title: 'Analytics',
                                desc: 'Track your progress with detailed insights on learning patterns and improvement areas.',
                                icon: '📊',
                            },
                        ].map(({ title, desc, icon }) => (
                            <div
                                key={title}
                                className="bg-gradient-to-br from-[#0f0f1c] to-[#1a1a2e] rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-xl transition relative"
                            >
                                <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-tr from-violet-500 to-indigo-500 mb-6 text-2xl">
                                    {icon}
                                </div>
                                <h4 className="text-lg font-semibold mb-2">
                                    {title}
                                </h4>
                                <p className="text-slate-300">{desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Social Testimonials */}
            <section className="py-20 bg-zinc-900 text-white">
                <div className="max-w-7xl mx-auto px-6">
                    {/* Heading */}
                    <h3 className="text-3xl md:text-4xl font-bold text-center mb-2">
                        Loved by Students
                    </h3>
                    <p className="text-center text-slate-400 mb-12">
                        Join thousands of students who've transformed their
                        learning with AI Learn
                    </p>

                    {/* Testimonials Grid */}
                    <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
                        {testimonials.map((item, i) => (
                            <article
                                key={i}
                                className="p-6 rounded-xl bg-zinc-800 border border-zinc-700 shadow hover:shadow-lg transition"
                            >
                                <header className="flex items-center gap-4 mb-4">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-12 h-12 rounded-full object-cover"
                                    />
                                    <div>
                                        <h4 className="font-semibold">
                                            {item.name}
                                        </h4>
                                        <p className="text-xs text-slate-400">
                                            {item.role}
                                        </p>
                                    </div>
                                </header>
                                <p className="text-sm italic text-slate-300">
                                    "{item.text}"
                                </p>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {/* Pricing Plans */}
            <section className="py-20 bg-white dark:bg-zinc-900 transition-colors duration-300">
                <div className="max-w-6xl mx-auto px-6">
                    {/* Heading */}
                    <h2 className="text-3xl md:text-4xl font-bold text-center text-zinc-900 dark:text-white">
                        Pricing Plans
                    </h2>
                    <p className="text-center text-slate-600 dark:text-slate-400 mt-2 mb-12">
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

            {/* Extra CTA */}
            <section className="py-20 bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600 text-white text-center dark:from-violet-700 dark:via-indigo-700 dark:to-blue-700 transition-colors duration-300">
                <h3 className="text-3xl md:text-4xl font-bold mb-3">
                    Ready to Learn Smarter?
                </h3>
                <p className="opacity-90 max-w-2xl mx-auto mb-8 text-zinc-100 dark:text-zinc-200">
                    Join thousands of students transforming their learning with
                    AI Learn. Start free today—no credit card needed.
                </p>

                {/* Buttons */}
                <div className="flex justify-center gap-4">
                    <button className="px-6 py-3 rounded-lg font-semibold bg-yellow-400 text-slate-900 hover:bg-yellow-300 transition">
                        Start Free Today
                    </button>
                    <button className="px-6 py-3 rounded-lg font-semibold bg-white text-slate-900 hover:bg-zinc-100 dark:bg-zinc-800 dark:text-white dark:hover:bg-zinc-700 transition">
                        Learn More
                    </button>
                </div>
            </section>

            {/* Footer */}
            <footer id="contact" className="bg-slate-950 text-slate-300">
                <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-4 gap-10">
                    <div>
                        <div className="text-xl font-extrabold bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
                            AI Learn
                        </div>
                        <p className="mt-3 text-sm text-slate-400">
                            Transform your learning with AI‑powered tools
                            designed for modern students.
                        </p>
                    </div>
                    <div>
                        <h5 className="font-semibold mb-3">Product</h5>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <a
                                    href="#features"
                                    className="hover:text-white"
                                >
                                    Features
                                </a>
                            </li>
                            <li>
                                <a href="#pricing" className="hover:text-white">
                                    Pricing
                                </a>
                            </li>
                            <li>
                                <a href="#docs" className="hover:text-white">
                                    Docs
                                </a>
                            </li>
                            <li>
                                <a href="#contact" className="hover:text-white">
                                    Contact
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h5 className="font-semibold mb-3">Support</h5>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <a href="#" className="hover:text-white">
                                    Help Center
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-white">
                                    API Reference
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-white">
                                    Community
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-white">
                                    Status
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h5 className="font-semibold mb-3">Company</h5>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <a href="#" className="hover:text-white">
                                    About
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-white">
                                    Blog
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-white">
                                    Careers
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-white">
                                    Privacy
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-slate-800 py-6 text-center text-xs text-slate-500">
                    © {new Date().getFullYear()} AI Learn. All rights reserved.
                </div>
            </footer>
        </div>
    );
}
