import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
    ArrowLeft,
    ArrowRight,
    Compass,
    MapPin,
    Users,
    Heart,
    Target,
    Eye,
    ShieldCheck,
    Sparkles,
    Globe2,
    Landmark,
    Route,
    Star,
    Camera,
    Sun,
} from 'lucide-react';

import { usePreferences } from '../../../app/contexts/PreferencesContext.jsx';

// Images
const images = {
    pyramids:
        'https://images.unsplash.com/photo-1710069441986-82759c8a200c?auto=format&fit=crop&w=1400&q=85',

    temple:
        'https://images.unsplash.com/photo-1764686623206-1db9d0b3e18c?auto=format&fit=crop&w=1200&q=85',

    redSea:
        'https://images.unsplash.com/photo-1665643956022-ee053e925743?auto=format&fit=crop&w=1200&q=85',
};

// Scroll Reveal Hook
function useScrollReveal() {
    const elementRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const element = elementRef.current;

        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(element);
                }
            },
            { threshold: 0.12 }
        );

        observer.observe(element);

        return () => observer.disconnect();
    }, []);

    return {
        ref: elementRef,
        className: `scroll-reveal ${isVisible ? 'is-visible' : ''}`,
    };
}

function AboutPage() {
    const { language } = usePreferences();
    const isArabic = language === 'ar';

    const t = {
        en: {
            badge: 'DISCOVER THE BEAUTY OF EGYPT',
            heroTitle: 'Every Journey',
            heroHighlight: 'Tells a Story.',
            heroDesc:
                'From ancient wonders to breathtaking coastlines, discover Egypt through experiences that connect you with its people, culture, and unforgettable places.',
            explore: 'Explore Destinations',
            ourStory: 'OUR STORY',
            storyTitle: 'Connecting people with the magic of Egypt.',
            storyDesc:
                'Egypt is more than a destination. It is a journey through thousands of years of history, vibrant culture, beautiful landscapes, and unforgettable experiences.',
            storyDesc2:
                'WASLA was created to bring travelers, local guides, and amazing destinations together in one place. We make discovering Egypt easier, more personal, and more meaningful.',
            mission: 'OUR MISSION',
            missionTitle: 'Making every journey easier.',
            missionDesc:
                'To connect travelers with authentic local experiences and make exploring Egypt accessible, enjoyable, and memorable.',
            vision: 'OUR VISION',
            visionTitle: 'A world connected through travel.',
            visionDesc:
                'To become a trusted platform that brings people closer to Egypt’s culture, heritage, and hidden destinations.',
           
            servicesLabel: 'WHAT WE OFFER',
            servicesTitle: 'Your journey, all in one place.',
            servicesDesc:
                'Everything you need to discover Egypt and plan your next adventure.',
            places: 'Amazing Destinations',
            placesDesc: 'Explore historical landmarks, natural wonders, and hidden gems.',
            guides: 'Local Tour Guides',
            guidesDesc: 'Meet local guides who bring every destination to life.',
            packages: 'Tour Packages',
            packagesDesc: 'Find trips and experiences that suit your travel plans.',
            whyLabel: 'WHY WASLA?',
            whyTitle: 'Travel made more meaningful.',
            whyDesc:
                'We bring everything together to make your experience simple, connected, and memorable.',
            reason1: 'Everything in One Place',
            reason1Desc: 'Discover destinations, guides, and packages through one platform.',
            reason2: 'Authentic Experiences',
            reason2Desc: 'Get closer to the people, culture, and stories of Egypt.',
            reason3: 'Designed for Travelers',
            reason3Desc: 'Enjoy a simple experience that helps you explore with confidence.',
            reason4: 'Discover More',
            reason4Desc: 'Spend less time searching and more time enjoying your journey.',
            ctaTitle: 'Your next adventure starts here.',
            ctaDesc: 'Egypt is waiting for you. Let WASLA help you find your next story.',
            ctaButton: 'Start Exploring',
            learnMore: 'Discover More',
        },

        ar: {
            badge: 'اكتشف جمال مصر',
            heroTitle: 'كل رحلة',
            heroHighlight: 'وراها حكاية.',
            heroDesc:
                'من عجائب العالم القديم إلى الشواطئ الساحرة، اكتشف مصر من خلال تجارب تجمعك بأهلها وثقافتها وأجمل وجهاتها.',
            explore: 'اكتشف الوجهات',
            ourStory: 'حكايتنا',
            storyTitle: 'بنوصلك بسحر وجمال مصر.',
            storyDesc:
                'مصر مش مجرد وجهة سياحية، دي رحلة عبر آلاف السنين من التاريخ والثقافة والحضارة والمناظر الطبيعية والتجارب اللي متتنسيش.',
            storyDesc2:
                'ومن هنا بدأت WASLA، علشان تجمع المسافرين والمرشدين المحليين وأجمل الوجهات في مكان واحد، وتخلي اكتشاف مصر أسهل وأقرب ليك.',
            mission: 'رسالتنا',
            missionTitle: 'نخلي كل رحلة أسهل وأجمل.',
            missionDesc:
                'ربط المسافرين بالتجارب المحلية الأصيلة، وجعل اكتشاف مصر أسهل وأكثر متعة وثراءً بالذكريات.',
            vision: 'رؤيتنا',
            visionTitle: 'عالم يتواصل من خلال السفر.',
            visionDesc:
                'أن نصبح منصة موثوقة تقرّب الناس من ثقافة مصر وتراثها ووجهاتها المميزة.',
            
            servicesLabel: 'ماذا نقدم؟',
            servicesTitle: 'رحلتك كلها في مكان واحد.',
            servicesDesc:
                'كل اللي تحتاجه علشان تكتشف مصر وتخطط لمغامرتك الجاية.',
            places: 'وجهات سياحية مميزة',
            placesDesc: 'اكتشف المعالم التاريخية والطبيعة والكنوز المخفية.',
            guides: 'مرشدون سياحيون',
            guidesDesc: 'اتعرف على مرشدين محليين يخلّوا لكل مكان حكاية.',
            packages: 'باقات سياحية',
            packagesDesc: 'اختار رحلات وتجارب تناسب خطط سفرك.',
            whyLabel: 'لماذا WASLA؟',
            whyTitle: 'السفر بتجربة مختلفة.',
            whyDesc:
                'بنجمع كل اللي تحتاجه علشان نخلي رحلتك أسهل وأكثر ترابطًا ومتعة.',
            reason1: 'كل شيء في مكان واحد',
            reason1Desc: 'اكتشف الوجهات والمرشدين والرحلات من خلال منصة واحدة.',
            reason2: 'تجارب حقيقية',
            reason2Desc: 'اقترب من الناس والثقافة والحكايات اللي بتميز مصر.',
            reason3: 'مصممة للمسافرين',
            reason3Desc: 'تجربة بسيطة تساعدك تكتشف الأماكن بثقة.',
            reason4: 'اكتشف أكتر',
            reason4Desc: 'وقت أقل في البحث ووقت أكتر في الاستمتاع برحلتك.',
            ctaTitle: 'مغامرتك الجاية بتبدأ من هنا.',
            ctaDesc: 'مصر مستنياك، وWASLA هتساعدك تلاقي حكايتك الجاية.',
            ctaButton: 'ابدأ الاستكشاف',
            learnMore: 'اكتشف المزيد',
        },
    }[language] || {
        


    };

    const content = t ;
    const Arrow = isArabic ? ArrowLeft : ArrowRight;

    const heroReveal = useScrollReveal();
    const storyReveal = useScrollReveal();
    const missionReveal = useScrollReveal();
    const destinationsReveal = useScrollReveal();
    const servicesReveal = useScrollReveal();
    const whyReveal = useScrollReveal();
    const ctaReveal = useScrollReveal();

    const destinations = [
        {
            title: content.giza,
            description: content.gizaDesc,
            image: images.pyramids,
            location: 'Giza, Egypt',
            icon: Landmark,
        },
        {
            title: content.luxor,
            description: content.luxorDesc,
            image: images.temple,
            location: 'Luxor, Egypt',
            icon: Camera,
        },
        {
            title: content.redSea,
            description: content.redSeaDesc,
            image: images.redSea,
            location: 'Sharm El-Sheikh, Egypt',
            icon: Sun,
        },
    ];

    const services = [
        {
            icon: MapPin,
            title: content.places,
            description: content.placesDesc,
            link: '/places',
        },
        {
            icon: Users,
            title: content.guides,
            description: content.guidesDesc,
            link: '/guides',
        },
        {
            icon: Route,
            title: content.packages,
            description: content.packagesDesc,
            link: '/packages',
        },
    ];

    const reasons = [
        { icon: Globe2, title: content.reason1, description: content.reason1Desc },
        { icon: Heart, title: content.reason2, description: content.reason2Desc },
        { icon: ShieldCheck, title: content.reason3, description: content.reason3Desc },
        { icon: Sparkles, title: content.reason4, description: content.reason4Desc },
    ];

    return (
        <main
            dir={isArabic ? 'rtl' : 'ltr'}
            className="overflow-hidden bg-[#FFF8EF] text-[#10243A] dark:bg-[#171E27] dark:text-white"
        >
            {/* HERO */}
            <section className="relative overflow-hidden bg-[#10243A] px-5 py-20 text-white md:py-28">
                <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-[#FF8A32]/15 blur-3xl" />
                <div className="absolute -bottom-40 -left-20 h-96 w-96 rounded-full bg-[#287C78]/20 blur-3xl" />

                <div
                    ref={heroReveal.ref}
                    className={`relative mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2 ${heroReveal.className}`}
                >
                    <div>
                        <span className="inline-flex items-center gap-2 rounded-full border border-[#FF8A32]/40 bg-[#FF8A32]/10 px-4 py-2 text-sm font-bold text-[#FFAD65]">
                            <Compass size={17} />
                            {content.badge}
                        </span>

                        <h1 className="mt-7 text-5xl font-black leading-tight sm:text-6xl lg:text-7xl">
                            {content.heroTitle}
                            <span className="block text-[#FF8A32]">
                                {content.heroHighlight}
                            </span>
                        </h1>

                        <p className="mt-7 max-w-xl text-lg leading-9 text-white/75">
                            {content.heroDesc}
                        </p>

                        <Link
                            to="/places"
                            className="mt-9 inline-flex items-center gap-3 rounded-xl bg-[#FF8A32] px-7 py-4 font-bold text-[#10243A] transition hover:-translate-y-1 hover:bg-[#FFAD65]"
                        >
                            {content.explore}
                            <Arrow size={19} />
                        </Link>

                        <div className="mt-12 flex flex-wrap gap-8 text-sm text-white/70">
                            <div className="flex items-center gap-2">
                                <Landmark className="text-[#FFAD65]" size={20} />
                                Ancient History
                            </div>
                            <div className="flex items-center gap-2">
                                <Sun className="text-[#FFAD65]" size={20} />
                                Natural Beauty
                            </div>
                        </div>
                    </div>

                    {/* Hero image collage */}
                    <div className="relative mx-auto h-[430px] w-full max-w-xl">
                        <div className="absolute inset-5 rotate-3 rounded-[2rem] border border-[#FF8A32]/50" />

                        <img
                            src={images.pyramids}
                            alt="The Pyramids of Giza in Egypt"
                            className="absolute inset-0 h-full w-[82%] rounded-[2rem] object-cover shadow-2xl"
                        />

                        <div className="absolute bottom-5 right-0 w-[48%] rounded-2xl border-4 border-[#10243A] bg-[#10243A] p-2 shadow-2xl">
                            <img
                                src={images.temple}
                                alt="Ancient Egyptian temple"
                                className="h-40 w-full rounded-xl object-cover"
                            />
                        </div>

                        <div className="absolute right-4 top-7 rounded-2xl border border-white/20 bg-white/10 px-5 py-4 shadow-xl backdrop-blur-lg">
                            <div className="flex items-center gap-2 text-[#FFAD65]">
                                <Star size={17} fill="currentColor" />
                                <span className="text-sm font-bold">Explore Egypt</span>
                            </div>
                            <p className="mt-1 text-xs text-white/75">
                                Discover something unforgettable
                            </p>
                        </div>

                        <div className="absolute bottom-0 left-4 rounded-xl bg-[#FF8A32] p-4 text-[#10243A] shadow-xl">
                            <MapPin size={25} />
                        </div>
                    </div>
                </div>
            </section>

            {/* STORY */}
            <section className="px-5 py-24">
                <div
                    ref={storyReveal.ref}
                    className={`mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2 ${storyReveal.className}`}
                >
                    <div className="relative">
                        <img
                            src={images.temple}
                            alt="Egyptian ancient architecture"
                            className="h-[390px] w-full rounded-[2rem] object-cover shadow-xl"
                        />
                        <div className="absolute -bottom-7 -right-5 rounded-2xl bg-[#FF8A32] p-5 text-[#10243A] shadow-xl">
                            <Compass size={35} />
                        </div>
                    </div>

                    <div>
                        <span className="font-extrabold tracking-[0.2em] text-[#E87525]">
                            {content.ourStory}
                        </span>
                        <h2 className="mt-5 text-3xl font-black leading-tight md:text-4xl">
                            {content.storyTitle}
                        </h2>
                        <div className="my-6 h-1.5 w-20 rounded-full bg-[#FF8A32]" />

                        <p className="leading-9 text-[#617080] dark:text-gray-300">
                            {content.storyDesc}
                        </p>
                        <p className="mt-5 leading-9 text-[#617080] dark:text-gray-300">
                            {content.storyDesc2}
                        </p>
                    </div>
                </div>
            </section>

            {/* MISSION & VISION */}
            <section className="bg-white px-5 py-20 dark:bg-[#202A35]">
                <div
                    ref={missionReveal.ref}
                    className={`mx-auto grid max-w-7xl gap-7 md:grid-cols-2 ${missionReveal.className}`}
                >
                    <article className="rounded-3xl bg-[#FFF8EF] p-9 dark:bg-[#171E27]">
                        <div className="mb-7 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FF8A32]/15 text-[#E87525]">
                            <Target size={30} />
                        </div>
                        <span className="font-extrabold tracking-widest text-[#E87525]">
                            {content.mission}
                        </span>
                        <h3 className="mt-4 text-2xl font-black">
                            {content.missionTitle}
                        </h3>
                        <p className="mt-4 leading-8 text-[#617080] dark:text-gray-300">
                            {content.missionDesc}
                        </p>
                    </article>

                    <article className="rounded-3xl bg-[#10243A] p-9 text-white">
                        <div className="mb-7 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-[#FFAD65]">
                            <Eye size={30} />
                        </div>
                        <span className="font-extrabold tracking-widest text-[#FFAD65]">
                            {content.vision}
                        </span>
                        <h3 className="mt-4 text-2xl font-black">
                            {content.visionTitle}
                        </h3>
                        <p className="mt-4 leading-8 text-white/70">
                            {content.visionDesc}
                        </p>
                    </article>
                </div>
            </section>

            {/* SERVICES */}
            <section className="bg-white px-5 py-20 dark:bg-[#202A35]">
                <div className="mx-auto max-w-7xl">
                    <div className="mb-14 text-center">
                        <span className="font-extrabold tracking-widest text-[#E87525]">
                            {content.servicesLabel}
                        </span>
                        <h2 className="mt-4 text-3xl font-black md:text-4xl">
                            {content.servicesTitle}
                        </h2>
                        <p className="mx-auto mt-5 max-w-2xl leading-8 text-[#617080] dark:text-gray-300">
                            {content.servicesDesc}
                        </p>
                    </div>

                    <div
                        ref={servicesReveal.ref}
                        className={`grid gap-7 md:grid-cols-3 ${servicesReveal.className}`}
                    >
                        {services.map((service, index) => {
                            const Icon = service.icon;

                            return (
                                <Link
                                    to={service.link}
                                    key={service.title}
                                    className="group rounded-3xl border border-[#E8E5DE] p-8 transition duration-300 hover:-translate-y-2 hover:border-[#FF8A32] hover:shadow-xl dark:border-white/10"
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FF8A32]/15 text-[#E87525] transition group-hover:bg-[#FF8A32] group-hover:text-white">
                                            <Icon size={28} />
                                        </div>
                                        <span className="font-bold text-gray-300">
                                            0{index + 1}
                                        </span>
                                    </div>
                                    <h3 className="mt-7 text-xl font-black">
                                        {service.title}
                                    </h3>
                                    <p className="mt-4 leading-8 text-[#617080] dark:text-gray-300">
                                        {service.description}
                                    </p>
                                    <span className="mt-6 inline-flex items-center gap-2 font-bold text-[#E87525]">
                                        {content.learnMore}
                                        <Arrow size={17} />
                                    </span>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* WHY WASLA */}
            <section className="bg-[#10243A] px-5 py-24 text-white">
                <div className="mx-auto max-w-7xl">
                    <div className="mb-14 text-center">
                        <span className="font-extrabold tracking-widest text-[#FFAD65]">
                            {content.whyLabel}
                        </span>
                        <h2 className="mt-4 text-3xl font-black md:text-4xl">
                            {content.whyTitle}
                        </h2>
                        <p className="mx-auto mt-5 max-w-2xl leading-8 text-white/65">
                            {content.whyDesc}
                        </p>
                    </div>

                    <div
                        ref={whyReveal.ref}
                        className={`grid gap-10 sm:grid-cols-2 lg:grid-cols-4 ${whyReveal.className}`}
                    >
                        {reasons.map((reason) => {
                            const Icon = reason.icon;

                            return (
                                <article key={reason.title} className="text-center">
                                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 text-[#FFAD65]">
                                        <Icon size={30} />
                                    </div>
                                    <h3 className="mt-6 font-bold">
                                        {reason.title}
                                    </h3>
                                    <p className="mt-3 text-sm leading-7 text-white/65">
                                        {reason.description}
                                    </p>
                                </article>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* FINAL CTA */}
            <section className="px-5 py-24">
                <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-[#FF8A32] px-7 py-16 text-center text-[#10243A] md:px-16">
                    <div className="absolute -right-16 -top-24 h-64 w-64 rounded-full border-[35px] border-white/15" />
                    <div className="absolute -bottom-28 -left-16 h-64 w-64 rounded-full border-[35px] border-white/15" />

                    <div
                        ref={ctaReveal.ref}
                        className={`relative mx-auto max-w-2xl ${ctaReveal.className}`}
                    >
                        <Sparkles className="mx-auto mb-6" size={38} />
                        <h2 className="text-3xl font-black md:text-4xl">
                            {content.ctaTitle}
                        </h2>
                        <p className="mt-5 leading-8 text-[#10243A]/75">
                            {content.ctaDesc}
                        </p>

                        <Link
                            to="/places"
                            className="mt-8 inline-flex items-center gap-3 rounded-xl bg-[#10243A] px-8 py-4 font-bold text-white transition hover:-translate-y-1 hover:bg-[#1C3B58]"
                        >
                            {content.ctaButton}
                            <Arrow size={19} />
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default AboutPage;