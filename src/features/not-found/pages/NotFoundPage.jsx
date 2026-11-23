
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';
import { usePreferences } from '../../../app/contexts/PreferencesContext.jsx';

function NotFoundPage() {
    const { language } = usePreferences();
    const isArabic = language === 'ar';

    return (
        <section className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
            <h1 className="text-8xl font-bold text-[var(--wasla-primary)]">
                404
            </h1>

            <h2 className="mt-6 text-2xl font-bold">
                {isArabic ? 'الصفحة غير موجودة' : 'Page Not Found'}
            </h2>

            <p className="mt-3 text-[var(--wasla-muted)]">
                {isArabic
                    ? 'عذرًا، الصفحة التي تبحث عنها غير متاحة.'
                    : "Sorry, the page you're looking for doesn't exist."}
            </p>

            <Link
                to="/"
                className="mt-8 inline-flex items-center gap-2 rounded-lg bg-[var(--wasla-primary)] px-6 py-3 font-medium text-white transition hover:opacity-90"
            >
                <Home size={18} />
                {isArabic ? 'العودة للرئيسية' : 'Back to Home'}
            </Link>
        </section>
    );
}

export default NotFoundPage;
