
const fs = require("node:fs");
const path = require("node:path");

const inputPath = path.join(__dirname, "egypt-places.geojson");
const outputPath = path.join(__dirname, "egypt-places.json");

if (!fs.existsSync(inputPath)) {
    console.error("❌ GeoJSON file not found:", inputPath);
    process.exit(1);
}

const geojson = JSON.parse(fs.readFileSync(inputPath, "utf8"));

function getGovernorate(lon, lat) {
    // Approximate geographic bounds, for initial classification only.
    if (lon >= 32.3 && lon <= 36.5 && lat >= 22.0 && lat <= 29.5) {
        return "Red Sea";
    }

    if (lon >= 25.0 && lon <= 29.5 && lat >= 29.0 && lat <= 31.8) {
        return "Matrouh";
    }

    return "Needs review";
}

function getCoordinates(feature) {
    const geometry = feature.geometry;
    if (!geometry) return null;

    if (geometry.type === "Point") {
        const [longitude, latitude] = geometry.coordinates;
        return { latitude, longitude };
    }

    if (geometry.type === "Polygon" || geometry.type === "MultiPolygon") {
        const coords =
            geometry.type === "Polygon"
                ? geometry.coordinates[0][0]
                : geometry.coordinates[0][0][0];

        if (!coords) return null;

        return { longitude: coords[0], latitude: coords[1] };
    }

    return null;
}

const features = geojson.features ?? [];

const places = features.map((feature, index) => {
    const tags = feature.properties ?? {};
    const coordinates = getCoordinates(feature);
    const [longitude, latitude] = feature.geometry?.type === "Point"
        ? feature.geometry.coordinates
        : coordinates
            ? [coordinates.longitude, coordinates.latitude]
            : [null, null];

    return {
        id: `osm-${tags["@id"] ?? index + 1}`,
        osmId: tags["@id"] ?? null,
        name: tags.name ?? tags["name:en"] ?? tags["name:ar"] ?? null,
        nameEn: tags["name:en"] ?? null,
        nameAr: tags["name:ar"] ?? null,
        governorate:
            longitude !== null && latitude !== null
                ? getGovernorate(longitude, latitude)
                : "Needs review",
        category:
            tags.tourism ??
            tags.historic ??
            tags.natural ??
            tags.leisure ??
            "unclassified",
        latitude,
        longitude,
        googleMapsUrl:
            latitude !== null && longitude !== null
                ? `https://www.google.com/maps?q=${latitude},${longitude}`
                : null,
        descriptionAr: "",
        descriptionEn: "",
        imageUrl: null,
        source: "OpenStreetMap",
        sourceUrl: tags["@id"]
            ? `https://www.openstreetmap.org/${String(tags["@id"]).replace("/", "/")}`
            : "https://www.openstreetmap.org/",
        reviewStatus: "needs-review",
        rawTags: tags
    };
});

fs.writeFileSync(outputPath, JSON.stringify(places, null, 2), "utf8");

console.log(`✅ Converted ${places.length} records.`);
console.log(`📁 Output: ${outputPath}`);
console.log(
    "⚠️ Governorate labels are approximate. Review them before using the data."
);


const namedPlaces = places.filter((place) => place.name);
const unnamedPlaces = places.filter((place) => !place.name);

const categoryCounts = {};

for (const place of places) {
    categoryCounts[place.category] =
        (categoryCounts[place.category] || 0) + 1;
}

console.log("\n📊 Data Quality Report");
console.log("Total records:", places.length);
console.log("Named places:", namedPlaces.length);
console.log("Unnamed places:", unnamedPlaces.length);
console.log("Categories:", categoryCounts);


const reviewedPlaces = places.filter((place) => {
    const excludedCategories = [
        "yes",
        "tomb",
        "wall",
        "tank",
        "cannon",
        "aircraft",
        "wayside_cross",
        "wayside_shrine",
        "city_gate",
        "battlefield"
    ];

    return (
        place.name &&
        place.latitude !== null &&
        place.longitude !== null &&
        !excludedCategories.includes(place.category)
    );
});

const reviewedOutputPath = path.join(__dirname, "places-review.json");

fs.writeFileSync(
    reviewedOutputPath,
    JSON.stringify(reviewedPlaces, null, 2),
    "utf8"
);

console.log("Places selected for review:", reviewedPlaces.length);
console.log("Review file:", reviewedOutputPath);


const governorateCounts = {};
const languageCounts = {
    arabicName: 0,
    englishName: 0,
    bothNames: 0
};

for (const place of reviewedPlaces) {
    governorateCounts[place.governorate] =
        (governorateCounts[place.governorate] || 0) + 1;

    if (place.nameAr && place.nameEn) {
        languageCounts.bothNames++;
    } else if (place.nameAr) {
        languageCounts.arabicName++;
    } else if (place.nameEn) {
        languageCounts.englishName++;
    }
}

console.log("\n📍 Governorate distribution:", governorateCounts);
console.log("🌐 Name language coverage:", languageCounts);




console.log("\n📌 First 15 named places:");

console.table(
    reviewedPlaces
        .filter((place) => place.name)
        .slice(0, 15)
        .map((place) => ({
            name: place.name,
            governorate: place.governorate,
            category: place.category,
            latitude: place.latitude,
            longitude: place.longitude
        }))
);