
import { Compass } from 'lucide-react';
import { usePreferences } from '../../../app/contexts/PreferencesContext.jsx';

function GuidesPage() {
    const { language } = usePreferences();
    const isArabic = language === 'ar';

    return (
        <section className="mx-auto flex min-h-[65vh] max-w-7xl flex-col items-center justify-center px-4 py-20 text-center">
            <Compass size={48} className="mb-6 text-[var(--wasla-primary)]" />

            <h1 className="mb-4 text-3xl font-bold md:text-5xl">
                {isArabic ? 'اكتشف المرشدين السياحيين' : 'Discover Tour Guides'}
            </h1>

            <p className="max-w-2xl text-base leading-8 text-[var(--wasla-muted)] md:text-lg">
                {isArabic
                    ? 'تعرف على المرشدين السياحيين المحترفين واكتشف مصر بصحبة خبراء يعرفون تفاصيلها.'
                    : 'Meet professional tour guides and discover Egypt with people who know it best.'}
            </p>
        </section>
    );
}

export default GuidesPage;
