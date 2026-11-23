
const fs = require("node:fs");
const path = require("node:path");

const dataDirectory = __dirname;

const inputPath = path.join(
    dataDirectory,
    "egypt-places-with-governorates.json"
);

const outputPath = path.join(
    dataDirectory,
    "featured-places.json"
);

const places = JSON.parse(
    fs.readFileSync(inputPath, "utf8")
);

if (!Array.isArray(places)) {
    throw new Error("Invalid places data.");
}

// مبدئيًا نختار الأماكن ذات البيانات الأساسية السليمة.
// اختيار القائمة النهائية ومراجعة الصور والأوصاف مرحلة منفصلة.
const eligiblePlaces = places.filter((place) => {
    return (
        place.governorateStatus === "assigned" &&
        place.name &&
        Number.isFinite(place.latitude) &&
        Number.isFinite(place.longitude) &&
        place.latitude >= 21 &&
        place.latitude <= 32 &&
        place.longitude >= 24 &&
        place.longitude <= 37
    );
});

// ترتيب أولي قابل للتكرار، دون تغيير الملف الأصلي.
eligiblePlaces.sort((a, b) => {
    const nameA = String(a.nameEn || a.name).toLowerCase();
    const nameB = String(b.nameEn || b.name).toLowerCase();

    return nameA.localeCompare(nameB);
});

const selectedPlaces = eligiblePlaces
    .slice(0, 100)
    .map((place) => ({
        id: String(place.id ?? place.osmId),
        nameAr: place.nameAr || place.name || null,
        nameEn: place.nameEn || null,
        category: place.category,
        governorate: place.governorate,
        governorateEn: place.governorateEn,
        latitude: place.latitude,
        longitude: place.longitude,
        descriptionAr: "",
        descriptionEn: "",
        imageUrl: null,
        imageSource: null,
        imageLicense: null,
        osmUrl: place.sourceUrl || null,
        rating: null,
        reviewCount: 0,
        verified: false
    }));

fs.writeFileSync(
    outputPath,
    JSON.stringify(selectedPlaces, null, 2),
    "utf8"
);

console.log("Featured places file created.");
console.log("Eligible places:", eligiblePlaces.length);
console.log("Selected places:", selectedPlaces.length);
console.log("Output:", outputPath);