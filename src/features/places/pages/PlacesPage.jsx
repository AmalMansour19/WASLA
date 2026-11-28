
import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import placesData from "../../../data/places-with-images.json";
import { getDestinationMeta } from "../data/mockDestinationMeta.js";
import { useAuth } from "../../../app/contexts/AuthContext.jsx";

import {
    getFavorites,
    addFavorite,
    removeFavorite,
} from "../services/favoritesService.js";

/* ========================================
   Constants
======================================== */

const HERO_WORDS = ["Adventure", "History", "Beauty", "Memories"];

const PRICE_OPTIONS = [
    { value: "all", label: "All Price Ranges" },
    { value: "100", label: "EGP 100" },
    { value: "150", label: "EGP 150" },
    { value: "200", label: "EGP 200" },
    { value: "250", label: "EGP 250" },
    { value: "300", label: "EGP 300" },
    { value: "400", label: "EGP 400" },
    { value: "500", label: "EGP 500" },
    { value: "650", label: "EGP 650" },
    { value: "100-150", label: "EGP 100 – 150" },
    { value: "150-200", label: "EGP 150 – 200" },
    { value: "200-300", label: "EGP 200 – 300" },
    { value: "300-400", label: "EGP 300 – 400" },
    { value: "400-500", label: "EGP 400 – 500" },
    { value: "500-650", label: "EGP 500 – 650" },
];

const RATING_OPTIONS = [
    { value: "all", label: "All Ratings" },
    { value: "3", label: "3.0+ Stars" },
    { value: "3.5", label: "3.5+ Stars" },
    { value: "4", label: "4.0+ Stars" },
    { value: "4.1", label: "4.1+ Stars" },
    { value: "4.2", label: "4.2+ Stars" },
    { value: "4.3", label: "4.3+ Stars" },
    { value: "4.4", label: "4.4+ Stars" },
    { value: "4.5", label: "4.5+ Stars" },
    { value: "4.6", label: "4.6+ Stars" },
    { value: "4.7", label: "4.7+ Stars" },
    { value: "4.8", label: "4.8+ Stars" },
    { value: "4.9", label: "4.9+ Stars" },
    { value: "5", label: "5.0 Stars" },
];

const INPUT_CLASS =
    "w-full rounded-xl border border-[#DFE6ED] bg-[#F9FBFD] px-4 py-3 text-sm text-[#183B56] outline-none transition-all duration-200 focus:border-[#F47C36] focus:bg-white focus:ring-4 focus:ring-[#F47C36]/10";

const LABEL_CLASS =
    "mb-2 flex items-center gap-2.5 text-sm font-bold text-[#183B56]";

/* ========================================
   Reusable SVG Icon
======================================== */

const Icon = ({ name, className = "h-5 w-5" }) => {
    const icons = {
        filter: (
            <>
                <path d="M4 6h16M7 12h10m-7 6h4" />
                <circle cx="4" cy="6" r="1" />
                <circle cx="17" cy="12" r="1" />
                <circle cx="10" cy="18" r="1" />
            </>
        ),
        search: (
            <>
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-4-4" />
            </>
        ),
        location: (
            <>
                <path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" />
                <circle cx="12" cy="10" r="2.5" />
            </>
        ),
        category: (
            <>
                <rect x="3" y="3" width="8" height="8" rx="2" />
                <rect x="13" y="3" width="8" height="8" rx="2" />
                <rect x="3" y="13" width="8" height="8" rx="2" />
                <rect x="13" y="13" width="8" height="8" rx="2" />
            </>
        ),
        price: (
            <>
                <path d="M12 2v20" />
                <path d="M17 5H9a3 3 0 0 0 0 6h6a3 3 0 0 1 0 6H7" />
            </>
        ),
        star: (
            <path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-2.9-5.6 2.9 1.1-6.2L3 9.6l6.2-.9L12 3Z" />
        ),
        heart: (
            <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 0 0-.1-7.8Z" />
        ),
        map: (
            <>
                <path d="m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3V6Z" />
                <path d="M9 3v15m6-12v15" />
            </>
        ),
        arrow: (
            <>
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
            </>
        ),
        external: (
            <>
                <path d="M14 4h6v6m0-6-9 9" />
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            </>
        ),
        reset: (
            <>
                <path d="M3 12a9 9 0 1 0 2.6-6.4L3 8" />
                <path d="M3 3v5h5" />
            </>
        ),
        close: <path d="m18 6-12 12M6 6l12 12" />,
        check: <path d="m5 12 4 4L19 6" />,
    };

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
            aria-hidden="true"
        >
            {icons[name] || null}
        </svg>
    );
};

/* ========================================
   Custom Select
======================================== */

const CustomSelect = ({ value, onChange, options, placeholder }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!dropdownRef.current?.contains(event.target)) {
                setIsOpen(false);
            }
        };

        const handleEscape = (event) => {
            if (event.key === "Escape") {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("keydown", handleEscape);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleEscape);
        };
    }, []);

    const selectedOption = options.find(
        (option) => option.value === value
    );

    return (
        <div ref={dropdownRef} className="relative w-full">
            <button
                type="button"
                onClick={() => setIsOpen((previous) => !previous)}
                aria-expanded={isOpen}
                aria-haspopup="listbox"
                className={`flex w-full items-center justify-between rounded-xl border bg-white px-4 py-3.5 text-left text-sm outline-none transition-all duration-200 ${
                    isOpen
                        ? "border-[#F47C36] shadow-[0_0_0_4px_rgba(244,124,54,0.10)]"
                        : "border-[#DFE6ED] hover:border-[#AABBCB]"
                }`}
            >
                <span
                    className={`truncate font-semibold ${
                        value === "all"
                            ? "text-[#8795A3]"
                            : "text-[#183B56]"
                    }`}
                >
                    {selectedOption?.label || placeholder}
                </span>

                <svg
                    className={`ml-3 h-4 w-4 shrink-0 text-[#F47C36] transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
                    }`}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="m6 9 6 6 6-6" />
                </svg>
            </button>

            {isOpen && (
                <div className="absolute left-0 top-full z-[60] mt-2 w-full overflow-hidden rounded-xl border border-[#E3EAF0] bg-white p-1.5 shadow-[0_12px_35px_rgba(16,43,64,0.16)]">
                    <div
                        role="listbox"
                        className="max-h-56 space-y-1 overflow-y-auto pr-1 [scrollbar-color:#F47C36_#F1F5F9] [scrollbar-width:thin]"
                    >
                        {options.map((option) => {
                            const isSelected = value === option.value;

                            return (
                                <button
                                    key={option.value}
                                    type="button"
                                    role="option"
                                    aria-selected={isSelected}
                                    onClick={() => {
                                        onChange(option.value);
                                        setIsOpen(false);
                                    }}
                                    className={`flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-all duration-150 ${
                                        isSelected
                                            ? "bg-[#183B56] font-bold text-white shadow-sm"
                                            : "text-[#526579] hover:bg-[#FFF1E8] hover:text-[#D96322]"
                                    }`}
                                >
                                    <span className="capitalize">
                                        {option.label}
                                    </span>

                                    {isSelected && (
                                        <Icon
                                            name="check"
                                            className="h-4 w-4 shrink-0 text-[#FF9557]"
                                        />
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};

/* ========================================
   Filter Field
======================================== */

const FilterField = ({ icon, label, children, iconColor }) => (
    <div>
        <label className={LABEL_CLASS}>
            <span
                className={`flex h-8 w-8 items-center justify-center rounded-lg ${
                    iconColor || "bg-[#FFF1E8] text-[#F47C36]"
                }`}
            >
                <Icon
                    name={icon}
                    className={`h-4 w-4 ${
                        icon === "star" ? "fill-current" : ""
                    }`}
                />
            </span>
            {label}
        </label>

        {children}
    </div>
);

/* ========================================
   Destination Card
======================================== */

const DestinationCard = ({
    place,
    meta,
    isFavorite,
    onFavorite,
    onViewDetails,
}) => {
    const imageSource = place.imageLicense || place.imageSource;

    return (
        <article
            data-place-card
            className="group flex h-full translate-y-5 flex-col overflow-hidden rounded-2xl border border-[#E5EAF0] bg-white opacity-0 shadow-[0_5px_20px_rgba(24,59,86,0.06)] transition-all duration-300 ease-out hover:-translate-y-1 hover:border-[#F5C3A4] hover:shadow-[0_14px_35px_rgba(24,59,86,0.13)]"
        >
            {/* Image */}
            <div className="relative h-56 overflow-hidden bg-[#E8EDF2]">
                <img
                    src={place.imageUrl}
                    alt={place.nameAr || place.nameEn}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                    onError={(event) => {
                        event.currentTarget.style.display = "none";
                    }}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#102B40]/65 via-transparent to-transparent" />

                <button
                    type="button"
                    onClick={() => onFavorite(place.id)}
                    aria-label={
                        isFavorite
                            ? "Remove from favorites"
                            : "Add to favorites"
                    }
                    className={`absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full border border-white/70 bg-white/95 shadow-lg backdrop-blur-sm transition duration-300 hover:scale-110 ${
                        isFavorite
                            ? "text-[#F47C36]"
                            : "text-[#183B56] hover:text-[#F47C36]"
                    }`}
                >
                    <Icon
                        name="heart"
                        className={`h-5 w-5 ${
                            isFavorite ? "fill-current" : ""
                        }`}
                    />
                </button>

                <span className="absolute left-4 top-4 rounded-full bg-[#F47C36] px-3 py-1.5 text-[11px] font-bold capitalize text-white shadow-md">
                    {place.category?.replaceAll("_", " ") || "Destination"}
                </span>

                <div className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-[#102B40]/75 px-3 py-1.5 text-xs font-bold text-white backdrop-blur-md">
                    <Icon
                        name="location"
                        className="h-3.5 w-3.5 text-[#FF9557]"
                    />
                    {place.governorate}
                </div>

                <div className="absolute bottom-4 right-4 inline-flex items-center gap-1.5 rounded-full bg-[#102B40]/80 px-3 py-1.5 text-xs font-bold text-white backdrop-blur-md">
                    <Icon
                        name="star"
                        className="h-3.5 w-3.5 fill-[#FFB13B] text-[#FFB13B]"
                    />
                    {meta.rating}
                </div>
            </div>

            {/* Content */}
            <div className="flex flex-1 flex-col p-5">
                <h2 className="mb-1 text-lg font-extrabold text-[#183B56] transition-colors group-hover:text-[#E66C2E]">
                    {place.nameAr || place.nameEn}
                </h2>

                {place.nameEn && place.nameEn !== place.nameAr && (
                    <p className="mb-2 text-xs font-medium text-[#8996A4]">
                        {place.nameEn}
                    </p>
                )}

                {place.descriptionAr && (
                    <p className="mb-4 line-clamp-2 min-h-10 text-sm leading-6 text-[#6F7E8D]">
                        {place.descriptionAr}
                    </p>
                )}

                <div className="mb-5 mt-auto flex items-center justify-between gap-2 border-t border-[#EDF0F3] pt-4">
                    <div>
                        <p className="mb-1 text-[11px] font-medium text-[#8996A4]">
                            Entry Price
                        </p>

                        <p className="inline-flex items-center gap-1 text-base font-extrabold text-[#E66C2E]">
                            <Icon name="price" className="h-4 w-4" />
                            EGP {meta.price}
                        </p>
                    </div>

                    <div className="text-right">
                        <p className="mb-1 text-[11px] font-medium text-[#8996A4]">
                            Reviews
                        </p>

                        <p className="text-sm font-bold text-[#183B56]">
                            {meta.reviewsCount}{" "}
                            <span className="font-normal text-[#8996A4]">
                                reviews
                            </span>
                        </p>
                    </div>
                </div>

                {/* Actions */}
                <div className="grid grid-cols-2 gap-2.5">
                    <button
                        type="button"
                        onClick={() => onViewDetails(place.id)}
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#F47C36] px-3 py-3 text-xs font-extrabold text-white transition duration-300 hover:bg-[#D96322] hover:shadow-lg hover:shadow-orange-500/20 sm:text-sm"
                    >
                        View Details
                        <Icon name="arrow" className="h-4 w-4" />
                    </button>

                    <a
                        href={
                            place.mapUrl ||
                            `https://www.google.com/maps?q=${place.latitude},${place.longitude}`
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#CBD7E1] bg-white px-3 py-3 text-xs font-bold text-[#183B56] transition duration-300 hover:border-[#183B56] hover:bg-[#183B56] hover:text-white sm:text-sm"
                    >
                        <Icon name="map" className="h-4 w-4" />
                        View Map
                        <Icon name="external" className="h-3.5 w-3.5" />
                    </a>
                </div>

                {place.imagePageUrl && (
                    <a
                        href={place.imagePageUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-3 text-center text-[10px] text-[#8A98A6] underline transition hover:text-[#E66C2E]"
                    >
                        Image source · {imageSource}
                    </a>
                )}
            </div>
        </article>
    );
};

/* ========================================
   Empty State
======================================== */

const EmptyState = ({ onClear }) => (
    <div className="rounded-2xl border border-dashed border-[#C9D5DF] bg-white px-6 py-20 text-center shadow-sm">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#FFF1E8] text-[#F47C36]">
            <Icon name="search" className="h-8 w-8" />
        </div>

        <h2 className="mb-3 text-xl font-extrabold text-[#183B56]">
            No destinations found
        </h2>

        <p className="mx-auto max-w-md text-sm leading-6 text-[#7B8794]">
            We couldn't find destinations matching your search. Try changing
            your filters or search for another place.
        </p>

        <button
            type="button"
            onClick={onClear}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#F47C36] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#D96322]"
        >
            <Icon name="reset" className="h-4 w-4" />
            Clear All Filters
        </button>
    </div>
);

/* ========================================
   Places Page
======================================== */

const PlacesPage = () => {
    const navigate = useNavigate();
    const { user, isAuthenticated } = useAuth();

    /* ---------- Filters State ---------- */

    const [search, setSearch] = useState("");
    const [governorate, setGovernorate] = useState("all");
    const [category, setCategory] = useState("all");
    const [maxPrice, setMaxPrice] = useState("all");
    const [minRating, setMinRating] = useState("all");
    const [showFilters, setShowFilters] = useState(false);

    /* ---------- Favorites State ---------- */

    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        if (isAuthenticated && user?.id) {
            setFavorites(getFavorites(user.id));
            return;
        }

        setFavorites([]);
    }, [user?.id, isAuthenticated]);

    /* ---------- Hero Typewriter ---------- */

    const [typedWord, setTypedWord] = useState("");
    const [wordIndex, setWordIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const currentWord = HERO_WORDS[wordIndex];
        let delay = isDeleting ? 25 : 55;

        if (!isDeleting && typedWord === currentWord) {
            delay = 500;
        } else if (isDeleting && typedWord === "") {
            delay = 150;
        }

        const timer = setTimeout(() => {
            if (!isDeleting) {
                if (typedWord === currentWord) {
                    setIsDeleting(true);
                } else {
                    setTypedWord(
                        currentWord.slice(0, typedWord.length + 1)
                    );
                }

                return;
            }

            if (typedWord === "") {
                setIsDeleting(false);
                setWordIndex(
                    (previous) => (previous + 1) % HERO_WORDS.length
                );
                return;
            }

            setTypedWord(
                currentWord.slice(0, typedWord.length - 1)
            );
        }, delay);

        return () => clearTimeout(timer);
    }, [typedWord, isDeleting, wordIndex]);

    /* ---------- Places Data ---------- */

    const validPlaces = useMemo(
        () =>
            placesData.filter(
                (place) =>
                    place.id &&
                    place.imageUrl &&
                    Number.isFinite(place.latitude) &&
                    Number.isFinite(place.longitude) &&
                    (place.nameAr || place.nameEn)
            ),
        []
    );

    const governorates = useMemo(
        () =>
            [
                ...new Set(
                    validPlaces
                        .map((place) => place.governorate)
                        .filter(Boolean)
                ),
            ].sort((a, b) => a.localeCompare(b, "ar")),
        [validPlaces]
    );

    const categories = useMemo(
        () =>
            [
                ...new Set(
                    validPlaces
                        .map((place) => place.category)
                        .filter(Boolean)
                ),
            ].sort(),
        [validPlaces]
    );

    /* ---------- Filtering ---------- */

    const filteredPlaces = useMemo(() => {
        const searchText = search.trim().toLowerCase();

        return validPlaces.filter((place) => {
            const meta = getDestinationMeta(place.id);

            const searchableFields = [
                place.nameAr,
                place.nameEn,
                place.descriptionAr,
                place.descriptionEn,
            ];

            const matchesSearch =
                !searchText ||
                searchableFields.some((value) =>
                    value?.toLowerCase().includes(searchText)
                );

            const matchesGovernorate =
                governorate === "all" ||
                place.governorate === governorate;

            const matchesCategory =
                category === "all" ||
                place.category === category;

            const matchesPrice = (() => {
                if (maxPrice === "all") return true;

                if (maxPrice.includes("-")) {
                    const [minimum, maximum] = maxPrice
                        .split("-")
                        .map(Number);

                    return (
                        meta.price >= minimum &&
                        meta.price <= maximum
                    );
                }

                return meta.price === Number(maxPrice);
            })();

            const matchesRating =
                minRating === "all" ||
                meta.rating >= Number(minRating);

            return (
                matchesSearch &&
                matchesGovernorate &&
                matchesCategory &&
                matchesPrice &&
                matchesRating
            );
        });
    }, [
        validPlaces,
        search,
        governorate,
        category,
        maxPrice,
        minRating,
    ]);

    /* ---------- Card Scroll Animation ---------- */

    const cardsContainerRef = useRef(null);

    useEffect(() => {
        const cards = cardsContainerRef.current?.querySelectorAll(
            "[data-place-card]"
        );

        if (!cards?.length) return;

        const timers = [];

        // Reset cards before observing the current results.
        cards.forEach((card) => {
            card.classList.remove("opacity-100", "translate-y-0");
            card.classList.add("opacity-0", "translate-y-5");
        });

        const observer = new IntersectionObserver(
            (entries) => {
                const visibleCards = entries
                    .filter((entry) => entry.isIntersecting)
                    .sort((first, second) => {
                        const position =
                            first.target.compareDocumentPosition(
                                second.target
                            );

                        return position &
                            Node.DOCUMENT_POSITION_FOLLOWING
                            ? -1
                            : 1;
                    });

                visibleCards.forEach((entry, index) => {
                    const timer = setTimeout(() => {
                        entry.target.classList.remove(
                            "opacity-0",
                            "translate-y-5"
                        );

                        entry.target.classList.add(
                            "opacity-100",
                            "translate-y-0"
                        );
                    }, index * 70);

                    timers.push(timer);
                    observer.unobserve(entry.target);
                });
            },
            {
                threshold: 0.1,
                rootMargin: "0px 0px -10px 0px",
            }
        );

        cards.forEach((card) => observer.observe(card));

        return () => {
            observer.disconnect();
            timers.forEach(clearTimeout);
        };
    }, [filteredPlaces]);

    /* ---------- Filter Actions ---------- */

    const clearFilters = () => {
        setSearch("");
        setGovernorate("all");
        setCategory("all");
        setMaxPrice("all");
        setMinRating("all");
    };

    const hasActiveFilters =
        search.trim() !== "" ||
        governorate !== "all" ||
        category !== "all" ||
        maxPrice !== "all" ||
        minRating !== "all";

    /* ---------- Favorite Actions ---------- */

    const handleFavorite = (placeId) => {
        if (!isAuthenticated || !user?.id) {
            navigate("/signup", {
                state: { favoritePlaceId: placeId },
            });
            return;
        }

        const updatedFavorites = favorites.includes(placeId)
            ? removeFavorite(user.id, placeId)
            : addFavorite(user.id, placeId);

        setFavorites(updatedFavorites);
    };

    /* ========================================
       Render
    ======================================== */

    return (
        <main className="min-h-screen bg-[#F7F8FA] pb-16 text-[#183B56]">
            {/* Hero Section */}
            <section
                className="relative isolate overflow-hidden bg-[#102B40]"
                style={{
                    backgroundImage: `
                        linear-gradient(90deg, rgba(9,28,43,0.94) 0%, rgba(9,28,43,0.76) 48%, rgba(9,28,43,0.22) 100%),
                        url('${placesData[0]?.imageUrl || ""}')
                    `,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-[#F47C36]/15 blur-[100px]" />
                <div className="absolute -bottom-40 left-1/4 h-96 w-96 rounded-full bg-[#244D70]/40 blur-[100px]" />

                <div className="relative mx-auto flex min-h-[490px] max-w-[1500px] items-center px-6 py-24 sm:px-10 lg:px-16">
                    <div className="max-w-3xl">
                        <h1 className="mb-6 text-5xl font-extrabold leading-[1.15] tracking-tight text-white sm:text-6xl lg:text-7xl">
                            Every Journey

                            <span className="mt-3 flex min-h-[1.2em] items-center gap-3 text-[#FF9557]">
                                Starts with{" "}
                                <span className="relative inline-block">
                                    {typedWord}
                                    <span className="ml-1 inline-block h-[0.85em] w-[3px] translate-y-1 animate-pulse bg-[#FF9557]" />
                                </span>
                            </span>
                        </h1>

                        <p className="mb-10 max-w-xl text-base leading-8 text-white/75 sm:text-lg">
                            From ancient wonders to hidden gems, discover Egypt
                            through experiences worth remembering.
                        </p>

                        <a
                            href="#destinations"
                            className="group inline-flex items-center gap-4 rounded-full bg-[#F47C36] px-7 py-4 text-sm font-bold text-white shadow-[0_10px_30px_rgba(244,124,54,0.25)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#D96322] hover:shadow-[0_15px_35px_rgba(244,124,54,0.35)]"
                        >
                            Explore Destinations

                            <span className="transition-transform duration-300 group-hover:translate-x-1">
                                <Icon name="arrow" className="h-5 w-5" />
                            </span>
                        </a>
                    </div>
                </div>

                <div className="absolute bottom-0 left-0 h-[3px] w-full bg-gradient-to-r from-[#F47C36] via-[#FF9557] to-transparent" />
            </section>

            {/* Main Content */}
            <div
                id="destinations"
                className="mx-auto max-w-[1500px] px-4 pt-9 sm:px-6 lg:px-10"
            >
                {/* Mobile Filters Toggle */}
                <button
                    type="button"
                    onClick={() => setShowFilters((previous) => !previous)}
                    aria-expanded={showFilters}
                    className="mb-5 flex w-full items-center justify-between rounded-xl bg-gradient-to-r from-[#102B40] to-[#244D70] px-5 py-4 font-bold text-white shadow-md transition hover:shadow-lg lg:hidden"
                >
                    <span className="flex items-center gap-3">
                        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-[#FF9557]">
                            <Icon name="filter" className="h-5 w-5" />
                        </span>
                        Filters & Search
                    </span>

                    <Icon
                        name={showFilters ? "close" : "filter"}
                        className="h-5 w-5 text-[#FF9557]"
                    />
                </button>

                <div className="grid items-start gap-7 lg:grid-cols-[290px_minmax(0,1fr)] xl:grid-cols-[310px_minmax(0,1fr)]">
                    {/* Filters Sidebar */}
                    <aside
                        className={`${
                            showFilters ? "block" : "hidden"
                        } overflow-visible rounded-2xl border border-[#E4EAF0] bg-white shadow-[0_8px_30px_rgba(24,59,86,0.07)] lg:sticky lg:top-24 lg:flex lg:h-[calc(100vh-7rem)] lg:flex-col`}
                    >
                        <div className="flex shrink-0 items-center justify-between rounded-t-2xl bg-gradient-to-r from-[#102B40] to-[#244D70] px-5 py-5">
                            <h2 className="flex items-center gap-3 text-lg font-extrabold text-white">
                                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F47C36]/20 text-[#FF9557]">
                                    <Icon name="filter" className="h-6 w-6" />
                                </span>
                                Filters
                            </h2>

                            <button
                                type="button"
                                onClick={clearFilters}
                                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#FFB17F] transition hover:text-white"
                            >
                                <Icon name="reset" className="h-4 w-4" />
                                Clear All
                            </button>
                        </div>

                        <div className="min-h-0 flex-1 space-y-6 overflow-y-auto overflow-x-visible rounded-b-2xl p-5 [scrollbar-color:#F47C36_#F1F5F9] [scrollbar-width:thin]">
                            <FilterField icon="search" label="Search Destination">
                                <input
                                    type="search"
                                    value={search}
                                    onChange={(event) =>
                                        setSearch(event.target.value)
                                    }
                                    placeholder="Search for places..."
                                    className={INPUT_CLASS}
                                />
                            </FilterField>

                            <FilterField icon="location" label="Governorate">
                                <CustomSelect
                                    value={governorate}
                                    onChange={setGovernorate}
                                    placeholder="Select Governorate"
                                    options={[
                                        {
                                            value: "all",
                                            label: "All Governorates",
                                        },
                                        ...governorates.map((item) => ({
                                            value: item,
                                            label: item,
                                        })),
                                    ]}
                                />
                            </FilterField>

                            <FilterField icon="category" label="Category">
                                <CustomSelect
                                    value={category}
                                    onChange={setCategory}
                                    placeholder="Select Category"
                                    options={[
                                        {
                                            value: "all",
                                            label: "All Categories",
                                        },
                                        ...categories.map((item) => ({
                                            value: item,
                                            label: item.replaceAll("_", " "),
                                        })),
                                    ]}
                                />
                            </FilterField>

                            <FilterField icon="price" label="Price Range">
                                <CustomSelect
                                    value={maxPrice}
                                    onChange={setMaxPrice}
                                    placeholder="Select Price Range"
                                    options={PRICE_OPTIONS}
                                />
                            </FilterField>

                            <FilterField
                                icon="star"
                                label="Rating"
                                iconColor="bg-[#FFF7E8] text-[#E9A323]"
                            >
                                <CustomSelect
                                    value={minRating}
                                    onChange={setMinRating}
                                    placeholder="Select Rating"
                                    options={RATING_OPTIONS}
                                />
                            </FilterField>

                            {/* Reset Filters */}
                            <div className="border-t border-[#E8EDF2] pt-5">
                                <button
                                    type="button"
                                    onClick={() => setShowFilters(false)}
                                    className="w-full rounded-xl bg-gradient-to-r from-[#F47C36] to-[#FF9557] px-5 py-3.5 text-sm font-extrabold text-white shadow-lg shadow-orange-500/20 transition duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-orange-500/30 lg:hidden"
                                >
                                    Show Results
                                </button>

                                <button
                                    type="button"
                                    onClick={clearFilters}
                                    className="hidden w-full items-center justify-center gap-2 rounded-xl border border-[#E1E8EF] px-5 py-3 text-sm font-bold text-[#244D70] transition hover:border-[#F47C36] hover:bg-[#FFF1E8] hover:text-[#D96322] lg:flex"
                                >
                                    <Icon name="reset" className="h-4 w-4" />
                                    Reset Filters
                                </button>
                            </div>
                        </div>
                    </aside>

                    {/* Results */}
                    <section className="min-w-0">
                        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                            <div className="flex items-center gap-3">
                                <span className="h-8 w-1.5 rounded-full bg-[#F47C36]" />

                                <p className="text-sm font-semibold text-[#526579]">
                                    Showing{" "}
                                    <strong className="text-[#183B56]">
                                        {filteredPlaces.length}
                                    </strong>{" "}
                                    of {validPlaces.length} destinations
                                </p>
                            </div>

                            {hasActiveFilters && (
                                <button
                                    type="button"
                                    onClick={clearFilters}
                                    className="inline-flex items-center gap-1.5 text-sm font-bold text-[#E66C2E] transition hover:text-[#183B56]"
                                >
                                    <Icon name="close" className="h-4 w-4" />
                                    Clear active filters
                                </button>
                            )}
                        </div>

                        {/* Destination Cards */}
                        {filteredPlaces.length > 0 ? (
                            <div
                                ref={cardsContainerRef}
                                className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3"
                            >
                                {filteredPlaces.map((place) => (
                                    <DestinationCard
                                        key={place.id}
                                        place={place}
                                        meta={getDestinationMeta(place.id)}
                                        isFavorite={favorites.includes(place.id)}
                                        onFavorite={handleFavorite}
                                        onViewDetails={(placeId) =>
                                            navigate(`/places/${placeId}`)
                                        }
                                    />
                                ))}
                            </div>
                        ) : (
                            <EmptyState onClear={clearFilters} />
                        )}
                    </section>
                </div>

                {/* Data Disclaimer */}
                <p className="mt-10 border-t border-[#E5EAF0] pt-5 text-xs leading-6 text-[#8996A4]">
                    Destination information is provided by the WASLA local
                    dataset. Prices and ratings are mock data for demonstration
                    purposes. Image credits and licenses should be checked
                    before publication.
                </p>
            </div>
        </main>
    );
};

export default PlacesPage;
