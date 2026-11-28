
import {
    Users,
    UserRoundCheck,
    MapPin,
    CalendarDays,
    Package,
    Star,
    ChartNoAxesCombined,
    Settings,
    ShieldCheck,
} from 'lucide-react';

import { useAuth } from "../../../app/contexts/AuthContext.jsx";
import { usePreferences } from "../../../app/contexts/PreferencesContext.jsx";

function AdminDashboardPage() {
    const { user } = useAuth();
    const { language } = usePreferences();
    const isArabic = language === 'ar';

    const stats = [
        {
            label: isArabic ? 'إجمالي المستخدمين' : 'Total Users',
            value: '0',
            icon: Users,
        },
        {
            label: isArabic ? 'المرشدون السياحيون' : 'Tour Guides',
            value: '0',
            icon: UserRoundCheck,
        },
        {
            label: isArabic ? 'الأماكن السياحية' : 'Tourist Places',
            value: '257',
            icon: MapPin,
        },
        {
            label: isArabic ? 'إجمالي الحجوزات' : 'Total Bookings',
            value: '0',
            icon: CalendarDays,
        },
    ];

    const sections = [
        {
            title: isArabic ? 'إدارة المستخدمين' : 'User Management',
            description: isArabic
                ? 'عرض وإدارة حسابات المستخدمين.'
                : 'View and manage user accounts.',
            icon: Users,
        },
        {
            title: isArabic ? 'إدارة المرشدين' : 'Guide Management',
            description: isArabic
                ? 'مراجعة وإدارة حسابات المرشدين السياحيين.'
                : 'Review and manage tour guide accounts.',
            icon: UserRoundCheck,
        },
        {
            title: isArabic ? 'إدارة الأماكن' : 'Places Management',
            description: isArabic
                ? 'إضافة وتعديل ومراجعة الأماكن السياحية.'
                : 'Add, edit, and review tourist destinations.',
            icon: MapPin,
        },
        {
            title: isArabic ? 'إدارة الحجوزات' : 'Bookings Management',
            description: isArabic
                ? 'متابعة الحجوزات وحالات الطلبات.'
                : 'Track bookings and request statuses.',
            icon: CalendarDays,
        },
        {
            title: isArabic ? 'إدارة الباقات' : 'Packages Management',
            description: isArabic
                ? 'إدارة الباقات والجولات السياحية.'
                : 'Manage tour packages and trips.',
            icon: Package,
        },
        {
            title: isArabic ? 'إدارة التقييمات' : 'Reviews Management',
            description: isArabic
                ? 'مراجعة تقييمات وآراء المستخدمين.'
                : 'Review user ratings and feedback.',
            icon: Star,
        },
        {
            title: isArabic ? 'التقارير والإحصائيات' : 'Reports & Analytics',
            description: isArabic
                ? 'متابعة أداء المنصة والإحصائيات.'
                : 'Monitor platform performance and statistics.',
            icon: ChartNoAxesCombined,
        },
        {
            title: isArabic ? 'إعدادات النظام' : 'System Settings',
            description: isArabic
                ? 'إدارة إعدادات المنصة.'
                : 'Manage platform settings.',
            icon: Settings,
        },
    ];

    return (
        <main className="min-h-screen bg-[var(--wasla-background)] px-4 py-10 sm:px-6 lg:px-10">
            <div className="mx-auto max-w-7xl">

                <div className="mb-10">
                    <div className="mb-3 flex items-center gap-2 text-[var(--wasla-primary)]">
                        <ShieldCheck size={22} />
                        <span className="text-sm font-semibold">
                            {isArabic ? 'لوحة تحكم الإدارة' : 'Admin Dashboard'}
                        </span>
                    </div>

                    <h1 className="text-3xl font-bold text-[var(--wasla-text)]">
                        {isArabic
                            ? `أهلاً ${user?.name || 'بك'} 👋`
                            : `Welcome, ${user?.name || 'Admin'} 👋`}
                    </h1>

                    <p className="mt-3 text-[var(--wasla-muted)]">
                        {isArabic
                            ? 'تابع أداء منصة وصلة وأدر جميع أقسامها من مكان واحد.'
                            : 'Monitor WASLA and manage all platform sections from one place.'}
                    </p>
                </div>

                <section className="mb-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
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
                                    <Icon
                                        size={23}
                                        className="text-[var(--wasla-primary)]"
                                    />
                                </div>

                                <p className="text-3xl font-bold text-[var(--wasla-text)]">
                                    {stat.value}
                                </p>
                            </div>
                        );
                    })}
                </section>

                <section>
                    <h2 className="mb-5 text-xl font-bold text-[var(--wasla-text)]">
                        {isArabic ? 'إدارة المنصة' : 'Platform Management'}
                    </h2>

                    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
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
                </section>

            </div>
        </main>
    );
}

export default AdminDashboardPage;
