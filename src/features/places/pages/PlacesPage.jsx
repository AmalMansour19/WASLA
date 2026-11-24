
import { useMemo, useState } from "react";
import placesData from "../../../data/places-with-images.json";

const PlacesPage = () => {
    const [search, setSearch] = useState("");
    const [governorate, setGovernorate] = useState("all");
    const [category, setCategory] = useState("all");

    // Prepare places for display
    const validPlaces = useMemo(() => {
        return placesData.filter((place) => {
            return (
                place.id &&
                place.imageUrl &&
                Number.isFinite(place.latitude) &&
                Number.isFinite(place.longitude) &&
                (place.nameAr || place.nameEn)
            );
        });
    }, []);

    // Available governorates
    const governorates = useMemo(() => {
        return [
            ...new Set(
                validPlaces
                    .map((place) => place.governorate)
                    .filter(Boolean)
            ),
        ].sort((a, b) => a.localeCompare(b, "ar"));
    }, [validPlaces]);

    // Available categories
    const categories = useMemo(() => {
        return [
            ...new Set(
                validPlaces
                    .map((place) => place.category)
                    .filter(Boolean)
            ),
        ].sort();
    }, [validPlaces]);

    // Search and filtering
    const filteredPlaces = useMemo(() => {
        const searchText = search.trim().toLowerCase();

        return validPlaces.filter((place) => {
            const matchesSearch = [
                place.nameAr,
                place.nameEn,
                place.descriptionAr,
                place.descriptionEn,
            ]
                .filter(Boolean)
                .some((value) =>
                    value.toLowerCase().includes(searchText)
                );

            const matchesGovernorate =
                governorate === "all" ||
                place.governorate === governorate;

            const matchesCategory =
                category === "all" ||
                place.category === category;

            return (
                matchesSearch &&
                matchesGovernorate &&
                matchesCategory
            );
        });
    }, [validPlaces, search, governorate, category]);

    const clearFilters = () => {
        setSearch("");
        setGovernorate("all");
        setCategory("all");
    };

    return (
        <main className="min-h-screen bg-[#FFF8ED] px-4 py-12 text-[#183B4E]">
            <div className="mx-auto max-w-7xl">

                {/* Header */}
                <section className="mb-10">
                    <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-[#FF7657]">
                        Discover Egypt
                    </p>

                    <h1 className="mb-4 text-4xl font-extrabold text-[#183B4E] md:text-6xl">
                        Explore Egypt
                    </h1>

                    <p className="max-w-2xl leading-7 text-gray-600">
                        Discover historical landmarks, beautiful beaches,
                        and unique destinations across Egypt.
                    </p>
                </section>

                {/* Search and Filters */}
                <section className="mb-8 grid gap-4 rounded-3xl border border-[#E8DFCE] bg-white p-6 shadow-lg md:grid-cols-3">

                    <input
                        type="search"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search destinations..."
                        className="rounded-xl border border-gray-200 px-4 py-3 outline-none transition-all duration-300 focus:border-[#087F8C] focus:ring-2 focus:ring-[#087F8C]/20"
                    />

                    <select
                        value={governorate}
                        onChange={(e) => setGovernorate(e.target.value)}
                        className="rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none transition-all duration-300 focus:border-[#087F8C]"
                    >
                        <option value="all">All governorates</option>

                        {governorates.map((item) => (
                            <option key={item} value={item}>
                                {item}
                            </option>
                        ))}
                    </select>

                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="rounded-xl border border-gray-200 bg-white px-4 py-3 outline-none transition-all duration-300 focus:border-[#087F8C]"
                    >
                        <option value="all">All categories</option>

                        {categories.map((item) => (
                            <option key={item} value={item}>
                                {item.replaceAll("_", " ")}
                            </option>
                        ))}
                    </select>
                </section>

                {/* Results */}
                <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
                    <p className="text-sm text-gray-600">
                        Showing{" "}
                        <strong className="text-[#087F8C]">
                            {filteredPlaces.length}
                        </strong>{" "}
                        destinations
                    </p>

                    {(search || governorate !== "all" || category !== "all") && (
                        <button
                            onClick={clearFilters}
                            className="text-sm font-bold text-[#FF7657] transition-colors duration-300 hover:text-[#087F8C]"
                        >
                            Clear filters
                        </button>
                    )}
                </div>

                {/* Places */}
                {filteredPlaces.length > 0 ? (
                    <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
                        {filteredPlaces.map((place) => (
                            <article
                                key={place.id}
                                className="group overflow-hidden rounded-3xl border border-[#E8DFCE] bg-white shadow-md transition-transform duration-300 ease-out transform-gpu will-change-transform hover:-translate-y-1 hover:shadow-lg"
                            >
                                {/* Image */}
                                <div className="relative h-60 overflow-hidden bg-gray-100">
                                    <img
                                        src={place.imageUrl}
                                        alt={place.nameAr || place.nameEn}
                                        loading="lazy"
className="h-full w-full object-cover transform-gpu transition-transform duration-500 ease-out group-hover:scale-[1.04]"                                        onError={(e) => {
                                            e.currentTarget.style.display = "none";
                                        }}
                                    />

                                    {/* Category */}
                                    <span className="absolute left-3 top-3 rounded-full bg-[#FFC857] px-4 py-2 text-xs font-bold capitalize text-[#183B4E] shadow-md">
                                        {place.category?.replaceAll("_", " ") || "Destination"}
                                    </span>
                                </div>

                                {/* Card Content */}
                                <div className="flex flex-col p-5">
                                    <p className="mb-2 text-xs font-semibold text-[#087F8C]">
                                        {place.governorate}
                                    </p>

                                    <h2 className="mb-2 text-xl font-bold text-[#183B4E] transition-colors duration-300 group-hover:text-[#FF7657]">
                                        {place.nameAr || place.nameEn}
                                    </h2>

                                    {place.nameEn && place.nameEn !== place.nameAr && (
                                        <p className="mb-3 text-sm text-gray-500">
                                            {place.nameEn}
                                        </p>
                                    )}

                                    {place.descriptionAr && (
                                        <p className="mb-4 text-sm leading-7 text-gray-600">
                                            {place.descriptionAr}
                                        </p>
                                    )}

                                    {/* Google Maps */}
                                    <a
                                        href={
                                            place.mapUrl ||
                                            `https://www.google.com/maps?q=${place.latitude},${place.longitude}`
                                        }
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="mt-auto inline-flex items-center justify-center rounded-xl bg-[#087F8C] px-4 py-3 text-sm font-bold text-white transition-all duration-300 ease-out hover:bg-[#FF7657] hover:shadow-lg"
                                    >
                                        View on Google Maps
                                    </a>

                                    {/* Image Source */}
                                    {place.imagePageUrl && (
                                        <a
                                            href={place.imagePageUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="mt-3 text-center text-xs text-[#087F8C] underline transition-colors duration-300 hover:text-[#FF7657]"
                                        >
                                            Image source · {place.imageLicense || place.imageSource}
                                        </a>
                                    )}
                                </div>
                            </article>
                        ))}
                    </div>
                ) : (
                    <div className="rounded-3xl border border-dashed border-[#E8DFCE] bg-white px-6 py-16 text-center">
                        <h2 className="mb-2 text-xl font-bold text-[#183B4E]">
                            No destinations found
                        </h2>

                        <p className="text-gray-500">
                            Try another search term or change your filters.
                        </p>
                    </div>
                )}

                {/* Footer */}
                <p className="mt-8 text-xs leading-6 text-gray-500">
                    Destination information is provided by the WASLA local dataset.
                    Image credits and licenses should be checked before publication.
                </p>

            </div>
        </main>
    );
};

export default PlacesPage;
