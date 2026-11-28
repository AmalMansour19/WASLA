
import {
    CalendarDays,
    MapPin,
    Star,
    ClipboardList,
    UserRound,
    Clock,
} from 'lucide-react';

import { useAuth } from "../../../app/contexts/AuthContext.jsx";
import { usePreferences } from "../../../app/contexts/PreferencesContext.jsx";

function GuideDashboardPage() {
    const { user } = useAuth();
    const { language } = usePreferences();
    const isArabic = language === 'ar';

    const stats = [
        {
            label: isArabic ? 'طلبات الحجز' : 'Booking Requests',
            value: '0',
            icon: ClipboardList,
        },
        {
            label: isArabic ? 'الجولات القادمة' : 'Upcoming Tours',
            value: '0',
            icon: CalendarDays,
        },
        {
            label: isArabic ? 'الأماكن المسجلة' : 'Listed Places',
            value: '0',
            icon: MapPin,
        },
        {
            label: isArabic ? 'التقييم' : 'Rating',
            value: '—',
            icon: Star,
        },
    ];

    const sections = [
        {
            title: isArabic ? 'طلبات الحجز' : 'Booking Requests',
            description: isArabic
                ? 'تابع طلبات الحجز الجديدة والحالية.'
                : 'Manage your new and current booking requests.',
            icon: ClipboardList,
        },
        {
            title: isArabic ? 'جدول الجولات' : 'Tour Schedule',
            description: isArabic
                ? 'نظّم مواعيد جولاتك القادمة.'
                : 'Organize your upcoming tours.',
            icon: CalendarDays,
        },
        {
            title: isArabic ? 'الخدمات والجولات' : 'Services & Tours',
            description: isArabic
                ? 'أدر الجولات والخدمات التي تقدمها.'
                : 'Manage the tours and services you offer.',
            icon: MapPin,
        },
        {
            title: isArabic ? 'التقييمات' : 'Reviews',
            description: isArabic
                ? 'اطّلع على تقييمات وآراء السياح.'
                : 'View tourist reviews and feedback.',
            icon: Star,
        },
        {
            title: isArabic ? 'الملف الشخصي' : 'My Profile',
            description: isArabic
                ? 'حدّث بياناتك ومعلوماتك المهنية.'
                : 'Update your personal and professional details.',
            icon: UserRound,
        },
    ];

    return (
        <main className="min-h-screen bg-[var(--wasla-background)] px-4 py-10 sm:px-6 lg:px-10">
            <div className="mx-auto max-w-7xl">
                <div className="mb-10">
                    <p className="mb-2 text-sm font-medium text-[var(--wasla-primary)]">
                        {isArabic ? 'لوحة تحكم المرشد السياحي' : 'Tour Guide Dashboard'}
                    </p>

                    <h1 className="text-3xl font-bold text-[var(--wasla-text)]">
                        {isArabic
                            ? `أهلاً ${user?.name || 'بك'} 👋`
                            : `Welcome, ${user?.name || 'Guide'} 👋`}
                    </h1>

                    <p className="mt-3 text-[var(--wasla-muted)]">
                        {isArabic
                            ? 'تابع حجوزاتك وجولاتك وأدر خدماتك من مكان واحد.'
                            : 'Manage your bookings, tours, and services in one place.'}
                    </p>
                </div>

                <div className="mb-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    {stats.map((stat) => {
                        const Icon = stat.icon;

                        return (
                            <div
                                key={stat.label}
                                className="rounded-2xl border border-[var(--wasla-border)] bg-[var(--wasla-surface)] p-6"
                            >
                                <div className="mb-4 flex items-center justify-between">
                                    <span className="text-sm text-[var(--wasla-muted)]">
                                        {stat.label}
                                    </span>
                                    <Icon size={22} className="text-[var(--wasla-primary)]" />
                                </div>

                                <p className="text-3xl font-bold text-[var(--wasla-text)]">
                                    {stat.value}
                                </p>
                            </div>
                        );
                    })}
                </div>

                <h2 className="mb-5 text-xl font-bold text-[var(--wasla-text)]">
                    {isArabic ? 'إدارة حسابك' : 'Manage Your Account'}
                </h2>

                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {sections.map((section) => {
                        const Icon = section.icon;

                        return (
                            <div
                                key={section.title}
                                className="rounded-2xl border border-[var(--wasla-border)] bg-[var(--wasla-surface)] p-6 transition hover:-translate-y-1 hover:shadow-md"
                            >
                                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--wasla-primary)]/10 text-[var(--wasla-primary)]">
                                    <Icon size={24} />
                                </div>

                                <h3 className="mb-2 font-bold text-[var(--wasla-text)]">
                                    {section.title}
                                </h3>

                                <p className="text-sm leading-6 text-[var(--wasla-muted)]">
                                    {section.description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </main>
    );
}

export default GuideDashboardPage;
