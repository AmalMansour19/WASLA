
import {
    Compass,
    Heart,
    MapPin,
    CalendarDays,
    Star,
    UserRound,
} from 'lucide-react';

import { useAuth } from '../../../app/contexts/AuthContext.jsx';
import { usePreferences } from '../../../app/contexts/PreferencesContext.jsx';

function TouristDashboardPage() {
    const { user } = useAuth();
    const { language } = usePreferences();

    const isArabic = language === 'ar';

    const stats = [
        {
            label: isArabic ? 'حجوزاتي' : 'My Bookings',
            value: '0',
            icon: CalendarDays,
        },
        {
            label: isArabic ? 'رحلاتي' : 'My Trips',
            value: '0',
            icon: Compass,
        },
        {
            label: isArabic ? 'الأماكن المفضلة' : 'Favorite Places',
            value: '0',
            icon: Heart,
        },
        {
            label: isArabic ? 'تقييماتي' : 'My Reviews',
            value: '0',
            icon: Star,
        },
    ];

    const sections = [
        {
            title: isArabic ? 'حجوزاتي' : 'My Bookings',
            description: isArabic
                ? 'تابع حجوزاتك السياحية'
                : 'Manage and track your bookings',
            icon: CalendarDays,
        },
        {
            title: isArabic ? 'رحلاتي' : 'My Trips',
            description: isArabic
                ? 'استعرض رحلاتك وخططك القادمة'
                : 'View your upcoming and past trips',
            icon: MapPin,
        },
        {
            title: isArabic ? 'الأماكن المفضلة' : 'Favorite Places',
            description: isArabic
                ? 'الأماكن التي أضفتها إلى المفضلة'
                : 'Explore the places you saved',
            icon: Heart,
        },
        {
            title: isArabic ? 'تقييماتي' : 'My Reviews',
            description: isArabic
                ? 'إدارة تقييماتك وآرائك'
                : 'Manage your reviews and feedback',
            icon: Star,
        },
        {
            title: isArabic ? 'الملف الشخصي' : 'My Profile',
            description: isArabic
                ? 'عرض وتعديل بيانات حسابك'
                : 'View and update your account details',
            icon: UserRound,
        },
    ];

    return (
        <main className="min-h-screen bg-[var(--wasla-background)] px-4 py-10 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">

                {/* Welcome */}
                <section className="mb-8 rounded-3xl bg-[#59643b] p-7 text-white sm:p-10 dark:bg-[#303923]">
                    <p className="mb-2 text-sm text-white/75">
                        {isArabic ? 'لوحة تحكم السائح' : 'Tourist Dashboard'}
                    </p>

                    <h1 className="text-2xl font-black sm:text-3xl">
                        {isArabic
                            ? `أهلاً، ${user?.name || 'بك'} 👋`
                            : `Welcome, ${user?.name || 'Traveler'} 👋`}
                    </h1>

                    <p className="mt-3 max-w-xl text-sm leading-7 text-white/80">
                        {isArabic
                            ? 'اكتشف مصر، تابع حجوزاتك، واحفظ الأماكن التي تحب زيارتها.'
                            : 'Discover Egypt, manage your bookings, and save the places you want to visit.'}
                    </p>
                </section>

                {/* Statistics */}
                <section className="mb-10">
                    <h2 className="mb-5 text-xl font-bold text-[var(--wasla-text)]">
                        {isArabic ? 'نظرة عامة' : 'Overview'}
                    </h2>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {stats.map((stat) => {
                            const Icon = stat.icon;

                            return (
                                <div
                                    key={stat.label}
                                    className="rounded-2xl border border-[var(--wasla-border)] bg-[var(--wasla-surface)] p-5"
                                >
                                    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[#59643b]/10 text-[#59643b] dark:bg-[#a6b47b]/10 dark:text-[#a6b47b]">
                                        <Icon size={22} />
                                    </div>

                                    <p className="text-sm text-[var(--wasla-muted)]">
                                        {stat.label}
                                    </p>

                                    <p className="mt-2 text-2xl font-black text-[var(--wasla-text)]">
                                        {stat.value}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </section>

                {/* Dashboard Sections */}
                <section>
                    <h2 className="mb-5 text-xl font-bold text-[var(--wasla-text)]">
                        {isArabic ? 'إدارة حسابي' : 'Manage My Account'}
                    </h2>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {sections.map((section) => {
                            const Icon = section.icon;

                            return (
                                <div
                                    key={section.title}
                                    className="rounded-2xl border border-[var(--wasla-border)] bg-[var(--wasla-surface)] p-6 transition hover:-translate-y-1 hover:shadow-md"
                                >
                                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#59643b]/10 text-[#59643b] dark:bg-[#a6b47b]/10 dark:text-[#a6b47b]">
                                        <Icon size={23} />
                                    </div>

                                    <h3 className="font-bold text-[var(--wasla-text)]">
                                        {section.title}
                                    </h3>

                                    <p className="mt-2 text-sm leading-6 text-[var(--wasla-muted)]">
                                        {section.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </section>
            </div>
        </main>
    );
}

export default TouristDashboardPage;
