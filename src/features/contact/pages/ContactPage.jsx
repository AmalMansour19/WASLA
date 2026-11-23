
import { Mail } from 'lucide-react';
import { usePreferences } from '../../../app/contexts/PreferencesContext.jsx';

function ContactPage() {
    const { language } = usePreferences();
    const isArabic = language === 'ar';

    return (
        <section className="mx-auto flex min-h-[65vh] max-w-7xl flex-col items-center justify-center px-4 py-20 text-center">
            <Mail size={48} className="mb-6 text-[var(--wasla-primary)]" />

            <h1 className="mb-4 text-3xl font-bold md:text-5xl">
                {isArabic ? 'تواصل معنا' : 'Contact Us'}
            </h1>

            <p className="max-w-2xl text-base leading-8 text-[var(--wasla-muted)] md:text-lg">
                {isArabic
                    ? 'يسعدنا استقبال استفساراتك وملاحظاتك. نعمل دائمًا على تحسين تجربتك مع WASLA.'
                    : 'We would love to hear your questions and feedback. We are always working to improve your WASLA experience.'}
            </p>
        </section>
    );
}

export default ContactPage;
