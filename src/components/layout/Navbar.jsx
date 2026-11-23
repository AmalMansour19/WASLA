
import { useEffect, useState } from 'react';
import {
    Link,
    NavLink,
    useLocation,
    useNavigate,
} from 'react-router-dom';

import {
    Compass,
    Languages,
    Menu,
    Moon,
    Sun,
    X,
    UserCircle,
    LogOut,
    ChevronDown,
    LayoutDashboard,
} from 'lucide-react';

import { usePreferences } from '../../app/contexts/PreferencesContext.jsx';
import { useAuth } from '../../app/contexts/AuthContext.jsx';

const publicLinks = [
    { to: '/', key: 'home', end: true },
    { to: '/places', key: 'explore' },
    { to: '/guides', key: 'guides' },
    { to: '/packages', key: 'packages' },
    { to: '/about', key: 'about' },
    { to: '/contact', key: 'contact' },
];

const roleLinks = {
    guest: publicLinks,

    tourist: [
        { to: '/', key: 'home', end: true },
        { to: '/places', key: 'explore' },
        { to: '/guides', key: 'guides' },
        { to: '/packages', key: 'packages' },
    ],

    guide: [
        { to: '/', key: 'home', end: true },
        { to: '/places', key: 'explore' },
        { to: '/packages', key: 'packages' },
    ],

    admin: [
        { to: '/dashboard/admin', key: 'dashboard' },
        { to: '/places', key: 'explore' },
        { to: '/guides', key: 'guides' },
        { to: '/packages', key: 'packages' },
    ],
};

function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);

    const location = useLocation();
    const navigate = useNavigate();

    const {
        language,
        toggleLanguage,
        theme,
        toggleTheme,
        t,
    } = usePreferences();

    const { user, isAuthenticated, logout } = useAuth();

    const dashboardRoutes = {
        tourist: '/dashboard/tourist',
        guide: '/dashboard/guide',
        admin: '/dashboard/admin',
    };

    const roleLabels = {
        tourist: language === 'ar' ? 'سائح' : 'Tourist',
        guide: language === 'ar' ? 'مرشد سياحي' : 'Tour Guide',
        admin: language === 'ar' ? 'مدير النظام' : 'Admin',
    };

    const dashboardLabels = {
        ar: 'لوحة التحكم',
        en: 'Dashboard',
    };

    const dashboardPath = dashboardRoutes[user?.role];

    const currentLinks = isAuthenticated
        ? roleLinks[user?.role] || publicLinks
        : roleLinks.guest;

    useEffect(() => {
        setIsMenuOpen(false);
        setIsAccountMenuOpen(false);
    }, [location.pathname]);

    const getLinkClass = ({ isActive }) => `
        relative py-2 text-sm font-semibold transition-colors
        after:absolute after:bottom-0 after:start-0 after:h-0.5
        after:bg-[#59643b] after:transition-all
        dark:after:bg-[#a6b47b]
        ${isActive
            ? 'text-[#59643b] after:w-full dark:text-[#a6b47b]'
            : 'text-[var(--wasla-muted)] after:w-0 hover:text-[#59643b] hover:after:w-full dark:hover:text-[#a6b47b]'
        }
    `;

    const actionButtonClass = `
        inline-flex h-10 items-center justify-center gap-2
        rounded-xl border border-[var(--wasla-border)]
        px-3 text-sm font-semibold text-[var(--wasla-text)]
        transition hover:border-[#59643b] hover:bg-[#59643b]/5
        dark:hover:border-[#a6b47b] dark:hover:bg-[#a6b47b]/10
    `;

    function handleLogout() {
        logout();
        setIsAccountMenuOpen(false);
        setIsMenuOpen(false);
        navigate('/');
    }

    function renderNavigationLinks(mobile = false) {
        return currentLinks.map((item) => (
            <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                onClick={() => {
                    setIsMenuOpen(false);
                    setIsAccountMenuOpen(false);
                }}
                className={
                    mobile
                        ? ({ isActive }) => `
                            rounded-xl px-4 py-3 text-sm font-semibold transition
                            ${isActive
                                ? 'bg-[#59643b]/10 text-[#59643b] dark:bg-[#a6b47b]/10 dark:text-[#a6b47b]'
                                : 'text-[var(--wasla-text)] hover:bg-[var(--wasla-background)]'
                            }
                        `
                        : getLinkClass
                }
            >
                {item.key === 'dashboard'
                    ? dashboardLabels[language]
                    : t(item.key)}
            </NavLink>
        ));
    }

    return (
        <header className="sticky top-0 z-50 border-b border-[var(--wasla-border)] bg-[var(--wasla-surface)]/95 shadow-sm backdrop-blur-md">
            <nav
                className="mx-auto flex min-h-[76px] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8"
                aria-label="Main navigation"
            >
                {/* Brand */}
                <Link
                    to="/"
                    className="flex shrink-0 items-center gap-2"
                    aria-label="WASLA home"
                >
                    <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#59643b] text-white">
                        <Compass size={25} strokeWidth={2.2} />
                    </span>

                    <span className="flex flex-col">
                        <span className="text-2xl font-black leading-none tracking-[0.12em] text-[#59643b] dark:text-[#a6b47b]">
                            WASLA
                        </span>

                        <span className="mt-1 text-[10px] font-medium tracking-wide text-[var(--wasla-muted)]">
                            {t('exploreEgypt')}
                        </span>
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden items-center gap-7 lg:flex">
                    {renderNavigationLinks()}
                </div>

                {/* Actions */}
                <div className="flex shrink-0 items-center gap-2">
                    <button
                        type="button"
                        onClick={toggleLanguage}
                        className={actionButtonClass}
                        aria-label={t('language')}
                        title={t('language')}
                    >
                        <Languages size={17} />
                        <span>
                            {language === 'en' ? 'العربية' : 'English'}
                        </span>
                    </button>

                    <button
                        type="button"
                        onClick={toggleTheme}
                        className="flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--wasla-border)] text-[var(--wasla-text)] transition hover:border-[#59643b] hover:bg-[#59643b]/5 dark:hover:border-[#a6b47b]"
                        aria-label={t('appearance')}
                        title={t('appearance')}
                    >
                        {theme === 'light' ? (
                            <Moon size={18} />
                        ) : (
                            <Sun size={18} />
                        )}
                    </button>

                    {/* Desktop Authentication */}
                    <div className="relative hidden lg:block">
                        {!isAuthenticated ? (
                            <div className="flex items-center gap-2">
                                <Link
                                    to="/login"
                                    className={actionButtonClass}
                                >
                                    {t('login')}
                                </Link>

                                <Link
                                    to="/signup"
                                    className="inline-flex h-10 items-center justify-center rounded-xl bg-[#59643b] px-4 text-sm font-semibold text-white transition hover:bg-[#414b2b] dark:bg-[#a6b47b] dark:text-[#171914] dark:hover:bg-[#c0cc9b]"
                                >
                                    {t('signup')}
                                </Link>
                            </div>
                        ) : (
                            <div className="relative">
                                <button
                                    type="button"
                                    onClick={() =>
                                        setIsAccountMenuOpen((current) => !current)
                                    }
                                    className={actionButtonClass}
                                    aria-expanded={isAccountMenuOpen}
                                >
                                    <UserCircle size={19} />

                                    <span className="max-w-28 truncate">
                                        {user?.name}
                                    </span>

                                    <ChevronDown size={15} />
                                </button>

                                {isAccountMenuOpen && (
                                    <div className="absolute end-0 top-full mt-3 w-60 rounded-xl border border-[var(--wasla-border)] bg-[var(--wasla-surface)] p-3 shadow-xl">
                                        <div className="border-b border-[var(--wasla-border)] px-3 pb-3">
                                            <p className="truncate text-sm font-bold text-[var(--wasla-text)]">
                                                {user?.name}
                                            </p>

                                            <p className="mt-1 text-xs text-[var(--wasla-muted)]">
                                                {roleLabels[user?.role] || user?.role}
                                            </p>
                                        </div>

                                        {dashboardPath && (
                                            <Link
                                                to={dashboardPath}
                                                onClick={() => setIsAccountMenuOpen(false)}
                                                className="mt-2 flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-[var(--wasla-text)] transition hover:bg-[var(--wasla-background)]"
                                            >
                                                <LayoutDashboard size={17} />
                                                {dashboardLabels[language]}
                                            </Link>
                                        )}

                                        <button
                                            type="button"
                                            onClick={handleLogout}
                                            className="mt-1 flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50 dark:hover:bg-red-950/30"
                                        >
                                            <LogOut size={17} />
                                            {language === 'ar'
                                                ? 'تسجيل الخروج'
                                                : 'Logout'}
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Mobile Toggle */}
                    <button
                        type="button"
                        onClick={() => setIsMenuOpen((current) => !current)}
                        className="flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--wasla-border)] text-[var(--wasla-text)] transition hover:bg-[#59643b]/5 lg:hidden"
                        aria-label={isMenuOpen ? t('closeMenu') : t('menu')}
                        aria-expanded={isMenuOpen}
                        aria-controls="mobile-navigation"
                    >
                        {isMenuOpen ? <X size={21} /> : <Menu size={21} />}
                    </button>
                </div>
            </nav>

            {/* Mobile Navigation */}
            {isMenuOpen && (
                <div
                    id="mobile-navigation"
                    className="border-t border-[var(--wasla-border)] bg-[var(--wasla-surface)] px-4 py-5 shadow-lg lg:hidden sm:px-6"
                >
                    <div className="mx-auto flex max-w-7xl flex-col gap-2">
                        {renderNavigationLinks(true)}

                        <div className="my-2 border-t border-[var(--wasla-border)]" />

                        {!isAuthenticated ? (
                            <div className="flex flex-col gap-2">
                                <Link
                                    to="/login"
                                    onClick={() => setIsMenuOpen(false)}
                                    className="rounded-xl border border-[var(--wasla-border)] px-4 py-3 text-center text-sm font-semibold text-[var(--wasla-text)]"
                                >
                                    {t('login')}
                                </Link>

                                <Link
                                    to="/signup"
                                    onClick={() => setIsMenuOpen(false)}
                                    className="rounded-xl bg-[#59643b] px-4 py-3 text-center text-sm font-semibold text-white dark:bg-[#a6b47b] dark:text-[#171914]"
                                >
                                    {t('signup')}
                                </Link>
                            </div>
                        ) : (
                            <div className="rounded-xl border border-[var(--wasla-border)] p-4">
                                <div className="mb-3 flex items-center gap-3">
                                    <UserCircle
                                        size={30}
                                        className="text-[#59643b] dark:text-[#a6b47b]"
                                    />

                                    <div className="min-w-0">
                                        <p className="truncate text-sm font-bold text-[var(--wasla-text)]">
                                            {user?.name}
                                        </p>

                                        <p className="text-xs text-[var(--wasla-muted)]">
                                            {roleLabels[user?.role] || user?.role}
                                        </p>
                                    </div>
                                </div>

                                {dashboardPath && (
                                    <Link
                                        to={dashboardPath}
                                        onClick={() => setIsMenuOpen(false)}
                                        className="mb-2 flex items-center justify-center gap-2 rounded-lg border border-[var(--wasla-border)] px-4 py-3 text-sm font-semibold text-[var(--wasla-text)]"
                                    >
                                        <LayoutDashboard size={17} />
                                        {dashboardLabels[language]}
                                    </Link>
                                )}

                                <button
                                    type="button"
                                    onClick={handleLogout}
                                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-red-50 px-4 py-3 text-sm font-semibold text-red-600 dark:bg-red-950/30"
                                >
                                    <LogOut size={17} />
                                    {language === 'ar'
                                        ? 'تسجيل الخروج'
                                        : 'Logout'}
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
}

export default Navbar;
