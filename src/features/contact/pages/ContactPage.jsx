import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
    ArrowLeft,
    ArrowRight,
    Mail,
    MapPin,
    Phone,
    Clock,
    Send,
    MessageCircle,
    Headphones,
    Compass,
    Globe2,
    ChevronDown,
    Sparkles,
    Heart,
} from 'lucide-react';

import { usePreferences } from '../../../app/contexts/PreferencesContext.jsx';

// Tourism images
const images = {
    hero: '/images/egypt-pyramids.jpg',
    pyramids: 'https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?auto=format&fit=crop&w=900&q=85',
    landscape: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=85',
};

// Scroll Reveal
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
            {
                threshold: 0.12,
            }
        );

        observer.observe(element);

        return () => observer.disconnect();
    }, []);

    return {
        ref: elementRef,
        className: `scroll-reveal ${isVisible ? 'is-visible' : ''}`,
    };
}

function ContactPage() {
    const { language } = usePreferences();
    const isArabic = language === 'ar';

    const content = {
        en: {
            badge: 'LET’S CONNECT',
            heroTitle: 'We’re Here to',
            heroHighlight: 'Help You Explore.',
            heroDescription:
                'Have a question, need travel guidance, or want to share your experience? We would love to hear from you. Let’s make your next journey unforgettable.',
            heroButton: 'Send Us a Message',
            heroSecondary: 'Explore Destinations',

            contactLabel: 'CONTACT US',
            contactTitle: 'Let’s start a conversation.',
            contactDescription:
                'Whether you are planning a trip, looking for a local guide, or simply have a question, our team is ready to help.',

            emailTitle: 'Email Us',
            emailDescription: 'Send us your questions anytime.',
            phoneTitle: 'Call Us',
            phoneDescription: 'We are happy to assist you.',
            locationTitle: 'Our Location',
            locationDescription: 'Proudly connecting travelers with Egypt.',
            hoursTitle: 'Working Hours',
            hoursDescription: 'We are here to help with your inquiries.',

            formLabel: 'SEND A MESSAGE',
            formTitle: 'We would love to hear from you.',
            formDescription:
                'Fill in the form below and tell us how we can help.',
            nameLabel: 'Full Name',
            namePlaceholder: 'Enter your full name',
            emailLabel: 'Email Address',
            emailPlaceholder: 'example@email.com',
            subjectLabel: 'Subject',
            subjectPlaceholder: 'What is your message about?',
            messageLabel: 'Your Message',
            messagePlaceholder: 'Tell us how we can help you...',
            sendButton: 'Send Message',
            formNote: 'Please fill in all fields before sending.',
            emailNotConfigured:
                'The contact email has not been configured yet. Please contact the project administrator.',
            emailReady: 'Your email application is opening.',

            faqLabel: 'COMMON QUESTIONS',
            faqTitle: 'Got questions?',
            faqDescription:
                'Here are some answers to help you get started.',
            faq1: 'How can I explore destinations on WASLA?',
            faq1Answer:
                'Visit our Places page to discover destinations across Egypt, explore their details, and find places that match your interests.',
            faq2: 'Can I contact a local tour guide?',
            faq2Answer:
                'Yes! Visit our Guides page to explore available guides and learn more about their services.',
            faq3: 'How can I learn about tour packages?',
            faq3Answer:
                'You can browse our Packages page to discover different travel experiences and available trips.',
            faq4: 'Can I share feedback or report an issue?',
            faq4Answer:
                'Absolutely. Use the contact form on this page to share your feedback, questions, or any issue you experience.',

            ctaTitle: 'Every great journey starts with a conversation.',
            ctaDescription:
                'Let us help you discover the beauty, history, and hidden gems of Egypt.',
            ctaButton: 'Explore Egypt',
            footerNote: 'WASLA — Connecting You to Egypt.',
        },

        ar: {
            badge: 'خلينا نتواصل',
            heroTitle: 'إحنا هنا',
            heroHighlight: 'علشان نساعدك.',
            heroDescription:
                'عندك سؤال؟ محتاج مساعدة في التخطيط لرحلتك؟ أو حابب تشاركنا تجربتك؟ يسعدنا نسمع منك ونساعدك تخلي رحلتك الجاية تجربة متتنسيش.',
            heroButton: 'ابعتلنا رسالة',
            heroSecondary: 'اكتشف الوجهات',

            contactLabel: 'تواصل معنا',
            contactTitle: 'خلينا نبدأ كلامنا.',
            contactDescription:
                'سواء بتخطط لرحلة، أو بتدور على مرشد سياحي، أو عندك أي استفسار، فريقنا جاهز يساعدك.',

            emailTitle: 'راسلنا',
            emailDescription: 'ابعتلنا استفساراتك في أي وقت.',
            phoneTitle: 'اتصل بنا',
            phoneDescription: 'يسعدنا نساعدك ونجاوب على أسئلتك.',
            locationTitle: 'موقعنا',
            locationDescription: 'بنوصل المسافرين بكل مكان جميل في مصر.',
            hoursTitle: 'مواعيد العمل',
            hoursDescription: 'موجودين لمساعدتك في استفساراتك.',

            formLabel: 'ابعتلنا رسالة',
            formTitle: 'يسعدنا نسمع منك.',
            formDescription:
                'املأ البيانات التالية وقولنا إزاي نقدر نساعدك.',
            nameLabel: 'الاسم بالكامل',
            namePlaceholder: 'اكتب اسمك بالكامل',
            emailLabel: 'البريد الإلكتروني',
            emailPlaceholder: 'example@email.com',
            subjectLabel: 'الموضوع',
            subjectPlaceholder: 'رسالتك بخصوص إيه؟',
            messageLabel: 'رسالتك',
            messagePlaceholder: 'اكتب رسالتك هنا...',
            sendButton: 'إرسال الرسالة',
            formNote: 'من فضلك املأ جميع البيانات قبل الإرسال.',
            emailNotConfigured:
                'لم يتم إعداد بريد التواصل حتى الآن. يرجى التواصل مع مسؤول المشروع.',
            emailReady: 'جاري فتح تطبيق البريد الإلكتروني.',

            faqLabel: 'أسئلة شائعة',
            faqTitle: 'عندك أسئلة؟',
            faqDescription:
                'جمعنالك إجابات لبعض الأسئلة اللي ممكن تساعدك تبدأ.',
            faq1: 'إزاي أقدر أكتشف الوجهات على WASLA؟',
            faq1Answer:
                'ادخل على صفحة الأماكن واكتشف الوجهات السياحية في مصر، وشوف تفاصيل كل مكان واختار اللي يناسب اهتماماتك.',
            faq2: 'هل أقدر أتواصل مع مرشد سياحي؟',
            faq2Answer:
                'أكيد! ادخل على صفحة المرشدين السياحيين واستكشف المرشدين المتاحين وتعرف على خدماتهم.',
            faq3: 'إزاي أقدر أعرف تفاصيل الباقات السياحية؟',
            faq3Answer:
                'تقدر تزور صفحة الباقات السياحية وتكتشف الرحلات والتجارب المختلفة المتاحة.',
            faq4: 'هل أقدر أشارك رأيي أو أبلغ عن مشكلة؟',
            faq4Answer:
                'طبعًا. استخدم نموذج التواصل الموجود في الصفحة وشاركنا رأيك أو استفسارك أو أي مشكلة واجهتك.',

            ctaTitle: 'كل رحلة مميزة بتبدأ بتواصل.',
            ctaDescription:
                'خلينا نساعدك تكتشف جمال مصر وتاريخها والأماكن اللي تستحق الزيارة.',
            ctaButton: 'اكتشف مصر',
            footerNote: 'WASLA — بنوصلك بمصر.',
        },
    }[language] || null;

    const t = content || {
        badge: 'LET’S CONNECT',
    };

    const Arrow = isArabic ? ArrowLeft : ArrowRight;

    const contactEmail = import.meta.env.VITE_CONTACT_EMAIL;

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    const [formMessage, setFormMessage] = useState('');
    const [openFaq, setOpenFaq] = useState(0);

    const heroReveal = useScrollReveal();
    const infoReveal = useScrollReveal();
    const formReveal = useScrollReveal();
    const faqReveal = useScrollReveal();
    const ctaReveal = useScrollReveal();

    const contactCards = [
        {
            icon: Mail,
            title: t.emailTitle,
            description: t.emailDescription,
            value: contactEmail || 'WASLA Contact',
        },
        {
            icon: Phone,
            title: t.phoneTitle,
            description: t.phoneDescription,
            value: isArabic ? 'قريبًا' : 'Coming Soon',
        },
        {
            icon: MapPin,
            title: t.locationTitle,
            description: t.locationDescription,
            value: isArabic ? 'مصر' : 'Egypt',
        },
        {
            icon: Clock,
            title: t.hoursTitle,
            description: t.hoursDescription,
            value: isArabic ? 'قريبًا' : 'Coming Soon',
        },
    ];

    const faqs = [
        { question: t.faq1, answer: t.faq1Answer },
        { question: t.faq2, answer: t.faq2Answer },
        { question: t.faq3, answer: t.faq3Answer },
        { question: t.faq4, answer: t.faq4Answer },
    ];

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!contactEmail) {
            setFormMessage(t.emailNotConfigured);
            return;
        }

        const subject = encodeURIComponent(formData.subject);
        const body = encodeURIComponent(
            `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
        );

        const mailtoLink = `mailto:${contactEmail}?subject=${subject}&body=${body}`;

        setFormMessage(t.emailReady);

        window.location.href = mailtoLink;
    };

    return (
        <main
            dir={isArabic ? 'rtl' : 'ltr'}
            className="overflow-hidden bg-[#FFF8EF] text-[#10243A] dark:bg-[#171E27] dark:text-white"
        >
            {/* HERO */}
            <section className="relative isolate overflow-hidden bg-[#10243A] px-5  text-white md:py-28">
                <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-[#FF8A32]/15 blur-3xl" />
                <div className="absolute -bottom-40 -left-20 h-96 w-96 rounded-full bg-[#287C78]/20 blur-3xl" />

                <div
                    ref={heroReveal.ref}
                    className={`relative mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2 ${heroReveal.className}`}
                >
                    <div>
                        <span className="inline-flex items-center gap-2 rounded-full border border-[#FF8A32]/40 bg-[#FF8A32]/10 px-4 py-2 text-sm font-bold text-[#FFAD65]">
                            <MessageCircle size={17} />
                            {t.badge}
                        </span>

                        <h1 className="mt-7 text-5xl font-black leading-tight sm:text-6xl lg:text-7xl">
                            {t.heroTitle}
                            <span className="block text-[#FF8A32]">
                                {t.heroHighlight}
                            </span>
                        </h1>

                        <p className="mt-7 max-w-xl text-lg leading-9 text-white/75">
                            {t.heroDescription}
                        </p>

                        <div className="mt-9 flex flex-wrap gap-4">
                            <a
                                href="#contact-form"
                                className="inline-flex items-center gap-3 rounded-xl bg-[#FF8A32] px-7 py-4 font-bold text-[#10243A] transition hover:-translate-y-1 hover:bg-[#FFAD65]"
                            >
                                {t.heroButton}
                                <Arrow size={19} />
                            </a>

                            <Link
                                to="/places"
                                className="inline-flex items-center gap-3 rounded-xl border border-white/25 px-7 py-4 font-bold text-white transition hover:bg-white/10"
                            >
                                {t.heroSecondary}
                            </Link>
                        </div>

                        <div className="mt-12 flex items-center gap-4 text-sm text-white/70">
                            <div className="flex -space-x-2 rtl:space-x-reverse">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#10243A] bg-[#FF8A32] text-[#10243A]">
                                    <Globe2 size={18} />
                                </div>
                                <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#10243A] bg-[#287C78] text-white">
                                    <Compass size={18} />
                                </div>
                                <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#10243A] bg-white text-[#10243A]">
                                    <Heart size={18} />
                                </div>
                            </div>

                            <span>
                                {isArabic
                                    ? 'دايمًا هنا علشان نساعدك'
                                    : 'Here to make your journey easier'}
                            </span>
                        </div>
                    </div>

                    {/* Hero image */}
                    <div className="relative mx-auto h-[420px] w-full max-w-xl">
                        <div className="absolute inset-4 rotate-3 rounded-[2rem] border border-[#FF8A32]/50" />

                        <img
                            src={images.hero}
                            alt="Discover the beauty of Egypt"
                            className="absolute inset-0 h-full w-[85%] rounded-[2rem] object-cover shadow-2xl"
                        />

                        <div className="absolute bottom-5 right-0 w-[45%] rounded-2xl border-4 border-[#10243A] bg-[#10243A] p-2 shadow-2xl">
                            <img
                                src={images.pyramids}
                                alt="The Pyramids of Egypt"
                                className="h-36 w-full rounded-xl object-cover"
                            />
                        </div>

                        <div className="absolute right-3 top-7 rounded-2xl border border-white/20 bg-white/10 px-5 py-4 shadow-xl backdrop-blur-lg">
                            <div className="flex items-center gap-2 text-[#FFAD65]">
                                <Sparkles size={17} />
                                <span className="text-sm font-bold">
                                    WASLA
                                </span>
                            </div>
                            <p className="mt-1 text-xs text-white/75">
                                {isArabic
                                    ? 'رحلتك تبدأ من هنا'
                                    : 'Your journey starts here'}
                            </p>
                        </div>

                        <div className="absolute bottom-0 left-3 rounded-xl bg-[#FF8A32] p-4 text-[#10243A] shadow-xl">
                            <Headphones size={25} />
                        </div>
                    </div>
                </div>
            </section>

            {/* CONTACT INFORMATION */}
            <section className="px-5 py-24">
                <div className="mx-auto max-w-7xl">
                    <div className="mx-auto mb-14 max-w-2xl text-center">
                        <span className="font-extrabold tracking-widest text-[#E87525]">
                            {t.contactLabel}
                        </span>

                        <h2 className="mt-4 text-3xl font-black md:text-4xl">
                            {t.contactTitle}
                        </h2>

                        <p className="mt-5 leading-8 text-[#617080] dark:text-gray-300">
                            {t.contactDescription}
                        </p>
                    </div>

                    <div
                        ref={infoReveal.ref}
                        className={`grid gap-6 sm:grid-cols-2 lg:grid-cols-4 ${infoReveal.className}`}
                    >
                        {contactCards.map((card) => {
                            const Icon = card.icon;

                            return (
                                <article
                                    key={card.title}
                                    className="group rounded-3xl border border-[#E8E5DE] bg-white p-7 transition duration-300 hover:-translate-y-2 hover:border-[#FF8A32] hover:shadow-xl dark:border-white/10 dark:bg-[#202A35]"
                                >
                                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FF8A32]/15 text-[#E87525] transition group-hover:bg-[#FF8A32] group-hover:text-white">
                                        <Icon size={27} />
                                    </div>

                                    <h3 className="mt-6 text-lg font-black">
                                        {card.title}
                                    </h3>

                                    <p className="mt-2 text-sm leading-7 text-[#617080] dark:text-gray-300">
                                        {card.description}
                                    </p>

                                    <p className="mt-5 break-words text-sm font-bold text-[#E87525]">
                                        {card.value}
                                    </p>
                                </article>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* CONTACT FORM */}
            <section
                id="contact-form"
                className="bg-white px-5 py-24 dark:bg-[#202A35]"
            >
                <div
                    ref={formReveal.ref}
                    className={`mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2 ${formReveal.className}`}
                >
                    {/* Form intro */}
                    <div>
                        <span className="font-extrabold tracking-widest text-[#E87525]">
                            {t.formLabel}
                        </span>

                        <h2 className="mt-5 text-3xl font-black leading-tight md:text-4xl">
                            {t.formTitle}
                        </h2>

                        <p className="mt-6 max-w-lg leading-9 text-[#617080] dark:text-gray-300">
                            {t.formDescription}
                        </p>

                        <div className="relative mt-10 overflow-hidden rounded-3xl">
                            <img
                                src={images.landscape}
                                alt="Beautiful travel scenery"
                                loading="lazy"
                                className="h-72 w-full object-cover"
                            />

                            <div className="absolute inset-0 flex items-end bg-gradient-to-t from-[#10243A]/90 via-[#10243A]/20 to-transparent p-7">
                                <div className="text-white">
                                    <Compass
                                        size={30}
                                        className="mb-3 text-[#FFAD65]"
                                    />
                                    <p className="text-xl font-black">
                                        {t.footerNote}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Form */}
                    <form
                        onSubmit={handleSubmit}
                        className="rounded-3xl border border-[#E8E5DE] bg-[#FFF8EF] p-7 shadow-lg dark:border-white/10 dark:bg-[#171E27] md:p-9"
                    >
                        <div className="grid gap-6 sm:grid-cols-2">
                            <div className="sm:col-span-2">
                                <label
                                    htmlFor="contact-name"
                                    className="mb-2 block text-sm font-bold"
                                >
                                    {t.nameLabel}
                                </label>

                                <input
                                    id="contact-name"
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder={t.namePlaceholder}
                                    required
                                    className="w-full rounded-xl border border-[#E4DED3] bg-white px-4 py-3.5 text-[#10243A] outline-none transition placeholder:text-gray-400 focus:border-[#FF8A32] focus:ring-2 focus:ring-[#FF8A32]/20 dark:border-white/10 dark:bg-[#202A35] dark:text-white"
                                />
                            </div>

                            <div className="sm:col-span-2">
                                <label
                                    htmlFor="contact-email"
                                    className="mb-2 block text-sm font-bold"
                                >
                                    {t.emailLabel}
                                </label>

                                <input
                                    id="contact-email"
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder={t.emailPlaceholder}
                                    required
                                    className="w-full rounded-xl border border-[#E4DED3] bg-white px-4 py-3.5 text-[#10243A] outline-none transition placeholder:text-gray-400 focus:border-[#FF8A32] focus:ring-2 focus:ring-[#FF8A32]/20 dark:border-white/10 dark:bg-[#202A35] dark:text-white"
                                />
                            </div>

                            <div className="sm:col-span-2">
                                <label
                                    htmlFor="contact-subject"
                                    className="mb-2 block text-sm font-bold"
                                >
                                    {t.subjectLabel}
                                </label>

                                <input
                                    id="contact-subject"
                                    type="text"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    placeholder={t.subjectPlaceholder}
                                    required
                                    className="w-full rounded-xl border border-[#E4DED3] bg-white px-4 py-3.5 text-[#10243A] outline-none transition placeholder:text-gray-400 focus:border-[#FF8A32] focus:ring-2 focus:ring-[#FF8A32]/20 dark:border-white/10 dark:bg-[#202A35] dark:text-white"
                                />
                            </div>

                            <div className="sm:col-span-2">
                                <label
                                    htmlFor="contact-message"
                                    className="mb-2 block text-sm font-bold"
                                >
                                    {t.messageLabel}
                                </label>

                                <textarea
                                    id="contact-message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder={t.messagePlaceholder}
                                    rows={5}
                                    required
                                    className="w-full resize-none rounded-xl border border-[#E4DED3] bg-white px-4 py-3.5 text-[#10243A] outline-none transition placeholder:text-gray-400 focus:border-[#FF8A32] focus:ring-2 focus:ring-[#FF8A32]/20 dark:border-white/10 dark:bg-[#202A35] dark:text-white"
                                />
                            </div>
                        </div>

                        {formMessage && (
                            <p
                                role="status"
                                className="mt-5 rounded-xl bg-[#FF8A32]/10 p-4 text-sm leading-7 text-[#B85B19] dark:text-[#FFAD65]"
                            >
                                {formMessage}
                            </p>
                        )}

                        <button
                            type="submit"
                            className="mt-7 flex w-full items-center justify-center gap-3 rounded-xl bg-[#10243A] px-7 py-4 font-bold text-white transition hover:-translate-y-1 hover:bg-[#1C3B58]"
                        >
                            <Send size={18} />
                            {t.sendButton}
                        </button>

                        <p className="mt-4 text-center text-xs text-[#617080] dark:text-gray-400">
                            {t.formNote}
                        </p>
                    </form>
                </div>
            </section>

            {/* FAQ */}
            <section className="px-5 py-24">
                <div
                    ref={faqReveal.ref}
                    className={`mx-auto grid max-w-7xl gap-14 lg:grid-cols-2 ${faqReveal.className}`}
                >
                    <div>
                        <span className="font-extrabold tracking-widest text-[#E87525]">
                            {t.faqLabel}
                        </span>

                        <h2 className="mt-5 text-3xl font-black md:text-4xl">
                            {t.faqTitle}
                        </h2>

                        <p className="mt-5 max-w-md leading-8 text-[#617080] dark:text-gray-300">
                            {t.faqDescription}
                        </p>

                        <div className="mt-9 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#FF8A32]/15 text-[#E87525]">
                            <MessageCircle size={32} />
                        </div>
                    </div>

                    <div className="space-y-4">
                        {faqs.map((faq, index) => {
                            const isOpen = openFaq === index;

                            return (
                                <article
                                    key={faq.question}
                                    className="overflow-hidden rounded-2xl border border-[#E8E5DE] bg-white dark:border-white/10 dark:bg-[#202A35]"
                                >
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setOpenFaq(isOpen ? -1 : index)
                                        }
                                        aria-expanded={isOpen}
                                        className="flex w-full items-center justify-between gap-5 p-6 text-start font-bold transition hover:text-[#E87525]"
                                    >
                                        <span>{faq.question}</span>

                                        <ChevronDown
                                            size={21}
                                            className={`shrink-0 text-[#E87525] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''
                                                }`}
                                        />
                                    </button>

                                    <div
                                        className={`grid transition-all duration-300 ${isOpen
                                                ? 'grid-rows-[1fr]'
                                                : 'grid-rows-[0fr]'
                                            }`}
                                    >
                                        <div className="overflow-hidden">
                                            <p className="px-6 pb-6 leading-8 text-[#617080] dark:text-gray-300">
                                                {faq.answer}
                                            </p>
                                        </div>
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* FINAL CTA */}
            <section className="px-5 pb-24">
                <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-[#FF8A32] px-7 py-16 text-center text-[#10243A] md:px-16">
                    <div className="absolute -right-16 -top-24 h-64 w-64 rounded-full border-[35px] border-white/15" />
                    <div className="absolute -bottom-28 -left-16 h-64 w-64 rounded-full border-[35px] border-white/15" />

                    <div
                        ref={ctaReveal.ref}
                        className={`relative mx-auto max-w-2xl ${ctaReveal.className}`}
                    >
                        <Globe2
                            size={40}
                            className="mx-auto mb-6"
                        />

                        <h2 className="text-3xl font-black md:text-4xl">
                            {t.ctaTitle}
                        </h2>

                        <p className="mt-5 leading-8 text-[#10243A]/75">
                            {t.ctaDescription}
                        </p>

                        <Link
                            to="/places"
                            className="mt-8 inline-flex items-center gap-3 rounded-xl bg-[#10243A] px-8 py-4 font-bold text-white transition hover:-translate-y-1 hover:bg-[#1C3B58]"
                        >
                            {t.ctaButton}
                            <Arrow size={19} />
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default ContactPage;