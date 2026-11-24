
import { useEffect, useState } from 'react';
import {
    Link,
    NavLink,
    useLocation,
    useNavigate,
} from 'react-router-dom';

import {
    Languages,
    Menu,
    Moon,
    Sun,
    X,
    UserCircle,
    LogOut,
    ChevronDown,
    LayoutDashboard,
    MapPin,
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

function BrandLogo() {
    return (
        <Link
            to="/"
            className="group flex shrink-0 items-center gap-3"
            aria-label="WASLA home"
        >
            <span className="relative flex h-12 w-12 items-center justify-center">
                <span className="absolute inset-0 rounded-2xl bg-[#FF8A32] rotate-[-8deg] transition-transform duration-300 group-hover:rotate-0" />

                <span className="relative flex h-11 w-11 items-center justify-center rounded-2xl border-2 border-white/20 bg-[#102B43] text-[#FF8A32]">
                    <MapPin size={29} strokeWidth={2.5} />
                </span>

                <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full border-2 border-[#102B43] bg-[#FFD08A]" />
            </span>

            <span className="flex flex-col">
                <span className="text-[27px] font-black italic leading-none tracking-[0.08em] text-white transition-colors duration-300 group-hover:text-[#FFAD65]">
                    WASLA
                </span>

                <span className="mt-1 text-[10px] font-bold uppercase tracking-[0.22em] text-[#FF9A4D]">
                    Explore Egypt
                </span>
            </span>
        </Link>
    );
}

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
        relative rounded-full px-2 py-2.5 text-sm font-bold
        transition-all duration-200 ease-out
        ${
            isActive
                ? 'bg-[#FF8A32] text-[#10243A] shadow-md shadow-[#FF8A32]/20'
                : 'text-[#E6EDF4] hover:bg-white/10 hover:text-[#FFAD65]'
        }
    `;

    const actionButtonClass = `
        inline-flex h-10 items-center justify-center gap-2
        rounded-xl border border-white/20 bg-white/[0.04]
        px-3 text-sm font-semibold text-white
        transition-all duration-300
        hover:border-[#FF8A32] hover:bg-[#FF8A32]/10
        hover:text-[#FFAD65]
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
                            rounded-xl px-4 py-3 text-sm font-bold
                            transition-all duration-300
                            ${
                                isActive
                                    ? 'bg-[#FF8A32] text-[#10243A]'
                                    : 'text-white hover:bg-white/10 hover:text-[#FFAD65]'
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
        <header className="sticky top-0 z-50 border-b border-white/10 bg-[#10243A] shadow-xl shadow-[#071727]/20">
            <nav
                className="mx-auto flex min-h-[82px] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8"
                aria-label="Main navigation"
            >
                {/* Brand */}
                <BrandLogo />

                {/* Desktop Navigation */}
                <div className="hidden items-center gap-1 xl:flex">
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
                        className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/20 text-white transition-all duration-300 hover:border-[#FF8A32] hover:bg-[#FF8A32]/10 hover:text-[#FFAD65]"
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
                                    className="inline-flex h-10 items-center justify-center rounded-xl bg-[#FF8A32] px-4 text-sm font-extrabold text-[#10243A] shadow-md shadow-[#FF8A32]/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#FFAD65] hover:shadow-lg"
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
                                    <div className="absolute end-0 top-full mt-3 w-60 rounded-2xl border border-white/10 bg-[#10243A] p-3 shadow-2xl shadow-black/30">
                                        <div className="border-b border-white/10 px-3 pb-3">
                                            <p className="truncate text-sm font-bold text-white">
                                                {user?.name}
                                            </p>

                                            <p className="mt-1 text-xs text-[#FFAD65]">
                                                {roleLabels[user?.role] || user?.role}
                                            </p>
                                        </div>

                                        {dashboardPath && (
                                            <Link
                                                to={dashboardPath}
                                                onClick={() => setIsAccountMenuOpen(false)}
                                                className="mt-2 flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10 hover:text-[#FFAD65]"
                                            >
                                                <LayoutDashboard size={17} />
                                                {dashboardLabels[language]}
                                            </Link>
                                        )}

                                        <button
                                            type="button"
                                            onClick={handleLogout}
                                            className="mt-1 flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-semibold text-red-400 transition hover:bg-red-500/10"
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
                        className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/20 text-white transition hover:border-[#FF8A32] hover:bg-[#FF8A32]/10 lg:hidden"
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
                    className="border-t border-white/10 bg-[#10243A] px-4 py-5 shadow-xl lg:hidden sm:px-6"
                >
                    <div className="mx-auto flex max-w-7xl flex-col gap-2">
                        {renderNavigationLinks(true)}

                        <div className="my-2 border-t border-white/10" />

                        {!isAuthenticated ? (
                            <div className="flex flex-col gap-2">
                                <Link
                                    to="/login"
                                    onClick={() => setIsMenuOpen(false)}
                                    className="rounded-xl border border-white/20 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-white/10"
                                >
                                    {t('login')}
                                </Link>

                                <Link
                                    to="/signup"
                                    onClick={() => setIsMenuOpen(false)}
                                    className="rounded-xl bg-[#FF8A32] px-4 py-3 text-center text-sm font-extrabold text-[#10243A] transition hover:bg-[#FFAD65]"
                                >
                                    {t('signup')}
                                </Link>
                            </div>
                        ) : (
                            <div className="rounded-xl border border-white/10 p-4">
                                <div className="mb-3 flex items-center gap-3">
                                    <UserCircle
                                        size={30}
                                        className="text-[#FF8A32]"
                                    />

                                    <div className="min-w-0">
                                        <p className="truncate text-sm font-bold text-white">
                                            {user?.name}
                                        </p>

                                        <p className="text-xs text-[#FFAD65]">
                                            {roleLabels[user?.role] || user?.role}
                                        </p>
                                    </div>
                                </div>

                                {dashboardPath && (
                                    <Link
                                        to={dashboardPath}
                                        onClick={() => setIsMenuOpen(false)}
                                        className="mb-2 flex items-center justify-center gap-2 rounded-lg border border-white/20 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                                    >
                                        <LayoutDashboard size={17} />
                                        {dashboardLabels[language]}
                                    </Link>
                                )}

                                <button
                                    type="button"
                                    onClick={handleLogout}
                                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-red-500/10 px-4 py-3 text-sm font-semibold text-red-400 transition hover:bg-red-500/20"
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
