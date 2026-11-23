
import { Link } from 'react-router-dom';
import {
    Compass,
    MapPin,
    ArrowUp,
} from 'lucide-react';

import { usePreferences } from '../../app/contexts/PreferencesContext.jsx';

function Footer() {
    const { t, language } = usePreferences();

    const currentYear = new Date().getFullYear();

    const quickLinks = [
        { to: '/', key: 'home' },
        { to: '/places', key: 'explore' },
        { to: '/guides', key: 'guides' },
        { to: '/packages', key: 'packages' },
        { to: '/about', key: 'about' },
        { to: '/contact', key: 'contact' },
    ];

    return (
        <footer className="mt-auto border-t border-[var(--wasla-border)] bg-[var(--wasla-surface)]">
            <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-2 lg:grid-cols-3 lg:px-8">

                {/* Brand */}
                <div>
                    <Link to="/" className="inline-flex items-center gap-3">
                        <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#59643b] text-white">
                            <Compass size={24} />
                        </span>

                        <span className="text-2xl font-black tracking-[0.12em] text-[#59643b] dark:text-[#a6b47b]">
                            WASLA
                        </span>
                    </Link>

                    <p className="mt-5 max-w-sm text-sm leading-7 text-[var(--wasla-muted)]">
                        {t('discoverDestinations')}
                    </p>

                    <p className="mt-3 flex items-center gap-2 text-sm text-[var(--wasla-muted)]">
                        <MapPin size={17} className="shrink-0" />
                        {t('country')}
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="mb-5 font-bold text-[var(--wasla-text)]">
                        {t('quickLinks')}
                    </h3>

                    <div className="flex flex-col items-start gap-3">
                        {quickLinks.map((link) => (
                            <Link
                                key={link.to}
                                to={link.to}
                                className="text-sm text-[var(--wasla-muted)] transition hover:text-[#59643b] dark:hover:text-[#a6b47b]"
                            >
                                {t(link.key)}
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Explore */}
                <div>
                    <h3 className="mb-5 font-bold text-[var(--wasla-text)]">
                        {t('exploreEgypt')}
                    </h3>

                    <p className="max-w-xs text-sm leading-7 text-[var(--wasla-muted)]">
                        {t('discoverDestinations')}
                    </p>
                </div>
            </div>

            {/* Copyright */}
            <div className="border-t border-[var(--wasla-border)]">
                <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-5 text-center sm:px-6 md:flex-row md:text-start lg:px-8">
                    <p className="text-xs text-[var(--wasla-muted)]">
                        © {currentYear} WASLA. {t('allRightsReserved')}
                    </p>

                    <button
                        type="button"
                        onClick={() => window.scrollTo({
                            top: 0,
                            behavior: 'smooth',
                        })}
                        className="inline-flex items-center gap-2 text-xs font-semibold text-[#59643b] transition hover:text-[#414b2b] dark:text-[#a6b47b]"
                    >
                        {language === 'ar' ? 'العودة للأعلى' : 'Back to top'}
                        <ArrowUp size={15} />
                    </button>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
