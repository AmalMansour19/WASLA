
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
        <main className="min-h-screen bg-[#f8f8f3] px-4 py-12 text-gray-900">
            <div className="mx-auto max-w-7xl">

                <section className="mb-10">
                    <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-amber-700">
                        Discover Egypt
                    </p>

                    <h1 className="mb-4 text-3xl font-bold md:text-5xl">
                        Explore Egypt
                    </h1>

                    <p className="max-w-2xl text-gray-600">
                        Discover historical landmarks, beautiful beaches,
                        and unique destinations across Egypt.
                    </p>
                </section>

                {/* Search and Filters */}
                <section className="mb-8 grid gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm md:grid-cols-3">

                    <input
                        type="search"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search destinations..."
                        className="rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-amber-600"
                    />

                    <select
                        value={governorate}
                        onChange={(e) => setGovernorate(e.target.value)}
                        className="rounded-xl border border-gray-200 bg-white px-4 py-3"
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
                        className="rounded-xl border border-gray-200 bg-white px-4 py-3"
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
                        <strong>{filteredPlaces.length}</strong> destinations
                    </p>

                    {(search || governorate !== "all" || category !== "all") && (
                        <button
                            onClick={clearFilters}
                            className="text-sm font-semibold text-amber-700"
                        >
                            Clear filters
                        </button>
                    )}
                </div>

                {/* Places */}
                {filteredPlaces.length > 0 ? (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {filteredPlaces.map((place) => (
                            <article
                                key={place.id}
                                className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                            >
                                <div className="relative h-52 overflow-hidden bg-gray-100">
                                    <img
                                        src={place.imageUrl}
                                        alt={place.nameAr || place.nameEn}
                                        loading="lazy"
                                        className="h-full w-full object-cover"
                                        onError={(e) => {
                                            e.currentTarget.style.display = "none";
                                        }}
                                    />

                                    <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold capitalize text-amber-800 shadow-sm">
                                        {place.category?.replaceAll("_", " ") || "Destination"}
                                    </span>
                                </div>

                                <div className="flex flex-col p-5">
                                    <p className="mb-2 text-xs text-gray-500">
                                        {place.governorate}
                                    </p>

                                    <h2 className="mb-2 text-xl font-bold">
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

                                    <a
                                        href={
                                            place.mapUrl ||
                                            `https://www.google.com/maps?q=${place.latitude},${place.longitude}`
                                        }
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="mt-auto inline-flex items-center justify-center rounded-xl bg-[#59643b] px-4 py-3 text-sm font-semibold text-white hover:bg-[#424c2b]"
                                    >
                                        View on Google Maps
                                    </a>

                                    {place.imagePageUrl && (
                                        <a
                                            href={place.imagePageUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="mt-3 text-center text-xs text-amber-700 underline"
                                        >
                                            Image source · {place.imageLicense || place.imageSource}
                                        </a>
                                    )}
                                </div>
                            </article>
                        ))}
                    </div>
                ) : (
                    <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-6 py-16 text-center">
                        <h2 className="mb-2 text-xl font-semibold">
                            No destinations found
                        </h2>

                        <p className="text-gray-500">
                            Try another search term or change your filters.
                        </p>
                    </div>
                )}

                <p className="mt-8 text-xs leading-6 text-gray-500">
                    Destination information is provided by the WASLA local dataset.
                    Image credits and licenses should be checked before publication.
                </p>
            </div>
        </main>
    );
};

export default PlacesPage;
