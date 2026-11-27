
import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { UserPlus, Compass } from 'lucide-react';
import { addFavorite } from '../../places/services/favoritesService.js';

import { useAuth } from '../../../app/contexts/AuthContext.jsx';
import { usePreferences } from '../../../app/contexts/PreferencesContext.jsx';
import RoleSelector from '../components/RoleSelector.jsx';

function SignupPage() {
    const { signup } = useAuth();
    const { language } = usePreferences();
    const navigate = useNavigate();
    const location = useLocation();
    const favoritePlaceId = location.state?.favoritePlaceId;

    const isArabic = language === 'ar';

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 'tourist',
    });

    const [error, setError] = useState('');

    function handleChange(event) {
        const { name, value } = event.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value,
        }));
    }

    function handleSubmit(event) {
        event.preventDefault();
        setError('');

        if (formData.password !== formData.confirmPassword) {
            setError(
                isArabic
                    ? 'كلمتا المرور غير متطابقتين.'
                    : 'Passwords do not match.'
            );
            return;
        }

        try {
        const newUser = signup({
            name: formData.name,
            email: formData.email,
            password: formData.password,
            role: formData.role,
        });

        if (favoritePlaceId) {
            addFavorite(newUser.id, favoritePlaceId);
            navigate('/places');
        } else {
            navigate('/');
        }
        } catch (err) {
            setError(
                isArabic
                    ? 'البريد الإلكتروني مستخدم بالفعل أو البيانات غير صحيحة.'
                    : err.message
            );
        }
    }

    const inputClass =
        'w-full rounded-xl border border-[var(--wasla-border)] bg-[var(--wasla-background)] px-4 py-3 text-sm text-[var(--wasla-text)] outline-none transition focus:border-[var(--wasla-primary)]';

    return (
        <section className="flex min-h-[75vh] items-center justify-center px-4 py-12">
            <div className="w-full max-w-xl rounded-2xl border border-[var(--wasla-border)] bg-[var(--wasla-surface)] p-6 shadow-sm sm:p-8">

                <div className="mb-7 text-center">
                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#59643b] text-white">
                        <Compass size={30} />
                    </div>

                    <h1 className="text-2xl font-bold text-[var(--wasla-text)] sm:text-3xl">
                        {isArabic ? 'إنشاء حساب جديد' : 'Create Your Account'}
                    </h1>

                    <p className="mt-2 text-sm text-[var(--wasla-muted)]">
                        {isArabic
                            ? 'انضم إلى WASLA وابدأ رحلتك في اكتشاف مصر'
                            : 'Join WASLA and start discovering Egypt'}
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">

                    <div>
                        <label className="mb-2 block text-sm font-semibold">
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

                    <div>
                        <label htmlFor="name" className="mb-2 block text-sm font-semibold">
                            {isArabic ? 'الاسم بالكامل' : 'Full Name'}
                        </label>

                        <input
                            id="name"
                            name="name"
                            type="text"
                            autoComplete="name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            placeholder={isArabic ? 'اكتب اسمك' : 'Enter your name'}
                            className={inputClass}
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="mb-2 block text-sm font-semibold">
                            {isArabic ? 'البريد الإلكتروني' : 'Email Address'}
                        </label>

                        <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="example@email.com"
                            className={inputClass}
                            dir="ltr"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="mb-2 block text-sm font-semibold">
                            {isArabic ? 'كلمة المرور' : 'Password'}
                        </label>

                        <input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="new-password"
                            required
                            minLength={6}
                            value={formData.password}
                            onChange={handleChange}
                            placeholder={isArabic ? '6 أحرف على الأقل' : 'At least 6 characters'}
                            className={inputClass}
                        />
                    </div>

                    <div>
                        <label htmlFor="confirmPassword" className="mb-2 block text-sm font-semibold">
                            {isArabic ? 'تأكيد كلمة المرور' : 'Confirm Password'}
                        </label>

                        <input
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            autoComplete="new-password"
                            required
                            minLength={6}
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder={isArabic ? 'أعد كتابة كلمة المرور' : 'Re-enter your password'}
                            className={inputClass}
                        />
                    </div>

                    {error && (
                        <p
                            role="alert"
                            className="rounded-lg bg-red-50 p-3 text-sm text-red-600 dark:bg-red-950/30 dark:text-red-300"
                        >
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#59643b] px-5 py-3 font-semibold text-white transition hover:bg-[#414b2b]"
                    >
                        <UserPlus size={19} />
                        {isArabic ? 'إنشاء الحساب' : 'Create Account'}
                    </button>
                </form>

                <p className="mt-6 text-center text-sm text-[var(--wasla-muted)]">
                    {isArabic ? 'لديك حساب بالفعل؟' : 'Already have an account?'}
                    {' '}
                    <Link
                        to="/login"
                        className="font-semibold text-[var(--wasla-primary)] hover:underline"
                    >
                        {isArabic ? 'تسجيل الدخول' : 'Login'}
                    </Link>
                </p>
            </div>
        </section>
    );
}

export default SignupPage;
