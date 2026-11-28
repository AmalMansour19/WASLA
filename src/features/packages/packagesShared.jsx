import { Hotel, Bus, UserRound, Utensils, Ticket } from 'lucide-react';


const placeFiles = import.meta.glob(
  [
    '../../data/*/places.json',
    '../../data/places-with-images.json',
    '../../data/wasla-places.json',
  ],
  { eager: true, import: 'default' }
);

const allPlaces = Object.values(placeFiles)
  .flatMap((file) => (Array.isArray(file) ? file : []))
  .filter((p) => p && p.imageUrl);

const govNameAr = {
  giza: 'الجيزة',
  luxor: 'الأقصر',
  aswan: 'أسوان',
  cairo: 'القاهرة',
  redsea: 'البحر الأحمر',
  sinai: 'جنوب سيناء',
  alexandria: 'الإسكندرية',
  fayoum: 'الفيوم',
  matrouh: 'مطروح',
};

export function placesWithImages(gov, limit = 5) {
  const name = govNameAr[gov];
  if (!name) return [];
  return allPlaces
    .filter((p) => p.governorate && p.governorate.includes(name))
    .slice(0, limit);
}

function resized(url, width) {
  return `${url}${url.includes('?') ? '&' : '?'}width=${width}`;
}

export function CoverImage({ gov, index = 0, alt, width = 800, image, credit }) {
  const place = image ? null : placesWithImages(gov, index + 1)[index];
  const src = image || place?.imageUrl;
  if (!src) return null;

  const author =
    place?.imageAuthor && !place.imageAuthor.startsWith('http')
      ? place.imageAuthor
      : null;
  const text = credit || [author, place?.imageSource].filter(Boolean).join(' / ');

  return (
    <>
      <img
        src={src.startsWith('http') ? resized(src, width) : src}
        alt={alt}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
        onError={(e) => (e.currentTarget.style.display = 'none')}
      />
      {text && (
        <span className="absolute bottom-2 end-2 rounded bg-black/50 px-2 py-0.5 text-[10px] text-white">
          {text}
        </span>
      )}
    </>
  );
}

/* ---------- نصوص مساعدة ---------- */
export function daysLabel(days, isArabic) {
  if (!isArabic) return `${days} ${days === 1 ? 'Day' : 'Days'}`;
  if (days === 1) return 'يوم واحد';
  if (days === 2) return 'يومان';
  return `${days} أيام`;
}

export function reviewsLabel(n) {
  return n >= 1000 ? `${(n / 1000).toFixed(1)}k` : n;
}

/* ---------- الخدمات ---------- */
export const services = {
  hotel: { icon: Hotel, en: 'Accommodation', ar: 'إقامة فندقية' },
  transport: { icon: Bus, en: 'Transportation', ar: 'مواصلات' },
  guide: { icon: UserRound, en: 'Guided Tours', ar: 'مرشد سياحي' },
  breakfast: { icon: Utensils, en: 'Meals', ar: 'وجبات' },
  tickets: { icon: Ticket, en: 'Entry Tickets', ar: 'تذاكر الدخول' },
};

/* ---------- بيانات تجريبية (Mock Data) ---------- */
export const categories = [
  { key: 'all', en: 'All Packages', ar: 'كل الباقات' },
  { key: 'day', en: 'Day Trips', ar: 'رحلات اليوم' },
  { key: 'multi', en: 'Multi-Day', ar: 'متعددة الأيام' },
  { key: 'cultural', en: 'Cultural', ar: 'ثقافية' },
  { key: 'adventure', en: 'Adventure', ar: 'مغامرات' },
];

export const packages = [
  { id: 1, gov: 'giza', tags: ['day', 'cultural'], popular: true, nameEn: 'Giza Pyramids Discovery', nameAr: 'اكتشاف أهرامات الجيزة', locationEn: 'Giza', locationAr: 'الجيزة', days: 1, price: 1200, rating: 4.9, reviews: 1200, placesEn: ['The Pyramids', 'The Sphinx', 'Grand Egyptian Museum'], placesAr: ['الأهرامات', 'أبو الهول', 'المتحف المصري الكبير'], includes: ['transport', 'guide', 'tickets'] },
  { id: 2, gov: 'luxor', tags: ['multi', 'cultural'], popular: true, nameEn: 'Luxor Ancient Wonders', nameAr: 'عجائب الأقصر القديمة', locationEn: 'Luxor', locationAr: 'الأقصر', days: 2, price: 2800, rating: 4.8, reviews: 703, placesEn: ['Karnak Temple', 'Luxor Temple', 'Valley of the Kings', 'Hatshepsut Temple'], placesAr: ['معبد الكرنك', 'معبد الأقصر', 'وادي الملوك', 'معبد حتشبسوت'], includes: ['hotel', 'breakfast', 'transport', 'guide', 'tickets'] },
  { id: 3, gov: 'aswan', tags: ['multi', 'cultural'], popular: false, nameEn: 'Aswan & Nubian Villages', nameAr: 'أسوان والقرى النوبية', locationEn: 'Aswan', locationAr: 'أسوان', days: 3, price: 3900, rating: 4.7, reviews: 512, placesEn: ['Philae Temple', 'Botanical Island', 'Nubian Village', 'Nile Felucca Ride'], placesAr: ['معبد فيلة', 'جزيرة النباتات', 'القرية النوبية', 'رحلة فلوكة في النيل'], includes: ['hotel', 'breakfast', 'transport', 'guide'] },
  { id: 4, gov: 'cairo', tags: ['multi', 'cultural'], popular: false, nameEn: 'Cairo Discovery', nameAr: 'اكتشاف القاهرة', locationEn: 'Cairo', locationAr: 'القاهرة', days: 3, price: 3500, rating: 4.8, reviews: 980, placesEn: ['Egyptian Museum', 'Al-Muizz Street', 'Khan el-Khalili', 'Citadel of Saladin'], placesAr: ['المتحف المصري', 'شارع المعز', 'خان الخليلي', 'قلعة صلاح الدين'], includes: ['hotel', 'breakfast', 'transport', 'guide', 'tickets'] },
  { id: 5, gov: 'redsea', tags: ['multi', 'adventure'], popular: true, nameEn: 'Hurghada Sea Escape', nameAr: 'رحلة البحر الأحمر - الغردقة', locationEn: 'Hurghada', locationAr: 'الغردقة', days: 4, price: 5200, rating: 4.8, reviews: 856, placesEn: ['Giftun Island', 'Snorkeling Trip', 'Hurghada Marina'], placesAr: ['جزيرة الجفتون', 'رحلة سنوركلينج', 'مارينا الغردقة'], includes: ['hotel', 'breakfast', 'transport'] },
  { id: 6, gov: 'sinai', tags: ['multi', 'adventure'], popular: false, nameEn: 'Sinai Mountain & Sea', nameAr: 'سيناء: جبل وبحر', locationEn: 'South Sinai', locationAr: 'جنوب سيناء', days: 4, price: 5800, rating: 4.6, reviews: 430, placesEn: ['Ras Mohammed Reserve', 'Dahab', 'Saint Catherine', 'Mount Moses'], placesAr: ['محمية رأس محمد', 'دهب', 'سانت كاترين', 'جبل موسى'], includes: ['hotel', 'breakfast', 'transport', 'guide'] },
  { id: 7, gov: 'alexandria', tags: ['multi', 'cultural'], popular: false, nameEn: 'Alexandria Classic', nameAr: 'الإسكندرية الكلاسيكية', locationEn: 'Alexandria', locationAr: 'الإسكندرية', days: 2, price: 2400, rating: 4.7, reviews: 421, placesEn: ['Bibliotheca Alexandrina', 'Qaitbay Citadel', 'Pompey’s Pillar', 'Kom El Shoqafa'], placesAr: ['مكتبة الإسكندرية', 'قلعة قايتباي', 'عمود السواري', 'كوم الشقافة'], includes: ['hotel', 'breakfast', 'transport', 'guide'] },
  { id: 8, gov: 'fayoum', tags: ['day', 'adventure'], popular: false, nameEn: 'Fayoum Eco Adventure', nameAr: 'مغامرة الفيوم البيئية', locationEn: 'Fayoum', locationAr: 'الفيوم', days: 1, price: 1100, rating: 4.5, reviews: 210, placesEn: ['Wadi El Rayan', 'Lake Qarun', 'Wadi El Hitan', 'Tunis Village'], placesAr: ['وادي الريان', 'بحيرة قارون', 'وادي الحيتان', 'قرية تونس'], includes: ['transport', 'guide'] },
  { id: 9, gov: 'matrouh', tags: ['multi'], popular: false, nameEn: 'Matrouh Summer Beaches', nameAr: 'شواطئ مطروح الصيفية', locationEn: 'Matrouh', locationAr: 'مطروح', days: 3, price: 3000, rating: 4.6, reviews: 340, placesEn: ['Marsa Matrouh Beaches', 'North Coast', 'New Alamein'], placesAr: ['شواطئ مرسى مطروح', 'الساحل الشمالي', 'العلمين الجديدة'], includes: ['hotel', 'breakfast', 'transport'] },
];

const FP = 'https://commons.wikimedia.org/wiki/Special:FilePath/';

const packageImages = {
  2: {
    image: FP + 'Grounds,_Karnak_Temple,_Luxor,_LG,_EGY_(48009651747).jpg',
    imageCredit: 'Warren LeMay / Wikimedia Commons (CC0)',
  },
  3: {
    image: FP + 'Philae_08.jpg',
    imageCredit: 'Olaf Tausch / Wikimedia Commons (CC BY 3.0)',
  },
  6: {
    image: FP + 'Katharinenkloster_Sinai_BW_2.jpg',
    imageCredit: 'Berthold Werner / Wikimedia Commons',
  },
  8: {
    image: FP + 'Wadi_El_Rayan_Lake.jpg',
    imageCredit: 'Wikimedia Commons',
  },
  9: {
    image: FP + 'Marsa_matrouh_sea.jpg',
    imageCredit: 'Wikimedia Commons',
  },
};

packages.forEach((p) => Object.assign(p, packageImages[p.id]));


/* ---------- أماكن إضافية لكل باقة ---------- */
const extraPlaces = {
  1: {
    en: ['Saqqara Necropolis', 'Step Pyramid of Djoser', 'Memphis Open-Air Museum'],
    ar: ['منطقة سقارة', 'هرم زوسر المدرج', 'منف ومتحف ميت رهينة'],
  },
  2: {
    en: ['Colossi of Memnon', 'Avenue of Sphinxes'],
    ar: ['تمثالا ممنون', 'طريق الكباش'],
  },
  3: {
    en: ['High Dam', 'Unfinished Obelisk'],
    ar: ['السد العالي', 'المسلة الناقصة'],
  },
  4: {
    en: ['Al-Azhar Mosque', 'Coptic Cairo'],
    ar: ['الجامع الأزهر', 'القاهرة القبطية'],
  },
  5: {
    en: ['El Gouna', 'Marsa Alam'],
    ar: ['الجونة', 'مرسى علم'],
  },
  6: {
    en: ['Sharm El Sheikh', 'Colored Canyon'],
    ar: ['شرم الشيخ', 'الوادي الملون'],
  },
  7: {
    en: ['Montaza Palace', 'Roman Amphitheatre'],
    ar: ['قصر المنتزه', 'المدرج الروماني'],
  },
  8: {
    en: ['Qasr Qarun', 'Fayoum Pottery School'],
    ar: ['قصر قارون', 'مدرسة الفخار'],
  },
  9: {
    en: ['Cleopatra’s Beach', 'Agiba Beach', 'Rommel’s Cave'],
    ar: ['شاطئ كليوباترا', 'شاطئ عجيبة', 'كهف روميل'],
  },
};

packages.forEach((p) => {
  const extra = extraPlaces[p.id];
  if (!extra) return;
  p.placesEn = [...p.placesEn, ...extra.en];
  p.placesAr = [...p.placesAr, ...extra.ar];
});