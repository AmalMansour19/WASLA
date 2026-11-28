
import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    Compass,
    Mail,
    Lock,
    ArrowRight,
    ArrowLeft,
    Eye,
    EyeOff,
    KeyRound,
    ShieldCheck,
    CheckCircle2,
    AlertCircle,
} from 'lucide-react';

import { useAuth } from '../../../app/contexts/AuthContext.jsx';
import { usePreferences } from '../../../app/contexts/PreferencesContext.jsx';

function ForgotPasswordPage() {
    const { requestPasswordReset, resetPassword } = useAuth();
    const { language } = usePreferences();

    const isArabic = language === 'ar';
    const Arrow = isArabic ? ArrowLeft : ArrowRight;

    const [step, setStep] = useState('email');
    const [email, setEmail] = useState('');
    const [verifiedEmail, setVerifiedEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

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

    function handleEmailSubmit(event) {
        event.preventDefault();
        setError('');

        if (!email.trim()) {
            setError(
                isArabic
                    ? 'من فضلك أدخلي البريد الإلكتروني.'
                    : 'Please enter your email address.'
            );
            return;
        }

        try {
            setIsSubmitting(true);

            const normalizedEmail = requestPasswordReset(email);

            setVerifiedEmail(normalizedEmail);
            setStep('password');
        } catch {
            setError(
                isArabic
                    ? 'لم يتم العثور على حساب بهذا البريد الإلكتروني.'
                    : 'No account found with this email address.'
            );
        } finally {
            setIsSubmitting(false);
        }
    }

    function handlePasswordSubmit(event) {
        event.preventDefault();
        setError('');

        if (password.length < 6) {
            setError(
                isArabic
                    ? 'كلمة المرور يجب أن تكون 6 أحرف على الأقل.'
                    : 'Password must be at least 6 characters.'
            );
            return;
        }

        if (password !== confirmPassword) {
            setError(
                isArabic
                    ? 'كلمتا المرور غير متطابقتين.'
                    : 'Passwords do not match.'
            );
            return;
        }

        try {
            setIsSubmitting(true);

            resetPassword(verifiedEmail, password);

            setStep('success');
        } catch {
            setError(
                isArabic
                    ? 'حدث خطأ أثناء تغيير كلمة المرور. حاولي مرة أخرى.'
                    : 'Something went wrong. Please try again.'
            );
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <main
            dir={isArabic ? 'rtl' : 'ltr'}
            className="
                auth-page-enter relative flex min-h-screen
                items-center justify-center overflow-hidden
                bg-transparent px-4 py-10 sm:px-6
            "
        >
            {/* Decorative Background */}
            <div className="
                pointer-events-none absolute -left-32 -top-32
                h-96 w-96 rounded-full bg-[#FF8A32]/10 blur-3xl
            " />

            <div className="
                pointer-events-none absolute -bottom-40 -right-32
                h-[28rem] w-[28rem] rounded-full
                bg-[#102B43]/10 blur-3xl
            " />

            <div className="
                auth-card relative z-10 grid w-full max-w-5xl
                overflow-hidden rounded-[2rem]
                border border-[#E1E7ED] bg-white
                shadow-[0_25px_70px_rgba(16,43,67,0.12)]
                lg:min-h-[610px] lg:grid-cols-2
                dark:border-[#35485A] dark:bg-[#192B3B]
            ">

                {/* Visual Side */}
                <section className="
                    relative hidden min-h-full overflow-hidden
                    bg-[#102B43] lg:block
                ">
                    <img
                        src="/images/auth-pyramids.jpg"
                        alt="The Pyramids of Giza"
                        className="absolute inset-0 h-full w-full object-cover"
                        onError={(event) => {
                            event.currentTarget.style.display = 'none';
                        }}
                    />

                    <div className="
                        absolute inset-0
                        bg-gradient-to-br
                        from-[#102B43]/80
                        via-[#102B43]/60
                        to-[#071827]/95
                    " />

                    <div className="
                        absolute inset-0 flex flex-col
                        justify-between p-10 text-white xl:p-12
                    ">
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

                        <div className="max-w-md">
                            <div className="
                                mb-5 flex items-center gap-2
                                text-sm font-bold text-[#FFB36F]
                            ">
                                <ShieldCheck size={19} />

                                <span>
                                    {isArabic
                                        ? 'حسابك مهم بالنسبة لنا'
                                        : 'YOUR ACCOUNT MATTERS'}
                                </span>
                            </div>

                            <h2 className="
                                text-4xl font-black leading-tight
                                xl:text-5xl
                            ">
                                {isArabic
                                    ? 'كل رحلة جديدة تبدأ بخطوة آمنة.'
                                    : 'Every great journey starts with a secure account.'}
                            </h2>

                            <p className="
                                mt-6 text-base leading-8 text-white/75
                            ">
                                {isArabic
                                    ? 'استعيدي إمكانية الدخول إلى حسابك وواصلي اكتشاف أجمل الوجهات والتجارب مع وصلة.'
                                    : 'Regain access to your account and continue discovering amazing destinations and experiences with WASLA.'}
                            </p>
                        </div>

                        <p className="text-xs text-white/60">
                            {isArabic
                                ? 'وصلة — اكتشف مصر بطريقتك'
                                : 'WASLA — Discover Egypt Your Way'}
                        </p>
                    </div>
                </section>

                {/* Form Side */}
                <section className="
                    flex items-center justify-center
                    px-6 py-12 sm:px-10 lg:px-12
                ">
                    <div className="auth-form-enter w-full max-w-md">

                        {/* Brand for Mobile */}
                        <Link
                            to="/"
                            className="
                                mb-9 flex w-fit items-center gap-2
                                text-xl font-black text-[#102B43]
                                lg:hidden dark:text-white
                            "
                        >
                            <Compass className="text-[#FF8A32]" size={25} />
                            WASLA
                        </Link>

                        {/* Success State */}
                        {step === 'success' ? (
                            <div className="text-center">
                                <div className="
                                    mx-auto mb-6 flex h-20 w-20
                                    items-center justify-center
                                    rounded-full bg-emerald-50
                                    text-emerald-600
                                    dark:bg-emerald-500/10
                                    dark:text-emerald-400
                                ">
                                    <CheckCircle2 size={42} />
                                </div>

                                <h1 className="
                                    text-3xl font-black
                                    text-[#102B43] dark:text-white
                                ">
                                    {isArabic
                                        ? 'تم تغيير كلمة المرور!'
                                        : 'Password Updated!'}
                                </h1>

                                <p className="
                                    mt-4 text-sm leading-8
                                    text-[#718096] dark:text-[#AAB8C5]
                                ">
                                    {isArabic
                                        ? 'تم حفظ كلمة المرور الجديدة بنجاح. يمكنك الآن تسجيل الدخول إلى حسابك.'
                                        : 'Your new password has been saved successfully. You can now sign in to your account.'}
                                </p>

                                <Link
                                    to="/login"
                                    className="
                                        mt-8 flex w-full items-center
                                        justify-center gap-3 rounded-xl
                                        bg-[#FF8A32] px-5 py-4
                                        font-bold text-[#102B43]
                                        shadow-lg shadow-[#FF8A32]/20
                                        transition-all duration-300
                                        hover:-translate-y-0.5
                                        hover:bg-[#F47A20]
                                    "
                                >
                                    {isArabic
                                        ? 'العودة لتسجيل الدخول'
                                        : 'Back to Sign In'}

                                    <Arrow size={19} />
                                </Link>
                            </div>
                        ) : (
                            <>
                                {/* Heading */}
                                <div className="mb-8">
                                    <div className="
                                        mb-5 flex h-14 w-14
                                        items-center justify-center
                                        rounded-2xl bg-[#FFF0E3]
                                        text-[#102B43]
                                        dark:bg-[#FF8A32]/15
                                        dark:text-[#FF9C50]
                                    ">
                                        {step === 'email'
                                            ? <KeyRound size={27} />
                                            : <Lock size={27} />}
                                    </div>

                                    <h1 className="
                                        text-3xl font-black
                                        text-[#102B43] sm:text-4xl
                                        dark:text-white
                                    ">
                                        {step === 'email'
                                            ? (isArabic
                                                ? 'نسيت كلمة المرور؟'
                                                : 'Forgot Password?')
                                            : (isArabic
                                                ? 'أنشئي كلمة مرور جديدة'
                                                : 'Create New Password')}
                                    </h1>

                                    <p className="
                                        mt-3 text-sm leading-7
                                        text-[#718096]
                                        dark:text-[#AAB8C5]
                                    ">
                                        {step === 'email'
                                            ? (isArabic
                                                ? 'أدخلي البريد الإلكتروني المرتبط بحسابك للمتابعة.'
                                                : 'Enter the email address associated with your account to continue.')
                                            : (isArabic
                                                ? 'اختاري كلمة مرور جديدة لحسابك.'
                                                : 'Choose a new password for your account.')}
                                    </p>
                                </div>

                                {/* Email Step */}
                                {step === 'email' && (
                                    <form
                                        onSubmit={handleEmailSubmit}
                                        className="space-y-5"
                                    >
                                        <div>
                                            <label
                                                htmlFor="forgot-email"
                                                className="
                                                    mb-2 block text-sm
                                                    font-bold text-[#102B43]
                                                    dark:text-white
                                                "
                                            >
                                                {isArabic
                                                    ? 'البريد الإلكتروني'
                                                    : 'Email Address'}
                                            </label>

                                            <div className="relative">
                                                <Mail
                                                    size={19}
                                                    className="
                                                        pointer-events-none
                                                        absolute start-4 top-1/2
                                                        -translate-y-1/2
                                                        text-[#91A0AE]
                                                    "
                                                />

                                                <input
                                                    id="forgot-email"
                                                    type="email"
                                                    autoComplete="email"
                                                    required
                                                    value={email}
                                                    onChange={(event) => {
                                                        setEmail(event.target.value);
                                                        setError('');
                                                    }}
                                                    placeholder="example@email.com"
                                                    dir="ltr"
                                                    className={`${inputClass} ps-11`}
                                                />
                                            </div>
                                        </div>

                                        {error && (
                                            <div className="
                                                flex items-start gap-2
                                                rounded-xl border
                                                border-red-200 bg-red-50
                                                p-3 text-sm text-red-600
                                                dark:border-red-900
                                                dark:bg-red-950/30
                                                dark:text-red-300
                                            ">
                                                <AlertCircle
                                                    size={17}
                                                    className="mt-0.5 shrink-0"
                                                />
                                                {error}
                                            </div>
                                        )}

                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="
                                                flex w-full items-center
                                                justify-center gap-3
                                                rounded-xl bg-[#FF8A32]
                                                px-5 py-4 font-bold
                                                text-[#102B43]
                                                shadow-lg shadow-[#FF8A32]/20
                                                transition-all duration-300
                                                hover:-translate-y-0.5
                                                hover:bg-[#F47A20]
                                                disabled:cursor-not-allowed
                                                disabled:opacity-60
                                            "
                                        >
                                            {isSubmitting
                                                ? (isArabic
                                                    ? 'جاري التحقق...'
                                                    : 'Checking...')
                                                : (isArabic
                                                    ? 'متابعة'
                                                    : 'Continue')}

                                            <Arrow size={19} />
                                        </button>
                                    </form>
                                )}

                                {/* New Password Step */}
                                {step === 'password' && (
                                    <form
                                        onSubmit={handlePasswordSubmit}
                                        className="space-y-5"
                                    >
                                        <div className="
                                            rounded-xl border
                                            border-[#E1E7ED]
                                            bg-[#F7F9FC] p-3
                                            dark:border-[#35485A]
                                            dark:bg-[#1C2D3C]
                                        ">
                                            <p className="
                                                text-xs text-[#718096]
                                                dark:text-[#AAB8C5]
                                            ">
                                                {isArabic
                                                    ? 'الحساب الذي يتم تحديث كلمة مروره'
                                                    : 'Updating password for'}
                                            </p>

                                            <p className="
                                                mt-1 break-all text-sm
                                                font-bold text-[#102B43]
                                                dark:text-white
                                            " dir="ltr">
                                                {verifiedEmail}
                                            </p>
                                        </div>

                                        {/* New Password */}
                                        <div>
                                            <label
                                                htmlFor="new-password"
                                                className="
                                                    mb-2 block text-sm
                                                    font-bold text-[#102B43]
                                                    dark:text-white
                                                "
                                            >
                                                {isArabic
                                                    ? 'كلمة المرور الجديدة'
                                                    : 'New Password'}
                                            </label>

                                            <div className="relative">
                                                <input
                                                    id="new-password"
                                                    type={showPassword ? 'text' : 'password'}
                                                    autoComplete="new-password"
                                                    required
                                                    minLength={6}
                                                    value={password}
                                                    onChange={(event) => {
                                                        setPassword(event.target.value);
                                                        setError('');
                                                    }}
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
                                                            ? 'Hide password'
                                                            : 'Show password'
                                                    }
                                                    className="
                                                        absolute end-3 top-1/2
                                                        -translate-y-1/2
                                                        rounded-lg p-1.5
                                                        text-[#91A0AE]
                                                        hover:text-[#102B43]
                                                        dark:hover:text-white
                                                    "
                                                >
                                                    {showPassword
                                                        ? <EyeOff size={19} />
                                                        : <Eye size={19} />}
                                                </button>
                                            </div>
                                        </div>

                                        {/* Confirm Password */}
                                        <div>
                                            <label
                                                htmlFor="confirm-new-password"
                                                className="
                                                    mb-2 block text-sm
                                                    font-bold text-[#102B43]
                                                    dark:text-white
                                                "
                                            >
                                                {isArabic
                                                    ? 'تأكيد كلمة المرور'
                                                    : 'Confirm Password'}
                                            </label>

                                            <div className="relative">
                                                <input
                                                    id="confirm-new-password"
                                                    type={showConfirmPassword ? 'text' : 'password'}
                                                    autoComplete="new-password"
                                                    required
                                                    minLength={6}
                                                    value={confirmPassword}
                                                    onChange={(event) => {
                                                        setConfirmPassword(event.target.value);
                                                        setError('');
                                                    }}
                                                    placeholder={
                                                        isArabic
                                                            ? 'أعيدي كتابة كلمة المرور'
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
                                                            ? 'Hide password'
                                                            : 'Show password'
                                                    }
                                                    className="
                                                        absolute end-3 top-1/2
                                                        -translate-y-1/2
                                                        rounded-lg p-1.5
                                                        text-[#91A0AE]
                                                        hover:text-[#102B43]
                                                        dark:hover:text-white
                                                    "
                                                >
                                                    {showConfirmPassword
                                                        ? <EyeOff size={19} />
                                                        : <Eye size={19} />}
                                                </button>
                                            </div>
                                        </div>

                                        {error && (
                                            <div className="
                                                flex items-start gap-2
                                                rounded-xl border
                                                border-red-200 bg-red-50
                                                p-3 text-sm text-red-600
                                                dark:border-red-900
                                                dark:bg-red-950/30
                                                dark:text-red-300
                                            ">
                                                <AlertCircle
                                                    size={17}
                                                    className="mt-0.5 shrink-0"
                                                />
                                                {error}
                                            </div>
                                        )}

                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="
                                                flex w-full items-center
                                                justify-center gap-3
                                                rounded-xl bg-[#FF8A32]
                                                px-5 py-4 font-bold
                                                text-[#102B43]
                                                shadow-lg shadow-[#FF8A32]/20
                                                transition-all duration-300
                                                hover:-translate-y-0.5
                                                hover:bg-[#F47A20]
                                                disabled:cursor-not-allowed
                                                disabled:opacity-60
                                            "
                                        >
                                            {isSubmitting
                                                ? (isArabic
                                                    ? 'جاري الحفظ...'
                                                    : 'Saving...')
                                                : (isArabic
                                                    ? 'تغيير كلمة المرور'
                                                    : 'Reset Password')}

                                            <Arrow size={19} />
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() => {
                                                setStep('email');
                                                setPassword('');
                                                setConfirmPassword('');
                                                setError('');
                                            }}
                                            className="
                                                w-full text-center
                                                text-sm font-semibold
                                                text-[#718096]
                                                transition-colors
                                                hover:text-[#E87520]
                                                dark:text-[#AAB8C5]
                                            "
                                        >
                                            {isArabic
                                                ? 'العودة وتغيير البريد الإلكتروني'
                                                : 'Back to change email'}
                                        </button>
                                    </form>
                                )}

                                {/* Back to Login */}
                                <div className="
                                    mt-8 border-t border-[#E8EDF2]
                                    pt-6 text-center
                                    dark:border-[#35485A]
                                ">
                                    <Link
                                        to="/login"
                                        className="
                                            inline-flex items-center
                                            justify-center gap-2
                                            text-sm font-bold
                                            text-[#718096]
                                            transition-colors
                                            hover:text-[#E87520]
                                            dark:text-[#AAB8C5]
                                        "
                                    >
                                        {Arrow &&
                                            (isArabic
                                                ? <ArrowRight size={17} />
                                                : <ArrowLeft size={17} />)}

                                        {isArabic
                                            ? 'العودة إلى تسجيل الدخول'
                                            : 'Back to Sign In'}
                                    </Link>
                                </div>
                            </>
                        )}
                    </div>
                </section>
            </div>
        </main>
    );
}

export default ForgotPasswordPage;
