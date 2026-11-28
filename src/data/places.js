
export const governorates = [
  {
    id: "giza",
    nameAr: "الجيزة",
    nameEn:"Giza",
    dataName: "الجيزة",
    imageUrl: "/images/governorates/giza.jpg",
  },
  {
    id: "luxor",
    nameAr: "الأقصر",
     nameEn:"Luxor",
    dataName: "Luxor",
    imageUrl: "/images/governorates/luxor.jpg",
  },
  {
    id: "aswan",
    nameAr: "أسوان",
     nameEn:"Aswan",
    dataName: "Aswan",
    imageUrl: "/images/governorates/aswan.jpg",
  },
  {
    id: "cairo",
    nameAr: "القاهرة",
     nameEn:"Cairo",
    dataName: "القاهرة",
    imageUrl: "/images/governorates/cairo.jpg",
  },
  {
    id: "alex",
    nameAr: "الإسكندرية",
     nameEn:"Alexandria",
    dataName: "الإسكندرية",
    imageUrl: "/images/governorates/alexandria.jpg",
  },
  {
    id: "beheira",
    nameAr: "البحيرة",
     nameEn:"Beheira",
    dataName: "البحيرة",
    imageUrl: "/images/governorates/beheira.jpg",
  },
  {
    id: "fayoum",
    nameAr: "الفيوم",
     nameEn:"Fayoum",
    dataName: "Fayoum",
    imageUrl: "/images/governorates/fayoum.jpg",
  },
  {
    id: "matrouh",
    nameAr: "مطروح",
     nameEn:"Matrouh",
    dataName: "Matrouh",
    imageUrl: "/images/governorates/matrouh.jpg",
  },
  {
    id: "red-sea",
    nameAr: "البحر الأحمر",
     nameEn:"Red Sea",
    dataName: "البحر الأحمر",
    imageUrl: "/images/governorates/red-sea.jpg",
  },
  {
    id: "sharqia",
    nameAr: "الشرقية",
     nameEn:"Sharqia",
    dataName: "الشرقية",
    imageUrl: "/images/governorates/sharqia.jpg",
  },
  {
    id: "south-sinai",
    nameAr: "جنوب سيناء",
     nameEn:"South Sinai",
    dataName: "South Sinai",
    imageUrl: "/images/governorates/south-sinai.jpg",
  },
];

export function getPlacesByGovernorate(governorateName) {
  return allPlaces.filter(
    (place) => place.governorate === governorateName
  );
}

export function getGovernorateById(id) {
  return governorates.find(
    (governorate) => governorate.id === id
  );
}
