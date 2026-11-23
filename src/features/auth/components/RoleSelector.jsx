
import { Backpack, MapPinned } from 'lucide-react';

function RoleSelector({ value, onChange, language = 'en' }) {
    const isArabic = language === 'ar';

    const roles = [
        {
            value: 'tourist',
            icon: Backpack,
            title: isArabic ? 'سائح' : 'Tourist',
            description: isArabic
                ? 'اكتشف الأماكن واحجز رحلاتك السياحية'
                : 'Explore destinations and book trips',
        },
        {
            value: 'guide',
            icon: MapPinned,
            title: isArabic ? 'مرشد سياحي' : 'Tour Guide',
            description: isArabic
                ? 'اعرض خدماتك واستقبل طلبات الحجز'
                : 'Offer your services and receive bookings',
        },
    ];

    return (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {roles.map((role) => {
                const Icon = role.icon;
                const isSelected = value === role.value;

                return (
                    <button
                        key={role.value}
                        type="button"
                        onClick={() => onChange(role.value)}
                        aria-pressed={isSelected}
                        className={`rounded-xl border p-4 text-start transition ${isSelected
                            ? 'border-[var(--wasla-primary)] bg-[var(--wasla-primary)]/10 ring-1 ring-[var(--wasla-primary)]'
                            : 'border-[var(--wasla-border)] hover:border-[var(--wasla-primary)]'
                            }`}
                    >
                        <Icon
                            size={26}
                            className="mb-3 text-[var(--wasla-primary)]"
                        />

                        <h3 className="font-bold text-[var(--wasla-text)]">
                            {role.title}
                        </h3>

                        <p className="mt-1 text-xs leading-6 text-[var(--wasla-muted)]">
                            {role.description}
                        </p>
                    </button>
                );
            })}
        </div>
    );
}

export default RoleSelector;
