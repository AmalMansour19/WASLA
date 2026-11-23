
const fs = require("node:fs");
const path = require("node:path");

const dataDirectory = __dirname;
const inputPath = path.join(dataDirectory, "egypt-places.geojson");
const outputPath = path.join(dataDirectory, "egypt-places-clean.json");

const geojson = JSON.parse(
    fs.readFileSync(inputPath, "utf8")
);

if (!Array.isArray(geojson.features)) {
    throw new Error("Invalid GeoJSON: features array not found.");
}

// الفئات التي نريد الاحتفاظ بها مبدئيًا في WASLA
const allowedCategories = new Set([
    "attraction",
    "museum",
    "gallery",
    "theme_park",
    "zoo",
    "aquarium",
    "viewpoint",
    "artwork",
    "picnic_site",
    "archaeological_site",
    "castle",
    "ruins",
    "fort",
    "memorial",
    "heritage",
    "monument",
    "beach",
    "cave_entrance",
    "spring",
    "hot_spring",
    "waterfall",
    "peak",
    "volcano",
    "nature_reserve",
    "water_park",
    "beach_resort",
    "marina",
]);


const accommodationTypes = new Set([
    "hotel",
    "motel",
    "resort",
    "guest_house",
    "hostel",
    "apartment",
    "chalet",
    "camp_site",
    "caravan_site",
]);

function getCategory(tags) {
    // أماكن الإقامة لا تُعرض كمزارات في Explore حاليًا
    if (accommodationTypes.has(tags.tourism)) {
        return null;
    }

    // الأولوية للتصنيف السياحي الصريح
    const candidates = [
        tags.tourism,
        tags.historic,
        tags.leisure,
        tags.natural,
    ];

    return (
        candidates.find((value) =>
            allowedCategories.has(value)
        ) ?? null
    );
}
function getCoordinates(feature) {
    const geometry = feature.geometry;

    if (!geometry) return null;

    let coordinates;

    if (geometry.type === "Point") {
        coordinates = geometry.coordinates;
    } else if (feature.center) {
        coordinates = [feature.center.lon, feature.center.lat];
    } else if (geometry.type === "Polygon" || geometry.type === "MultiPolygon") {
        // حساب تقريبي لمركز الشكل من أول حلقة متاحة
        const ring =
            geometry.type === "Polygon"
                ? geometry.coordinates[0]
                : geometry.coordinates[0]?.[0];

        if (!Array.isArray(ring) || ring.length === 0) return null;

        const validPoints = ring.filter(
            (point) =>
                Array.isArray(point) &&
                Number.isFinite(point[0]) &&
                Number.isFinite(point[1])
        );

        if (validPoints.length === 0) return null;

        coordinates = [
            validPoints.reduce((sum, point) => sum + point[0], 0) /
            validPoints.length,
            validPoints.reduce((sum, point) => sum + point[1], 0) /
            validPoints.length,
        ];
    } else {
        return null;
    }

    if (
        !Array.isArray(coordinates) ||
        !Number.isFinite(coordinates[0]) ||
        !Number.isFinite(coordinates[1])
    ) {
        return null;
    }

    const [longitude, latitude] = coordinates;

    // حدود تقريبية للتحقق من وجود الإحداثيات داخل نطاق مصر
    if (
        longitude < 24 ||
        longitude > 37 ||
        latitude < 21 ||
        latitude > 32
    ) {
        return null;
    }

    return { latitude, longitude };
}

const uniquePlaces = new Map();

let skippedUnnamed = 0;
let skippedCategory = 0;
let skippedCoordinates = 0;
let skippedDuplicates = 0;

for (const feature of geojson.features) {
    const tags = feature.properties ?? feature.tags ?? {};
    const category = getCategory(tags);

    if (!category) {
        skippedCategory++;
        continue;
    }

    const name =
        tags["name:ar"] ||
        tags.name ||
        tags["name:en"] ||
        null;

    if (!name) {
        skippedUnnamed++;
        continue;
    }

    const coordinates = getCoordinates(feature);

    if (!coordinates) {
        skippedCoordinates++;
        continue;
    }

    const osmId =
        tags["@id"] ||
        (feature.id != null ? String(feature.id) : null);

    const deduplicationKey = osmId
        ? String(osmId)
        : `${category}:${coordinates.latitude.toFixed(5)}:${coordinates.longitude.toFixed(5)}:${name.toLowerCase()}`;

    if (uniquePlaces.has(deduplicationKey)) {
        skippedDuplicates++;
        continue;
    }

    uniquePlaces.set(deduplicationKey, {
        id: deduplicationKey,
        osmId,
        name,
        nameAr: tags["name:ar"] ?? null,
        nameEn: tags["name:en"] ?? null,
        category,
        rawTags: tags, // أضيفي السطر هنا بالضبط
        latitude: coordinates.latitude,
        longitude: coordinates.longitude,
        governorate: null,
        googleMapsUrl: `https://www.google.com/maps?q=${coordinates.latitude},${coordinates.longitude}`,
        descriptionAr: "",
        descriptionEn: "",
        imageUrl: null,
        source: "OpenStreetMap",
        sourceUrl: osmId
            ? `https://www.openstreetmap.org/${String(osmId).replace(/^([a-z]+)(\d+)$/, "$1/$2")}`
            : "https://www.openstreetmap.org/",
        reviewStatus: "needs-review",
    });
}

const places = [...uniquePlaces.values()];

fs.writeFileSync(
    outputPath,
    JSON.stringify(places, null, 2),
    "utf8"
);

const categoryCounts = {};

for (const place of places) {
    categoryCounts[place.category] =
        (categoryCounts[place.category] || 0) + 1;
}

console.log("✅ Data preparation completed.");
console.log("📁 Output:", outputPath);
console.log("📊 Unique named places:", places.length);
console.log("⏭️ Skipped by category:", skippedCategory);
console.log("⏭️ Skipped unnamed:", skippedUnnamed);
console.log("⏭️ Skipped invalid/out-of-range coordinates:", skippedCoordinates);
console.log("⏭️ Skipped duplicates:", skippedDuplicates);
console.log("📚 Categories:", categoryCounts);
console.log(
    "⚠️ Governorate is null until verified administrative boundaries are applied."
);