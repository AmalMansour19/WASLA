
import { Backpack, MapPinned, Check } from 'lucide-react';

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
        <div
            className="grid grid-cols-1 gap-3 sm:grid-cols-2"
            role="group"
            aria-label={isArabic ? 'اختيار نوع الحساب' : 'Select account type'}
        >
            {roles.map((role) => {
                const Icon = role.icon;
                const isSelected = value === role.value;

                return (
                    <button
                        key={role.value}
                        type="button"
                        onClick={() => onChange(role.value)}
                        aria-pressed={isSelected}
                        className={`
                            group relative rounded-2xl border p-4 text-start
                            transition-all duration-200
                            focus-visible:outline-none
                            focus-visible:ring-4
                            focus-visible:ring-[#FF8A32]/20
                            ${isSelected
                                ? 'border-[#102B43] bg-[#FFF3E9] shadow-sm ring-1 ring-[#102B43]/10 dark:border-[#FF8A32] dark:bg-[#FF8A32]/10'
                                : 'border-[#DCE3EA] bg-white hover:border-[#FF8A32] hover:bg-[#FFF9F4] dark:border-[#35485A] dark:bg-[#1C2D3C] dark:hover:border-[#FF8A32] dark:hover:bg-[#203447]'
                            }
                        `}
                    >
                        {/* Selected Indicator */}
                        {isSelected && (
                            <span className="absolute end-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-[#102B43] text-white dark:bg-[#FF8A32] dark:text-[#102B43]">
                                <Check size={12} strokeWidth={3} />
                            </span>
                        )}

                        {/* Icon */}
                        <div
                            className={`
                                mb-4 flex h-11 w-11 items-center justify-center
                                rounded-xl transition-colors
                                ${isSelected
                                    ? 'bg-[#FF8A32] text-[#102B43]'
                                    : 'bg-[#EDF2F7] text-[#102B43] group-hover:bg-[#FFF0E3] group-hover:text-[#E87520] dark:bg-[#2B4052] dark:text-white'
                                }
                            `}
                        >
                            <Icon size={23} strokeWidth={2} />
                        </div>

                        {/* Content */}
                        <h3 className="font-bold text-[#102B43] dark:text-white">
                            {role.title}
                        </h3>

                        <p className="mt-1 text-xs leading-6 text-[#718096] dark:text-[#AAB8C5]">
                            {role.description}
                        </p>

                        {/* Bottom Accent */}
                        <div
                            className={`mt-4 h-1 w-9 rounded-full transition-all ${isSelected
                                    ? 'w-12 bg-[#FF8A32]'
                                    : 'bg-[#DCE3EA] group-hover:w-12 group-hover:bg-[#FF8A32] dark:bg-[#526577]'
                                }`}
                        />
                    </button>
                );
            })}
        </div>
    );
}

export default RoleSelector;
