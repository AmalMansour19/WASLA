const fs = require("node:fs");
const path = require("node:path");

const inputPath = path.join(__dirname,
"egypt-places-with-governorates.json");
const outputPath = path.join(__dirname,
"wasla-places.json");

const targetGovernorates = [
    "القاهرة",
    "الجيزة",
    "الإسكندرية",
    "الأقصر",
    "أسوان",
    "البحر الأحمر",
    "جنوب سيناء",
    "مطروح",
    "الفيوم",
];

const places = JSON.parse(fs.readFileSync(inputPath,
"utf8"));

const finalPlaces = places.filter((place) => {
  const lat = Number(place.latitude ?? place.lat ?? place.coordinates?.[
        1
    ]);
  const lng = Number(place.longitude ?? place.lng ?? place.coordinates?.[
        0
    ]);
  const hasName = Boolean(place.nameAr || place.name || place.nameEn);

  return (
    place.governorateStatus === "assigned" &&
    targetGovernorates.includes(place.governorate) &&
    Number.isFinite(lat) &&
    Number.isFinite(lng) &&
    hasName
  );
});

fs.writeFileSync(outputPath, JSON.stringify(finalPlaces,
null,
2),
"utf8");

console.log("WASLA dataset created successfully!");
console.log("Total places:", finalPlaces.length);
console.log("Governorates:", targetGovernorates.length);
console.log("Output:", outputPath);
