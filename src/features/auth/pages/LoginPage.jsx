
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    Compass,
    Mail,
    Lock,
    LogIn,
    MapPin,
    ArrowRight,
    ArrowLeft,
    Eye,
    EyeOff,
    LoaderCircle,
} from 'lucide-react';

import { useAuth } from '../../../app/contexts/AuthContext.jsx';
import { usePreferences } from '../../../app/contexts/PreferencesContext.jsx';

const loginSlides = [
    {
        image: '/images/auth-pyramids.jpg',
        locationEn: 'GIZA, EGYPT',
        locationAr: 'الجيزة، مصر',
        titleEn: 'Discover the Wonders of Ancient Egypt',
        titleAr: 'اكتشف عجائب مصر القديمة',
        descriptionEn:
            'From the timeless Pyramids to hidden treasures, your next adventure starts here.',
        descriptionAr:
            'من الأهرامات الخالدة إلى الكنوز المخفية، مغامرتك القادمة بتبدأ من هنا.',
    },
    {
        image: '/images/auth-luxor.jpg',
        locationEn: 'LUXOR, EGYPT',
        locationAr: 'الأقصر، مصر',
        titleEn: 'Walk Through Thousands of Years',
        titleAr: 'امشي وسط آلاف السنين من التاريخ',
        descriptionEn:
            'Explore magnificent temples and experience the stories of ancient civilizations.',
        descriptionAr:
            'استكشف المعابد العظيمة وعِش حكايات الحضارات المصرية القديمة.',
    },
    {
        image: '/images/auth-abu-simbel.jpg',
        locationEn: 'ASWAN, EGYPT',
        locationAr: 'أسوان، مصر',
        titleEn: 'Where History Meets the Nile',
        titleAr: 'حيث يلتقي التاريخ بسحر النيل',
        descriptionEn:
            'Discover the beauty of southern Egypt and its unforgettable landmarks.',
        descriptionAr:
            'اكتشف جمال جنوب مصر ومعالمه السياحية اللي مستحيل تنساها.',
    },
    {
        image: '/images/auth-alexandria.jpg',
        locationEn: 'ALEXANDRIA, EGYPT',
        locationAr: 'الإسكندرية، مصر',
        titleEn: 'Experience the Magic of the Mediterranean',
        titleAr: 'عيش سحر البحر المتوسط',
        descriptionEn:
            'Discover coastal beauty, timeless architecture, and the spirit of Alexandria.',
        descriptionAr:
            'اكتشف جمال البحر والعمارة المميزة وروح مدينة الإسكندرية.',
    },
];

function LoginPage() {
    const navigate = useNavigate();
    const { login } = useAuth();
    const { language } = usePreferences();

    const isArabic = language === 'ar';
    const Arrow = isArabic ? ArrowLeft : ArrowRight;

    const [currentSlide, setCurrentSlide] = useState(0);

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    // Automatic image slider
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((current) => (current + 1) % loginSlides.length);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    function handleChange(event) {
        const { name, value } = event.target;

        setFormData((current) => ({
            ...current,
            [name]: value,
        }));
    }


    async function handleSubmit(event) {
        event.preventDefault();
        setError('');

        if (!formData.email.trim() || !formData.password) {
            setError(
                isArabic
                    ? 'من فضلك أدخلي البريد الإلكتروني وكلمة المرور'
                    : 'Please enter your email and password.'
            );
            return;
        }

        try {
            setIsSubmitting(true);

            await login(formData.email.trim(), formData.password);

            navigate('/');
        } catch {
            setError(
                isArabic
                    ? 'البريد الإلكتروني أو كلمة المرور غير صحيحة'
                    : 'Invalid email or password.'
            );
        } finally {
            setIsSubmitting(false);
        }
    }


    const activeSlide = loginSlides[currentSlide];

    return (
        <main
            dir={isArabic ? 'rtl' : 'ltr'}
            className="auth-page-enter min-h-screen bg-transparent px-4 py-10 sm:px-6 lg:py-14"
        >
            <div className="auth-card mx-auto grid w-full max-w-6xl overflow-hidden rounded-[2rem] border border-[var(--wasla-border)] bg-[var(--wasla-surface)] shadow-[0_25px_70px_rgba(16,43,67,0.12)] lg:min-h-[650px] lg:grid-cols-2">

                {/* Visual Side - Tourism Slider */}
                <section className="relative min-h-[380px] overflow-hidden bg-[#102B43] sm:min-h-[450px] lg:min-h-full">

                    {/* Slider Images */}
                    {loginSlides.map((slide, index) => (
                        <img
                            key={slide.image}
                            src={slide.image}
                            alt={isArabic ? slide.locationAr : slide.locationEn}
                            className={`absolute inset-0 h-full w-full object-cover transition-all duration-[1200ms] ease-in-out ${currentSlide === index
                                    ? 'scale-100 opacity-100'
                                    : 'scale-110 opacity-0'
                                }`}
                        />
                    ))}

                    {/* Dark Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#102B43] via-[#102B43]/65 to-[#102B43]/15" />

                    {/* Content */}
                    <div className="absolute inset-0 flex flex-col justify-between p-7 text-white sm:p-10 lg:p-12">

                        {/* Logo */}
                        <Link to="/" className="flex w-fit items-center gap-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/20 bg-white/10 text-[#FF8A32] backdrop-blur-md">
                                <Compass size={28} />
                            </div>

                            <span className="text-2xl font-black tracking-wide">
                                WASLA
                            </span>
                        </Link>

                        {/* Slide Information */}
                        <div
                            key={currentSlide}
                            className="max-w-lg animate-[fadeIn_0.8s_ease-in-out]"
                        >
                            <div className="mb-5 flex items-center gap-2 text-sm font-bold tracking-wider text-[#FFB16F]">
                                <MapPin size={17} />

                                {isArabic
                                    ? activeSlide.locationAr
                                    : activeSlide.locationEn}
                            </div>

                            <h2 className="text-3xl font-black leading-tight sm:text-4xl lg:text-5xl">
                                {isArabic
                                    ? activeSlide.titleAr
                                    : activeSlide.titleEn}
                            </h2>

                            <p className="mt-5 max-w-md text-sm leading-8 text-white/80 sm:text-base">
                                {isArabic
                                    ? activeSlide.descriptionAr
                                    : activeSlide.descriptionEn}
                            </p>

                            {/* Slider Indicators */}
                            <div className="mt-8 flex items-center gap-2">
                                {loginSlides.map((slide, index) => (
                                    <button
                                        key={slide.image}
                                        type="button"
                                        onClick={() => setCurrentSlide(index)}
                                        aria-label={
                                            isArabic
                                                ? `الصورة ${index + 1}`
                                                : `Go to slide ${index + 1}`
                                        }
                                        aria-current={
                                            currentSlide === index
                                                ? 'true'
                                                : undefined
                                        }
                                        className={`h-1.5 rounded-full transition-all duration-300 ${currentSlide === index
                                                ? 'w-10 bg-[#FF8A32]'
                                                : 'w-5 bg-white/40 hover:bg-white/70'
                                            }`}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Footer */}
                        <p className="text-xs font-medium text-white/60">
                            {isArabic
                                ? 'وصلة — بوابتك لاكتشاف مصر'
                                : 'WASLA — Your Gateway to Discover Egypt'}
                        </p>
                    </div>
                </section>

                {/* Login Form */}
                <section className="flex items-center justify-center px-6 py-10 sm:px-10 lg:px-12">
                    <div className="auth-form-enter w-full max-w-md">

                        {/* Heading */}
                        <div className="mb-9">
                            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#102B43] text-[#FF8A32] shadow-lg shadow-[#102B43]/15">
                                <LogIn size={27} />
                            </div>

                            <p className="mb-3 text-xs font-extrabold tracking-[0.2em] text-[#FF8A32]">
                                {isArabic
                                    ? 'مرحباً بك في وصلة'
                                    : 'WELCOME TO WASLA'}
                            </p>

                            <h1 className="text-3xl font-black text-[var(--wasla-text)] sm:text-4xl">
                                {isArabic ? 'مرحباً بعودتك!' : 'Welcome Back!'}
                            </h1>

                            <p className="mt-3 text-sm leading-7 text-[var(--wasla-muted)]">
                                {isArabic
                                    ? 'سجّلي الدخول وكمّلي رحلتك في اكتشاف مصر.'
                                    : 'Sign in to continue your journey and discover more of Egypt.'}
                            </p>
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div
                                role="alert"
                                className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/30 dark:text-red-300"
                            >
                                {error}
                            </div>
                        )}

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-5">

                            {/* Email */}
                            <div>
                                <label
                                    htmlFor="login-email"
                                    className="mb-2 block text-sm font-bold text-[var(--wasla-text)]"
                                >
                                    {isArabic
                                        ? 'البريد الإلكتروني'
                                        : 'Email Address'}
                                </label>

                                <div className="relative">
                                    <Mail
                                        size={18}
                                        className="absolute start-4 top-1/2 -translate-y-1/2 text-[#102B43]/60"
                                    />

                                    <input
                                        id="login-email"
                                        name="email"
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="example@email.com"
                                        autoComplete="email"
                                        dir="ltr"
                                        className="w-full rounded-xl border border-[var(--wasla-border)] bg-[var(--wasla-background)] py-3.5 pe-4 ps-11 text-sm text-[var(--wasla-text)] outline-none transition-all duration-300 placeholder:text-[var(--wasla-muted)]/70 focus:border-[#FF8A32] focus:bg-white focus:ring-4 focus:ring-[#FF8A32]/15 dark:focus:bg-[#1C2D3C]"
                                    />
                                </div>
                            </div>

                            {/* Password */}

                            <div>
                                <label
                                    htmlFor="login-password"
                                    className="mb-2 block text-sm font-bold text-[var(--wasla-text)]"
                                >
                                    {isArabic ? 'كلمة المرور' : 'Password'}
                                </label>

                                <div className="relative">
                                    <Lock
                                        size={18}
                                        className="absolute start-4 top-1/2 -translate-y-1/2 text-[#102B43]/60"
                                    />

                                    <input
                                        id="login-password"
                                        name="password"
                                        type={showPassword ? 'text' : 'password'}
                                        required
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="••••••••"
                                        autoComplete="current-password"
                                        dir="ltr"
                                        className="w-full rounded-xl border border-[var(--wasla-border)] bg-[var(--wasla-background)] py-3.5 pe-12 ps-11 text-sm text-[var(--wasla-text)] outline-none transition-all duration-300 placeholder:text-[var(--wasla-muted)]/70 focus:border-[#FF8A32] focus:ring-4 focus:ring-[#FF8A32]/15 focus:bg-white dark:focus:bg-[#1C2D3C]"
                                    />

                                    <button
                                        type="button"
                                        onClick={() => setShowPassword((current) => !current)}
                                        aria-label={
                                            showPassword
                                                ? isArabic ? 'إخفاء كلمة المرور' : 'Hide password'
                                                : isArabic ? 'إظهار كلمة المرور' : 'Show password'
                                        }
                                        className="absolute end-4 top-1/2 -translate-y-1/2 text-[#718096] transition-colors hover:text-[#FF8A32] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF8A32] rounded-md"
                                    >
                                        {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                                    </button>
                                </div>
                            </div>

                            {/* Forgot Password */}
                            <div className="flex justify-end">
                                <Link
                                    to="/forgot-password"
                                    className="text-sm font-bold text-[#102B43] transition hover:text-[#FF8A32] hover:underline dark:text-[#FFB16F]"
                                >
                                    {isArabic
                                        ? 'نسيت كلمة المرور؟'
                                        : 'Forgot password?'}
                                </Link>
                            </div>

                            {/* Submit */}

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-xl bg-[#102B43] px-5 py-4 font-bold text-white shadow-lg shadow-[#102B43]/15 transition-all duration-300 hover:-translate-y-1 hover:bg-[#FF8A32] hover:text-[#102B43] hover:shadow-xl hover:shadow-[#FF8A32]/20 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
                            >
                                {isSubmitting ? (
                                    <>
                                        <LoaderCircle size={20} className="animate-spin" />
                                        {isArabic ? 'جاري تسجيل الدخول...' : 'Signing in...'}
                                    </>
                                ) : (
                                    <>
                                        {isArabic ? 'تسجيل الدخول' : 'Sign In'}
                                        <Arrow
                                            size={19}
                                            className="transition-transform duration-300 group-hover:translate-x-1"
                                        />
                                    </>
                                )}
                            </button>

                        </form>

                        {/* Divider */}
                        <div className="my-8 flex items-center gap-4">
                            <div className="h-px flex-1 bg-[var(--wasla-border)]" />

                            <span className="text-xs font-semibold tracking-wider text-[var(--wasla-muted)]">
                                {isArabic ? 'جديد في وصلة؟' : 'NEW TO WASLA?'}
                            </span>

                            <div className="h-px flex-1 bg-[var(--wasla-border)]" />
                        </div>

                        {/* Signup Link */}
                        <p className="text-center text-sm text-[var(--wasla-muted)]">
                            {isArabic
                                ? 'ليس لديك حساب؟'
                                : "Don't have an account?"}{' '}

                            <Link
                                to="/signup"
                                className="font-black text-[#102B43] transition hover:text-[#FF8A32] hover:underline dark:text-[#FFB16F]"
                            >
                                {isArabic
                                    ? 'أنشئي حسابك الآن'
                                    : 'Create Account'}
                            </Link>
                        </p>
                    </div>
                </section>
            </div>
        </main>
    );
}

export default LoginPage;
