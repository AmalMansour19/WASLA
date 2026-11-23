
import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState,
} from 'react';

const PreferencesContext = createContext(null);

const translations = {
    en: {
        country: 'Egypt',
        discoverDestinations: 'Discover new destinations',
        home: 'Home',
        explore: 'Destinations',
        guides: 'Find a Guide',
        packages: 'Tour Packages',
        about: 'About Us',
        contact: 'Contact',
        login: 'Log In',
        signup: 'Sign Up',
        becomeGuide: 'Become a Guide',
        becomeProvider: 'Become a Provider',
        exploreEgypt: 'Explore Egypt',
        quickLinks: 'Quick Links',
        usefulLinks: 'Useful Links',
        language: 'Language',
        appearance: 'Appearance',
        light: 'Light',
        dark: 'Dark',
        followUs: 'Follow Us',
        allRightsReserved: 'All rights reserved.',
        menu: 'Menu',
        closeMenu: 'Close menu',
    },
    ar: {
        country: 'مصر',
        discoverDestinations: 'اكتشف وجهات جديدة',
        home: 'الرئيسية',
        explore: 'الوجهات السياحية',
        guides: 'ابحث عن مرشد سياحي',
        packages: 'الرحلات السياحية',
        about: 'من نحن',
        contact: 'تواصل معنا',
        login: 'تسجيل الدخول',
        signup: 'إنشاء حساب',
        becomeGuide: 'انضم كمرشد سياحي',
        becomeProvider: 'انضم كمقدم خدمة',
        exploreEgypt: 'اكتشف مصر',
        quickLinks: 'روابط سريعة',
        usefulLinks: 'روابط مهمة',
        language: 'اللغة',
        appearance: 'المظهر',
        light: 'فاتح',
        dark: 'داكن',
        followUs: 'تابعنا',
        allRightsReserved: 'جميع الحقوق محفوظة.',
        menu: 'القائمة',
        closeMenu: 'إغلاق القائمة',
    },
};

function getSavedPreference(key, fallback) {
    try {
        const value = localStorage.getItem(key);
        return value || fallback;
    } catch {
        return fallback;
    }
}

function savePreference(key, value) {
    try {
        localStorage.setItem(key, value);
    } catch {
        // Preferences will still work for the current session.
    }
}

export function PreferencesProvider({ children }) {
    const [language, setLanguage] = useState(() => {
        const saved = getSavedPreference('wasla-language', 'en');
        return saved === 'ar' ? 'ar' : 'en';
    });

    const [theme, setTheme] = useState(() => {
        const saved = getSavedPreference('wasla-theme', 'light');
        return saved === 'dark' ? 'dark' : 'light';
    });

    useEffect(() => {
        document.documentElement.lang = language;
        document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
        savePreference('wasla-language', language);
    }, [language]);

    useEffect(() => {
        document.documentElement.classList.toggle('dark', theme === 'dark');
        document.documentElement.style.colorScheme = theme;
        savePreference('wasla-theme', theme);
    }, [theme]);

    const toggleLanguage = useCallback(() => {
        setLanguage((current) => current === 'en' ? 'ar' : 'en');
    }, []);

    const toggleTheme = useCallback(() => {
        setTheme((current) => current === 'light' ? 'dark' : 'light');
    }, []);

    const t = useCallback(
        (key) => translations[language]?.[key] ?? key,
        [language]
    );

    const value = useMemo(
        () => ({
            language,
            setLanguage,
            toggleLanguage,
            theme,
            setTheme,
            toggleTheme,
            t,
        }),
        [language, theme, toggleLanguage, toggleTheme, t]
    );

    return (
        <PreferencesContext.Provider value={value}>
            {children}
        </PreferencesContext.Provider>
    );
}

export function usePreferences() {
    const context = useContext(PreferencesContext);

    if (!context) {
        throw new Error(
            'usePreferences must be used inside PreferencesProvider'
        );
    }

    return context;
}
