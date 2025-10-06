import ShowcaseSlider from '../components/landing/ShowcaseSlider.jsx';
import HeroSection from '../components/landing/HeroSection.jsx';
import FeaturesSection from '../components/landing/FeaturesSection.jsx';
import WhyChooseUs from '../components/landing/WhyChooseUs.jsx';
import TestimonialsSection from '../components/landing/TestimonialsSection.jsx';
import PricingSection from '../components/landing/PricingSection.jsx';
import CTASection from '../components/landing/CTASection.jsx';
import Footer from '../components/landing/Footer.jsx';

export default function LandingPage() {
    return (
        <div className="min-h-screen flex flex-col font-sans text-slate-800 dark:bg-zinc-900">
            <HeroSection />
            <FeaturesSection />
            <ShowcaseSlider />
            <WhyChooseUs />
            <TestimonialsSection />
            {/* <PricingSection /> */}
            <CTASection />
            <Footer />
        </div>
    );
}
