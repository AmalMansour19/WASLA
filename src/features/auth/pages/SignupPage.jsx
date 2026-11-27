
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    UserPlus,
    Compass,
    MapPin,
    ArrowRight,
    ArrowLeft,
    Eye,
    EyeOff,
    LoaderCircle,
    Check,
    ShieldCheck,
} from 'lucide-react';

import { useAuth } from '../../../app/contexts/AuthContext.jsx';
import { usePreferences } from '../../../app/contexts/PreferencesContext.jsx';
import RoleSelector from '../components/RoleSelector.jsx';

const signupSlides = [
    {
        image: '/images/auth-luxor.jpg',
        alt: 'Luxor Temple, Egypt',
        titleEn: 'Discover the timeless beauty of Egypt.',
        titleAr: 'اكتشف جمال مصر الذي لا ينتهي.',
        locationEn: 'LUXOR, EGYPT',
        locationAr: 'الأقصر، مصر',
    },
    {
        image: '/images/auth-pyramids.jpg',
        alt: 'The Pyramids of Giza',
        titleEn: 'Every destination has a story to tell.',
        titleAr: 'كل وجهة وراها حكاية تستحق الاكتشاف.',
        locationEn: 'GIZA, EGYPT',
        locationAr: 'الجيزة، مصر',
    },
    {
        image: '/images/auth-abu-simbel.jpg',
        alt: 'Abu Simbel Temples',
        titleEn: 'Explore history. Create memories.',
        titleAr: 'استكشف التاريخ واصنع ذكرياتك.',
        locationEn: 'ASWAN, EGYPT',
        locationAr: 'أسوان، مصر',
    },
    {
        image: '/images/auth-alexandria.jpg',
        alt: 'Qaitbay Citadel, Alexandria',
        titleEn: 'A whole country waiting to be explored.',
        titleAr: 'مصر كلها مستنياك تكتشفها.',
        locationEn: 'ALEXANDRIA, EGYPT',
        locationAr: 'الإسكندرية، مصر',
    },
];

function SignupPage() {
    const { signup } = useAuth();
    const { language } = usePreferences();
    const navigate = useNavigate();

    const isArabic = language === 'ar';
    const Arrow = isArabic ? ArrowLeft : ArrowRight;

    const [currentSlide, setCurrentSlide] = useState(0);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 'tourist',
    });

    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // Automatic image slider
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((previous) => (
                (previous + 1) % signupSlides.length
            ));
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    function handleChange(event) {
        const { name, value } = event.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value,
        }));

        if (error) setError('');
    }

    // Password strength calculation
    const passwordChecks = [
        formData.password.length >= 8,
        /[a-z]/.test(formData.password) &&
        /[A-Z]/.test(formData.password),
        /\d/.test(formData.password),
        /[^A-Za-z0-9]/.test(formData.password),
    ];

    const passwordStrength = passwordChecks.filter(Boolean).length;

    const strengthLabels = isArabic
        ? ['', 'ضعيفة', 'متوسطة', 'جيدة', 'قوية']
        : ['', 'Weak', 'Fair', 'Good', 'Strong'];

    const strengthColors = [
        '',
        'bg-red-500',
        'bg-orange-400',
        'bg-yellow-500',
        'bg-emerald-500',
    ];

    async function handleSubmit(event) {
        event.preventDefault();

        if (isSubmitting) return;

        setError('');

        if (
            !formData.name.trim() ||
            !formData.email.trim() ||
            !formData.password ||
            !formData.confirmPassword
        ) {
            setError(
                isArabic
                    ? 'من فضلك املئي جميع البيانات.'
                    : 'Please complete all fields.'
            );
            return;
        }

        if (formData.password.length < 6) {
            setError(
                isArabic
                    ? 'كلمة المرور يجب أن تكون 6 أحرف على الأقل.'
                    : 'Password must be at least 6 characters.'
            );
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError(
                isArabic
                    ? 'كلمتا المرور غير متطابقتين.'
                    : 'Passwords do not match.'
            );
            return;
        }

        try {
            setIsSubmitting(true);

            await signup({
                name: formData.name.trim(),
                email: formData.email.trim(),
                password: formData.password,
                role: formData.role,
            });

            navigate('/');
        } catch (err) {
            setError(
                isArabic
                    ? 'البريد الإلكتروني مستخدم بالفعل أو البيانات غير صحيحة.'
                    : err?.message || 'Unable to create your account.'
            );
        } finally {
            setIsSubmitting(false);
        }
    }

    const inputClass = `
        w-full rounded-xl border border-[#DCE3EA]
        bg-[#F7F9FC] px-4 py-3.5
        text-sm text-[#102B43]
        outline-none transition-all duration-300
        placeholder:text-[#91A0AE]
        focus:border-[#FF8A32]
        focus:bg-white
        focus:ring-4 focus:ring-[#FF8A32]/15
        dark:border-[#35485A]
        dark:bg-[#1C2D3C]
        dark:text-white
        dark:placeholder:text-[#91A0AE]
        dark:focus:bg-[#203447]
    `;

    const activeSlide = signupSlides[currentSlide];

    return (
        <main
            dir={isArabic ? 'rtl' : 'ltr'}
            className="auth-page-enter min-h-screen bg-transparent px-4 py-8 sm:px-6 lg:py-12"
        >
            <div className="
                auth-card mx-auto grid w-full max-w-6xl
                overflow-hidden rounded-[2rem]
                border border-[#E1E7ED]
                bg-white
                shadow-[0_25px_70px_rgba(16,43,67,0.12)]
                lg:min-h-[760px] lg:grid-cols-2
                dark:border-[#35485A]
                dark:bg-[#192B3B]
            ">

                {/* Image Slider */}
                <section className="
                    relative min-h-[300px] overflow-hidden
                    bg-[#102B43] sm:min-h-[380px]
                    lg:min-h-full
                ">

                    {/* Slides */}
                    {signupSlides.map((slide, index) => (
                        <img
                            key={slide.image}
                            src={slide.image}
                            alt={slide.alt}
                            className={`
                                absolute inset-0 h-full w-full object-cover
                                transition-all duration-1000 ease-in-out
                                ${currentSlide === index
                                    ? 'scale-100 opacity-100'
                                    : 'scale-105 opacity-0'
                                }
                            `}
                            onError={(event) => {
                                event.currentTarget.style.display = 'none';
                            }}
                        />
                    ))}

                    {/* Navy Overlay */}
                    <div className="
                        absolute inset-0
                        bg-gradient-to-br
                        from-[#102B43]/75
                        via-[#102B43]/50
                        to-[#071827]/95
                    " />

                    {/* Decorative Glow */}
                    <div className="
                        pointer-events-none absolute
                        -bottom-32 -right-24
                        h-80 w-80 rounded-full
                        border border-white/10
                    " />

                    <div className="
                        pointer-events-none absolute
                        -bottom-20 -right-12
                        h-60 w-60 rounded-full
                        border border-white/10
                    " />

                    {/* Content */}
                    <div className="
                        absolute inset-0 flex flex-col
                        justify-between p-7 text-white
                        sm:p-10 lg:p-12
                    ">

                        {/* Brand */}
                        <Link to="/" className="flex w-fit items-center gap-3">
                            <div className="
                                flex h-12 w-12 items-center
                                justify-center rounded-2xl
                                border border-white/20
                                bg-white/10 backdrop-blur-md
                            ">
                                <Compass size={27} />
                            </div>

                            <span className="text-2xl font-black tracking-wide">
                                WASLA
                            </span>
                        </Link>

                        {/* Slide Content */}
                        <div className="max-w-lg">

                            <div className="
                                mb-5 flex items-center gap-2
                                text-sm font-bold tracking-wide
                                text-[#FFB36F]
                            ">
                                <MapPin size={18} />

                                <span>
                                    {isArabic
                                        ? activeSlide.locationAr
                                        : activeSlide.locationEn}
                                </span>
                            </div>

                            <h2
                                key={currentSlide}
                                className="
                                    animate-[fadeIn_0.8s_ease-in-out]
                                    text-3xl font-black leading-tight
                                    sm:text-4xl lg:text-5xl
                                "
                            >
                                {isArabic
                                    ? activeSlide.titleAr
                                    : activeSlide.titleEn}
                            </h2>

                            <p className="
                                mt-5 max-w-md
                                text-sm leading-8 text-white/80
                                sm:text-base
                            ">
                                {isArabic
                                    ? 'انضم إلى مجتمع وصلة، واكتشف وجهات جديدة، وتواصل مع المرشدين، وخطط لتجربة تناسبك.'
                                    : 'Join the WASLA community, discover new destinations, connect with local guides, and create experiences that are yours.'}
                            </p>

                            {/* Slider Indicators */}
                            <div className="mt-8 flex items-center gap-2">
                                {signupSlides.map((slide, index) => (
                                    <button
                                        key={slide.image}
                                        type="button"
                                        onClick={() => setCurrentSlide(index)}
                                        aria-label={
                                            isArabic
                                                ? `الصورة ${index + 1}`
                                                : `Go to slide ${index + 1}`
                                        }
                                        aria-pressed={currentSlide === index}
                                        className={`
                                            h-1.5 rounded-full
                                            transition-all duration-300
                                            focus-visible:outline-none
                                            focus-visible:ring-2
                                            focus-visible:ring-[#FF8A32]
                                            focus-visible:ring-offset-2
                                            focus-visible:ring-offset-[#102B43]
                                            ${currentSlide === index
                                                ? 'w-10 bg-[#FF8A32]'
                                                : 'w-5 bg-white/50 hover:bg-white'
                                            }
                                        `}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Footer */}
                        <p className="text-xs font-medium text-white/60">
                            {isArabic
                                ? 'وصلة — اكتشف مصر بطريقتك'
                                : 'WASLA — Discover Egypt Your Way'}
                        </p>
                    </div>
                </section>

                {/* Signup Form */}
                <section className="
                    flex items-center justify-center
                    px-6 py-10 sm:px-10 lg:px-12
                ">
                    <div className="auth-form-enter w-full max-w-md">

                        {/* Heading */}
                        <div className="mb-7">
                            <div className="
                                mb-5 flex h-14 w-14
                                items-center justify-center
                                rounded-2xl bg-[#FFF0E3]
                                text-[#102B43]
                                dark:bg-[#FF8A32]/15
                                dark:text-[#FF9C50]
                            ">
                                <UserPlus size={27} />
                            </div>

                            <h1 className="
                                text-3xl font-black
                                text-[#102B43] sm:text-4xl
                                dark:text-white
                            ">
                                {isArabic ? 'انضم إلى وصلة' : 'Join WASLA'}
                            </h1>

                            <p className="
                                mt-3 text-sm leading-7
                                text-[#718096]
                                dark:text-[#AAB8C5]
                            ">
                                {isArabic
                                    ? 'أنشئ حسابك وابدأ رحلتك في اكتشاف مصر.'
                                    : 'Create your account and start discovering Egypt.'}
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">

                            {/* Role */}
                            <div>
                                <label className="
                                    mb-2 block text-sm font-bold
                                    text-[#102B43] dark:text-white
                                ">
                                    {isArabic ? 'نوع الحساب' : 'Account Type'}
                                </label>

                                <RoleSelector
                                    value={formData.role}
                                    onChange={(role) =>
                                        setFormData((previous) => ({
                                            ...previous,
                                            role,
                                        }))
                                    }
                                    language={language}
                                />
                            </div>

                            {/* Name */}
                            <div>
                                <label
                                    htmlFor="signup-name"
                                    className="
                                        mb-2 block text-sm font-bold
                                        text-[#102B43] dark:text-white
                                    "
                                >
                                    {isArabic ? 'الاسم بالكامل' : 'Full Name'}
                                </label>

                                <input
                                    id="signup-name"
                                    name="name"
                                    type="text"
                                    autoComplete="name"
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder={
                                        isArabic
                                            ? 'اكتب اسمك بالكامل'
                                            : 'Enter your full name'
                                    }
                                    className={inputClass}
                                />
                            </div>

                            {/* Email */}
                            <div>
                                <label
                                    htmlFor="signup-email"
                                    className="
                                        mb-2 block text-sm font-bold
                                        text-[#102B43] dark:text-white
                                    "
                                >
                                    {isArabic
                                        ? 'البريد الإلكتروني'
                                        : 'Email Address'}
                                </label>

                                <input
                                    id="signup-email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="example@email.com"
                                    dir="ltr"
                                    className={inputClass}
                                />
                            </div>

                            {/* Password */}
                            <div>
                                <label
                                    htmlFor="signup-password"
                                    className="
                                        mb-2 block text-sm font-bold
                                        text-[#102B43] dark:text-white
                                    "
                                >
                                    {isArabic ? 'كلمة المرور' : 'Password'}
                                </label>

                                <div className="relative">
                                    <input
                                        id="signup-password"
                                        name="password"
                                        type={showPassword ? 'text' : 'password'}
                                        autoComplete="new-password"
                                        required
                                        minLength={6}
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder={
                                            isArabic
                                                ? '6 أحرف على الأقل'
                                                : 'At least 6 characters'
                                        }
                                        dir="ltr"
                                        className={`${inputClass} ps-4 pe-12`}
                                    />

                                    <button
                                        type="button"
                                        onClick={() => setShowPassword((previous) => !previous)}
                                        aria-label={
                                            showPassword
                                                ? (isArabic ? 'إخفاء كلمة المرور' : 'Hide password')
                                                : (isArabic ? 'إظهار كلمة المرور' : 'Show password')
                                        }
                                        className="
                                            absolute end-3 top-1/2
                                            -translate-y-1/2
                                            rounded-lg p-1.5
                                            text-[#91A0AE]
                                            transition-colors
                                            hover:text-[#102B43]
                                            focus-visible:outline-none
                                            focus-visible:ring-2
                                            focus-visible:ring-[#FF8A32]
                                            dark:hover:text-white
                                        "
                                    >
                                        {showPassword
                                            ? <EyeOff size={19} />
                                            : <Eye size={19} />}
                                    </button>
                                </div>

                                {/* Password Strength */}
                                {formData.password.length > 0 && (
                                    <div className="mt-3">
                                        <div className="mb-2 flex items-center justify-between">
                                            <span className="
                                                text-xs font-medium
                                                text-[#718096]
                                                dark:text-[#AAB8C5]
                                            ">
                                                {isArabic
                                                    ? 'قوة كلمة المرور'
                                                    : 'Password strength'}
                                            </span>

                                            <span className={`
                                                text-xs font-bold
                                                ${passwordStrength <= 1
                                                    ? 'text-red-500'
                                                    : passwordStrength === 2
                                                        ? 'text-orange-500'
                                                        : passwordStrength === 3
                                                            ? 'text-yellow-600'
                                                            : 'text-emerald-500'
                                                }
                                            `}>
                                                {strengthLabels[passwordStrength]}
                                            </span>
                                        </div>

                                        <div className="flex gap-1.5">
                                            {[1, 2, 3, 4].map((level) => (
                                                <div
                                                    key={level}
                                                    className={`
                                                        h-1.5 flex-1
                                                        rounded-full
                                                        transition-all duration-300
                                                        ${passwordStrength >= level
                                                            ? strengthColors[passwordStrength]
                                                            : 'bg-[#E5EAF0] dark:bg-[#35485A]'
                                                        }
                                                    `}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Confirm Password */}
                            <div>
                                <label
                                    htmlFor="signup-confirm-password"
                                    className="
                                        mb-2 block text-sm font-bold
                                        text-[#102B43] dark:text-white
                                    "
                                >
                                    {isArabic
                                        ? 'تأكيد كلمة المرور'
                                        : 'Confirm Password'}
                                </label>

                                <div className="relative">
                                    <input
                                        id="signup-confirm-password"
                                        name="confirmPassword"
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        autoComplete="new-password"
                                        required
                                        minLength={6}
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        placeholder={
                                            isArabic
                                                ? 'أعد كتابة كلمة المرور'
                                                : 'Re-enter your password'
                                        }
                                        dir="ltr"
                                        className={`${inputClass} ps-4 pe-12`}
                                    />

                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword((previous) => !previous)}
                                        aria-label={
                                            showConfirmPassword
                                                ? (isArabic ? 'إخفاء كلمة المرور' : 'Hide password')
                                                : (isArabic ? 'إظهار كلمة المرور' : 'Show password')
                                        }
                                        className="
                                            absolute end-3 top-1/2
                                            -translate-y-1/2
                                            rounded-lg p-1.5
                                            text-[#91A0AE]
                                            transition-colors
                                            hover:text-[#102B43]
                                            focus-visible:outline-none
                                            focus-visible:ring-2
                                            focus-visible:ring-[#FF8A32]
                                            dark:hover:text-white
                                        "
                                    >
                                        {showConfirmPassword
                                            ? <EyeOff size={19} />
                                            : <Eye size={19} />}
                                    </button>
                                </div>

                                {/* Password Match Feedback */}
                                {formData.confirmPassword.length > 0 && (
                                    <p className={`
                                        mt-2 flex items-center gap-1.5 text-xs font-medium
                                        ${formData.password === formData.confirmPassword
                                            ? 'text-emerald-600 dark:text-emerald-400'
                                            : 'text-red-500'
                                        }
                                    `}>
                                        {formData.password === formData.confirmPassword
                                            ? (
                                                <>
                                                    <Check size={14} />
                                                    {isArabic
                                                        ? 'كلمتا المرور متطابقتان'
                                                        : 'Passwords match'}
                                                </>
                                            )
                                            : (
                                                isArabic
                                                    ? 'كلمتا المرور غير متطابقتين'
                                                    : 'Passwords do not match'
                                            )}
                                    </p>
                                )}
                            </div>

                            {/* Error */}
                            {error && (
                                <p
                                    role="alert"
                                    className="
                                        rounded-xl border
                                        border-red-200 bg-red-50
                                        p-3 text-sm text-red-600
                                        dark:border-red-900
                                        dark:bg-red-950/30
                                        dark:text-red-300
                                    "
                                >
                                    {error}
                                </p>
                            )}

                            {/* Submit */}
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="
                                    group relative isolate flex w-full
                                    items-center justify-center gap-3
                                    overflow-hidden rounded-xl
                                    bg-[#FF8A32] px-5 py-4
                                    font-bold text-[#102B43]
                                    shadow-lg shadow-[#FF8A32]/20
                                    transition-all duration-300
                                    hover:-translate-y-0.5
                                    hover:bg-[#F47A20]
                                    hover:shadow-xl
                                    hover:shadow-[#FF8A32]/25
                                    active:translate-y-0
                                    disabled:cursor-not-allowed
                                    disabled:opacity-60
                                "
                            >
                                <span className="
                                    pointer-events-none absolute inset-0
                                    -translate-x-full
                                    bg-gradient-to-r
                                    from-transparent via-white/20 to-transparent
                                    transition-transform duration-700
                                    group-hover:translate-x-full
                                " />

                                {isSubmitting ? (
                                    <>
                                        <LoaderCircle
                                            size={19}
                                            className="animate-spin"
                                        />

                                        <span>
                                            {isArabic
                                                ? 'جاري إنشاء الحساب...'
                                                : 'Creating Account...'}
                                        </span>
                                    </>
                                ) : (
                                    <>
                                        <span>
                                            {isArabic
                                                ? 'إنشاء الحساب'
                                                : 'Create Account'}
                                        </span>

                                        <Arrow size={19} />
                                    </>
                                )}
                            </button>
                        </form>

                        {/* Sign In Link */}
                        <p className="
                            mt-7 text-center text-sm
                            text-[#718096]
                            dark:text-[#AAB8C5]
                        ">
                            {isArabic
                                ? 'لديك حساب بالفعل؟'
                                : 'Already have an account?'}

                            {' '}

                            <Link
                                to="/login"
                                className="
                                    font-black text-[#E87520]
                                    transition-colors
                                    hover:text-[#102B43]
                                    hover:underline
                                    dark:text-[#FF9C50]
                                    dark:hover:text-[#FFB36F]
                                "
                            >
                                {isArabic ? 'تسجيل الدخول' : 'Sign In'}
                            </Link>
                        </p>

                        {/* Trust Note */}
                        <div className="
                            mt-6 flex items-center justify-center
                            gap-2 text-xs text-[#91A0AE]
                        ">
                            <ShieldCheck size={15} />

                            <span>
                                {isArabic
                                    ? 'بياناتك تُستخدم لإنشاء حسابك على وصلة'
                                    : 'Your details are used to create your WASLA account'}
                            </span>
                        </div>

                    </div>
                </section>
            </div>
        </main>
    );
}

export default SignupPage;
