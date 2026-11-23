
import { BriefcaseBusiness } from 'lucide-react';
import { usePreferences } from '../../../app/contexts/PreferencesContext.jsx';

function PackagesPage() {
    const { language } = usePreferences();
    const isArabic = language === 'ar';

    return (
        <section className="mx-auto flex min-h-[65vh] max-w-7xl flex-col items-center justify-center px-4 py-20 text-center">
            <BriefcaseBusiness size={48} className="mb-6 text-[var(--wasla-primary)]" />

            <h1 className="mb-4 text-3xl font-bold md:text-5xl">
                {isArabic ? 'الرحلات والباقات السياحية' : 'Tour Packages'}
            </h1>

            <p className="max-w-2xl text-base leading-8 text-[var(--wasla-muted)] md:text-lg">
                {isArabic
                    ? 'استكشف مجموعة متنوعة من الرحلات والباقات السياحية لاختيار تجربتك القادمة في مصر.'
                    : 'Explore different trips and tour packages to plan your next Egyptian adventure.'}
            </p>
        </section>
    );
}

export default PackagesPage;
