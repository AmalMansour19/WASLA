
const fs = require("fs");
const path = require("path");

const DATA_DIR = __dirname;

const governorates = [
    "alexandria",
    "aswan",
    "beheira",
    "cairo",
    "fayoum",
    "giza",
    "luxor",
    "matrouh",
    "red-sea",
    "sharqia",
    "south-sinai",
];

const allPlaces = [];
const seenIds = new Set();
const duplicateIds = [];
const report = [];

for (const governorate of governorates) {
    const filePath = path.join(DATA_DIR, governorate, "places.json");

    if (!fs.existsSync(filePath)) {
        console.warn(`⚠️ Missing file: ${governorate}/places.json`);
        report.push({ governorate, count: 0, status: "Missing file" });
        continue;
    }

    try {
        const content = fs.readFileSync(filePath, "utf8");
        const places = JSON.parse(content);

        if (!Array.isArray(places)) {
            throw new Error("The file must contain an array");
        }

        let addedCount = 0;

        for (const place of places) {
            if (!place || typeof place !== "object") continue;

            const id = place.id;

            if (!id) {
                console.warn(`⚠️ Place without ID in ${governorate}`);
                continue;
            }

            if (seenIds.has(id)) {
                duplicateIds.push({
                    id,
                    governorate,
                    name: place.nameAr || place.nameEn || place.name,
                });
                continue;
            }

            seenIds.add(id);

            allPlaces.push({
                ...place,
                governorate: place.governorate || governorate,
            });

            addedCount++;
        }

        report.push({
            governorate,
            count: addedCount,
            status: "OK",
        });
    } catch (error) {
        console.error(`❌ Error in ${governorate}:`, error.message);
        report.push({
            governorate,
            count: 0,
            status: "Error",
        });
    }
}

// Keep every collected place, including places without images.
const placesWithImages = allPlaces.filter((place) => {
    if (typeof place.imageUrl !== "string") return false;

    try {
        const url = new URL(place.imageUrl);
        return url.protocol === "https:" || url.protocol === "http:";
    } catch {
        return false;
    }
});

fs.writeFileSync(
    path.join(DATA_DIR, "all-places.json"),
    JSON.stringify(allPlaces, null, 2),
    "utf8"
);

fs.writeFileSync(
    path.join(DATA_DIR, "places-with-images.json"),
    JSON.stringify(placesWithImages, null, 2),
    "utf8"
);

console.log("\n========== WASLA DATA REPORT ==========\n");

for (const item of report) {
    console.log(
        `${item.governorate}: ${item.count} places | ${item.status}`
    );
}

console.log("\n---------------------------------------");
console.log(`Total places: ${allPlaces.length}`);
console.log(`Places with image URLs: ${placesWithImages.length}`);
console.log(`Places without valid image URLs: ${allPlaces.length - placesWithImages.length}`);
console.log(`Duplicate IDs: ${duplicateIds.length}`);

if (duplicateIds.length > 0) {
    console.log("\nDuplicate IDs:");
    console.table(duplicateIds);
}

console.log("\n✅ Generated:");
console.log("- data/all-places.json");
console.log("- data/places-with-images.json");
