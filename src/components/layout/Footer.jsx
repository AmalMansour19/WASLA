
import { Link } from 'react-router-dom';
import {
    MapPin,
    ArrowUp,
    Compass,
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
        <footer className="mt-auto overflow-hidden bg-[#10243A] text-white">

            {/* Main Footer */}
            <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 sm:px-8 md:grid-cols-2 lg:grid-cols-3">

                {/* Brand */}
                <div>
                    <Link to="/" className="group inline-flex items-center gap-3">
                        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FF8A32] text-[#10243A] transition-transform duration-300 group-hover:rotate-12">
                            <Compass size={27} strokeWidth={2.5} />
                        </span>

                        <span className="flex flex-col">
                            <span className="text-3xl font-black italic tracking-widest text-white">
                                WASLA
                            </span>

                            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#FFAD65]">
                                Explore Egypt
                            </span>
                        </span>
                    </Link>

                    <p className="mt-6 max-w-sm text-sm leading-8 text-[#C4D0DC]">
                        {t('discoverDestinations')}
                    </p>

                    <p className="mt-5 flex items-center gap-2 text-sm font-semibold text-[#FFAD65]">
                        <MapPin size={18} />
                        {t('country')}
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="mb-6 text-xl font-extrabold text-white">
                        {t('quickLinks')}
                    </h3>

                    <div className="flex flex-col items-start gap-4">
                        {quickLinks.map((link) => (
                            <Link
                                key={link.to}
                                to={link.to}
                                className="text-sm font-medium text-[#C4D0DC] transition-all duration-300 hover:translate-x-1 hover:text-[#FFAD65]"
                            >
                                {t(link.key)}
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Explore */}
                <div>
                    <h3 className="mb-6 text-xl font-extrabold text-white">
                        {t('exploreEgypt')}
                    </h3>

                    <p className="max-w-xs text-sm leading-8 text-[#C4D0DC]">
                        {t('discoverDestinations')}
                    </p>

                    <Link
                        to="/places"
                        className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#FF8A32] px-5 py-3 text-sm font-extrabold text-[#10243A] transition-all duration-300 hover:-translate-y-1 hover:bg-[#FFAD65]"
                    >
                        {language === 'ar' ? 'اكتشف مصر' : 'Explore Egypt'}
                        <Compass size={17} />
                    </Link>
                </div>
            </div>

            {/* Bottom Footer */}
            <div className="border-t border-white/10 bg-[#0B1C2C]">
                <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-6 text-center sm:px-8 md:flex-row md:text-start">

                    <p className="text-xs text-[#A9B8C7]">
                        © {currentYear} WASLA. {t('allRightsReserved')}
                    </p>

                    <button
                        type="button"
                        onClick={() => window.scrollTo({
                            top: 0,
                            behavior: 'smooth',
                        })}
                        className="inline-flex items-center gap-2 text-sm font-bold text-[#FFAD65] transition-colors hover:text-white"
                    >
                        {language === 'ar' ? 'العودة للأعلى' : 'Back to top'}
                        <ArrowUp size={17} />
                    </button>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
