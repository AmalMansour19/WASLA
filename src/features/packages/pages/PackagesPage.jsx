import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../app/contexts/AuthContext.jsx';
import {
  Search,
  Headphones,
  ChevronLeft,
  ChevronRight,
  CalendarDays,
  MapPin,
  Star,
  Heart,
} from 'lucide-react';
import { usePreferences } from '../../../app/contexts/PreferencesContext.jsx';
import {
  CoverImage,
  categories,
  packages,
  daysLabel,
  reviewsLabel,
} from '../packagesShared.jsx';

function PackageCard({ pkg, isArabic }) {
  const [liked, setLiked] = useState(false);
    const { user } = useAuth();
  const navigate = useNavigate();

  const handleLike = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    setLiked(!liked);
  };
  const name = isArabic ? pkg.nameAr : pkg.nameEn;

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl bg-white text-[#var(--wasla-text)] shadow-md ring-1 ring-black/5 transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:ring-2 hover:ring-[var(--wasla-accent)]">
      <div className="relative h-52 overflow-hidden bg-gradient-to-br from-amber-700 to-amber-300">
      <CoverImage gov={pkg.gov} alt={name} image={pkg.image} credit={pkg.imageCredit} />

        {pkg.popular && (
          <span className="absolute start-3 top-3 flex items-center gap-1 rounded-full bg-white/95 px-3 py-1 text-xs font-bold shadow">
            <Star size={12} className="fill-[var(--wasla-accent)] text-[var(--wasla-accent)]" />
            {isArabic ? 'الأكثر طلباً' : 'Popular'}
          </span>
        )}

        <button
          type="button"
          onClick={handleLike}
          aria-label="favorite"
          className="absolute end-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 shadow transition hover:scale-110"
        >
          <Heart size={18} className={liked ? 'fill-red-500 text-red-500' : 'text-gray-600'} />
        </button>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="mb-3 text-lg font-bold transition-colors group-hover:text-[var(--wasla-accent)]">{name}</h3>

        <div className="mb-3 flex flex-wrap items-center gap-4 text-sm text-gray-600">
          <span className="flex items-center gap-1">
            <CalendarDays size={15} className="text-[var(--wasla-accent)]" />
            {daysLabel(pkg.days, isArabic)}
          </span>
          <span className="flex items-center gap-1">
            <MapPin size={15} className="text-[var(--wasla-accent)]" />
            {isArabic ? pkg.locationAr : pkg.locationEn}
          </span>
        </div>

        <p className="mb-5 flex items-center gap-1 text-sm">
          <Star size={15} className="fill-[var(--wasla-accent)] text-[var(--wasla-accent)]" />
          <span className="font-bold">{pkg.rating}</span>
          <span className="text-gray-500">({reviewsLabel(pkg.reviews)})</span>
        </p>

        <div className="mt-auto flex items-center justify-between border-t border-dashed border-gray-200 pt-4">
          <p className="text-xl font-extrabold">
            {isArabic ? `${pkg.price.toLocaleString()} جنيه` : `EGP ${pkg.price.toLocaleString()}`}
          </p>
          <Link
            to={`/packages/${pkg.id}`}
            className="rounded-lg bg-[var(--wasla-accent)] px-4 py-2 text-sm font-bold text-white shadow transition hover:bg-[var(--wasla-accent-dark)]"
          >
            {isArabic ? 'عرض التفاصيل' : 'View Details'}
          </Link>
        </div>
      </div>
    </article>
  );
}

const PAGE_SIZE = 6;

const priceRanges = [
  { key: 'all', en: 'All Prices', ar: 'كل الأسعار', test: () => true },
  { key: 'low', en: 'Under EGP 2,000', ar: 'أقل من 2,000 جنيه', test: (p) => p.price < 2000 },
  { key: 'mid', en: 'EGP 2,000 – 4,000', ar: 'من 2,000 إلى 4,000 جنيه', test: (p) => p.price >= 2000 && p.price <= 4000 },
  { key: 'high', en: 'Over EGP 4,000', ar: 'أكتر من 4,000 جنيه', test: (p) => p.price > 4000 },
];

const durations = [
  { key: 'all', en: 'Any Duration', ar: 'أي مدة', test: () => true },
  { key: '1', en: '1 Day', ar: 'يوم واحد', test: (p) => p.days === 1 },
  { key: '2-3', en: '2–3 Days', ar: '2 إلى 3 أيام', test: (p) => p.days >= 2 && p.days <= 3 },
  { key: '4+', en: '4+ Days', ar: '4 أيام أو أكتر', test: (p) => p.days >= 4 },
];

const sortOptions = [
  { key: 'default', en: 'Sort: Default', ar: 'الترتيب: الافتراضي' },
  { key: 'priceAsc', en: 'Price: Low to High', ar: 'السعر: الأقل أولاً' },
  { key: 'priceDesc', en: 'Price: High to Low', ar: 'السعر: الأعلى أولاً' },
  { key: 'rating', en: 'Top Rated', ar: 'الأعلى تقييماً' },
];
function PackagesPage() {
  const { language } = usePreferences();
  const isArabic = language === 'ar';

  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState('default');
const [priceKey, setPriceKey] = useState('all');
const [durationKey, setDurationKey] = useState('all');

  const priceTest = priceRanges.find((r) => r.key === priceKey).test;
const durationTest = durations.find((d) => d.key === durationKey).test;

const filtered = packages
  .filter((p) => {
    const name = (isArabic ? p.nameAr : p.nameEn).toLowerCase();
    return (
      name.includes(search.toLowerCase()) &&
      (category === 'all' || p.tags.includes(category)) &&
      priceTest(p) &&
      durationTest(p)
    );
  })
  .sort((a, b) => {
    if (sort === 'priceAsc') return a.price - b.price;
    if (sort === 'priceDesc') return b.price - a.price;
    if (sort === 'rating') return b.rating - a.rating;
    return 0;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const current = Math.min(page, totalPages);
  const visible = filtered.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE);

  return (
    <div className="bg-[#var(--wasla-background)] pb-16 text-[#var(--wasla-text)]">
      <section className="group relative min-h-[320px] overflow-hidden bg-amber-900">
        <CoverImage gov="giza" alt="Egypt" width={1600} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/20" />

        <div className="relative z-10 mx-auto max-w-6xl px-4 py-16 md:py-20">
          <h1 className="mb-3 text-4xl font-extrabold text-white md:text-6xl">
            {isArabic ? 'الباقات السياحية' : 'Tour Packages'}
          </h1>
          <p className="mb-8 max-w-xl text-base text-white/90 md:text-lg">
            {isArabic
              ? 'اكتشف مصر مع باقاتنا السياحية المختارة بعناية.'
              : 'Discover Egypt with our curated tour packages.'}
          </p>

          <div className="flex max-w-2xl items-center gap-2 rounded-full bg-white p-2 shadow-xl">
            <Search size={20} className="ms-3 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder={isArabic ? 'ابحث عن باقة...' : 'Search packages...'}
              className="w-full bg-transparent px-2 text-black outline-none"
            />
            <button
              type="button"
              className="rounded-full bg-[var(--wasla-accent)] px-6 py-2 font-bold text-white transition hover:bg-[var(--wasla-accent-dark)]"
            >
              {isArabic ? 'بحث' : 'Search'}
            </button>
          </div>
        </div>
      </section>

      <div className="mx-auto flex max-w-6xl flex-wrap gap-3 px-4 py-8">
        {categories.map((c) => (
          <button
            key={c.key}
            type="button"
            onClick={() => {
              setCategory(c.key);
              setPage(1);
            }}
            className={`rounded-full px-5 py-2 text-sm font-bold transition ${
              category === c.key
                ? 'bg-[var(--wasla-accent)] text-white shadow'
                : 'bg-white text-[#var(--wasla-text)] ring-1 ring-black/10 hover:bg-amber-50'
            }`}
          >
            {isArabic ? c.ar : c.en}
          </button>
        ))}
      </div>
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-3 px-4 pb-6">
  <select
    value={priceKey}
    onChange={(e) => { setPriceKey(e.target.value); setPage(1); }}
    className="rounded-full bg-white px-4 py-2 text-sm font-bold text-black ring-1 ring-black/10 outline-none"
  >
    {priceRanges.map((r) => (
      <option key={r.key} value={r.key}>{isArabic ? r.ar : r.en}</option>
    ))}
  </select>

  <select
    value={durationKey}
    onChange={(e) => { setDurationKey(e.target.value); setPage(1); }}
    className="rounded-full bg-white px-4 py-2 text-sm font-bold text-black ring-1 ring-black/10 outline-none"
  >
    {durations.map((d) => (
      <option key={d.key} value={d.key}>{isArabic ? d.ar : d.en}</option>
    ))}
  </select>

  <select
    value={sort}
    onChange={(e) => { setSort(e.target.value); setPage(1); }}
    className="rounded-full bg-white px-4 py-2 text-sm font-bold text-black ring-1 ring-black/10 outline-none"
  >
    {sortOptions.map((s) => (
      <option key={s.key} value={s.key}>{isArabic ? s.ar : s.en}</option>
    ))}
  </select>

  <p className="ms-auto text-sm text-gray-600">
    {isArabic
      ? `عرض ${visible.length} من ${filtered.length} باقة`
      : `Showing ${visible.length} of ${filtered.length} packages`}
  </p>
</div>

      <section className="mx-auto grid max-w-6xl gap-8 px-4 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((p) => (
          <PackageCard key={p.id} pkg={p} isArabic={isArabic} />
        ))}
        {visible.length === 0 && (
          <p className="col-span-full py-10 text-center text-gray-500">
            {isArabic ? 'مفيش باقات مطابقة.' : 'No packages found.'}
          </p>
        )}
      </section>

      {totalPages > 1 && (
        <div className="mt-10 flex items-center justify-center gap-2">
          <button
            type="button"
            onClick={() => setPage(Math.max(1, current - 1))}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white ring-1 ring-black/10 hover:bg-amber-50"
          >
            <ChevronLeft size={18} />
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => setPage(n)}
              className={`h-9 w-9 rounded-full text-sm font-bold ${
                n === current ? 'bg-[var(--wasla-accent)] text-white' : 'bg-white ring-1 ring-black/10 hover:bg-amber-50'
              }`}
            >
              {n}
            </button>
          ))}
          <button
            type="button"
            onClick={() => setPage(Math.min(totalPages, current + 1))}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white ring-1 ring-black/10 hover:bg-amber-50"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      )}

      <section className="mx-auto mt-12 flex max-w-6xl flex-wrap items-center justify-between gap-4 rounded-2xl bg-amber-50 px-6 py-5 ring-1 ring-amber-200">
        <div className="flex items-center gap-4">
          <Headphones size={36} className="text-[var(--wasla-accent)]" />
          <div>
            <p className="font-bold">{isArabic ? 'محتاجة مساعدة؟' : 'Need Help?'}</p>
            <p className="text-sm text-gray-600">
              {isArabic ? 'فريقنا موجود عشان يساعدك!' : 'Our team is here to assist you!'}
            </p>
          </div>
        </div>
        <Link
          to="/contact"
          className="rounded-lg bg-[var(--wasla-accent)] px-5 py-2 font-bold text-white transition hover:bg-[var(--wasla-accent-dark)]"
        >
          {isArabic ? 'تواصل معنا' : 'Contact Us'}
        </Link>
      </section>
    </div>
  );
}

export default PackagesPage;