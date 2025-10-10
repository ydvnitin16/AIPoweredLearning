import { Suspense, lazy } from 'react';
import HeroSection from '../components/landing/HeroSection.jsx';
import FeaturesSection from '../components/landing/FeaturesSection.jsx';
import Loading from '../components/common/Loading.jsx';

// Lazy load below-the-fold components
const ShowcaseSlider = lazy(() => import('../components/landing/ShowcaseSlider.jsx'));
const WhyChooseUs = lazy(() => import('../components/landing/WhyChooseUs.jsx'));
const TestimonialsSection = lazy(() => import('../components/landing/TestimonialsSection.jsx'));
const PricingSection = lazy(() => import('../components/landing/PricingSection.jsx'));
const CTASection = lazy(() => import('../components/landing/CTASection.jsx'));
const Footer = lazy(() => import('../components/landing/Footer.jsx'));

export default function LandingPage() {
    return (
        <div className="min-h-screen flex flex-col font-sans text-slate-800 dark:bg-zinc-900">
            <HeroSection />
            <FeaturesSection />
            <Suspense fallback={<Loading />}>
                <ShowcaseSlider />
            </Suspense>
            <Suspense fallback={<Loading />}>
                <WhyChooseUs />
            </Suspense>
            <Suspense fallback={<Loading />}>
                <TestimonialsSection />
            </Suspense>
            {/* <Suspense fallback={<Loading />}>
                <PricingSection />
            </Suspense> */}
            <Suspense fallback={<Loading />}>
                <CTASection />
            </Suspense>
            <Suspense fallback={<Loading />}>
                <Footer />
            </Suspense>
        </div>
    );
}
