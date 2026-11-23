
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Compass, Mail, Lock, LogIn } from 'lucide-react';

import { useAuth } from '../../../app/contexts/AuthContext.jsx';
import { usePreferences } from '../../../app/contexts/PreferencesContext.jsx';

function LoginPage() {
    const navigate = useNavigate();

    const { login } = useAuth();
    const { language } = usePreferences();

    const isArabic = language === 'ar';

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    function handleChange(event) {
        const { name, value } = event.target;

        setFormData((current) => ({
            ...current,
            [name]: value,
        }));
    }

    function handleSubmit(event) {
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

            login(formData.email, formData.password);

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

    return (
        <main className="flex min-h-[calc(100vh-76px)] items-center justify-center bg-[var(--wasla-background)] px-4 py-12">
            <div className="w-full max-w-md">
                <div className="rounded-3xl border border-[var(--wasla-border)] bg-[var(--wasla-surface)] p-6 shadow-lg sm:p-9">

                    {/* Logo */}
                    <div className="mb-7 text-center">
                        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#59643b] text-white dark:bg-[#a6b47b] dark:text-[#171914]">
                            <Compass size={34} />
                        </div>

                        <h1 className="text-3xl font-black text-[var(--wasla-text)]">
                            {isArabic ? 'مرحباً بعودتك' : 'Welcome Back'}
                        </h1>

                        <p className="mt-2 text-sm text-[var(--wasla-muted)]">
                            {isArabic
                                ? 'سجّلي الدخول لمتابعة رحلتك مع وصلة'
                                : 'Sign in to continue your journey with WASLA'}
                        </p>
                    </div>

                    {/* Error */}
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
                                htmlFor="email"
                                className="mb-2 block text-sm font-semibold text-[var(--wasla-text)]"
                            >
                                {isArabic ? 'البريد الإلكتروني' : 'Email Address'}
                            </label>

                            <div className="relative">
                                <Mail
                                    size={18}
                                    className="absolute start-4 top-1/2 -translate-y-1/2 text-[var(--wasla-muted)]"
                                />

                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="example@email.com"
                                    autoComplete="email"
                                    className="w-full rounded-xl border border-[var(--wasla-border)] bg-[var(--wasla-background)] py-3 pe-4 ps-11 text-sm text-[var(--wasla-text)] outline-none transition focus:border-[#59643b] dark:focus:border-[#a6b47b]"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label
                                htmlFor="password"
                                className="mb-2 block text-sm font-semibold text-[var(--wasla-text)]"
                            >
                                {isArabic ? 'كلمة المرور' : 'Password'}
                            </label>

                            <div className="relative">
                                <Lock
                                    size={18}
                                    className="absolute start-4 top-1/2 -translate-y-1/2 text-[var(--wasla-muted)]"
                                />

                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="••••••••"
                                    autoComplete="current-password"
                                    className="w-full rounded-xl border border-[var(--wasla-border)] bg-[var(--wasla-background)] py-3 pe-4 ps-11 text-sm text-[var(--wasla-text)] outline-none transition focus:border-[#59643b] dark:focus:border-[#a6b47b]"
                                />
                            </div>
                        </div>

                        {/* Forgot Password */}
                        <div className="flex justify-end">
                            <Link
                                to="/forgot-password"
                                className="text-sm font-semibold text-[#59643b] hover:underline dark:text-[#a6b47b]"
                            >
                                {isArabic ? 'نسيت كلمة المرور؟' : 'Forgot password?'}
                            </Link>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#59643b] py-3.5 font-bold text-white transition hover:bg-[#414b2b] disabled:cursor-not-allowed disabled:opacity-60 dark:bg-[#a6b47b] dark:text-[#171914] dark:hover:bg-[#c0cc9b]"
                        >
                            <LogIn size={19} />
                            {isArabic ? 'تسجيل الدخول' : 'Sign In'}
                        </button>
                    </form>

                    {/* Signup Link */}
                    <p className="mt-7 text-center text-sm text-[var(--wasla-muted)]">
                        {isArabic
                            ? 'ليس لديك حساب؟'
                            : "Don't have an account?"}

                        {' '}

                        <Link
                            to="/signup"
                            className="font-bold text-[#59643b] hover:underline dark:text-[#a6b47b]"
                        >
                            {isArabic ? 'إنشاء حساب' : 'Create Account'}
                        </Link>
                    </p>
                </div>
            </div>
        </main>
    );
}

export default LoginPage;
