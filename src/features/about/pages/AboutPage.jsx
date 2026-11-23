
import { Heart } from 'lucide-react';
import { usePreferences } from '../../../app/contexts/PreferencesContext.jsx';

function AboutPage() {
    const { language } = usePreferences();
    const isArabic = language === 'ar';

    return (
        <section className="mx-auto flex min-h-[65vh] max-w-7xl flex-col items-center justify-center px-4 py-20 text-center">
            <Heart size={48} className="mb-6 text-[var(--wasla-primary)]" />

            <h1 className="mb-4 text-3xl font-bold md:text-5xl">
                {isArabic ? 'عن WASLA' : 'About WASLA'}
            </h1>

            <p className="max-w-2xl text-base leading-8 text-[var(--wasla-muted)] md:text-lg">
                {isArabic
                    ? 'WASLA منصة تهدف إلى ربط المسافرين بالأماكن السياحية والمرشدين والرحلات المميزة في مصر.'
                    : 'WASLA connects travelers with destinations, professional guides, and memorable trips across Egypt.'}
            </p>
        </section>
    );
}

export default AboutPage;
