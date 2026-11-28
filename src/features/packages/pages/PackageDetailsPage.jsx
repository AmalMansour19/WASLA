import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Check, CalendarDays, MapPin, Star } from 'lucide-react';
import { usePreferences } from '../../../app/contexts/PreferencesContext.jsx';
import {
  CoverImage,
  placesWithImages,
  packages,
  services,
  daysLabel,
  reviewsLabel,
} from '../packagesShared.jsx';

function PackageDetailsPage() {
  const { id } = useParams();
  const { language } = usePreferences();
  const isArabic = language === 'ar';

  const pkg = packages.find((p) => String(p.id) === id);

  if (!pkg) {
    return (
      <div className="bg-[#FBF7F0] px-4 py-24 text-center text-[#3b2a1a]">
        <p className="mb-4 text-lg font-bold">
          {isArabic ? 'الباقة غير موجودة.' : 'Package not found.'}
        </p>
        <Link to="/packages" className="font-bold text-[#E39B1B] underline">
          {isArabic ? 'رجوع للباقات' : 'Back to Packages'}
        </Link>
      </div>
    );
  }

  const name = isArabic ? pkg.nameAr : pkg.nameEn;
  const places = isArabic ? pkg.placesAr : pkg.placesEn;
  const location = isArabic ? pkg.locationAr : pkg.locationEn;
  const thumbs = placesWithImages(pkg.gov, 5).slice(1);
  const similar = packages.filter((p) => p.id !== pkg.id).slice(0, 3);

  const description = isArabic
    ? `استمتع برحلة ${daysLabel(pkg.days, true)} لزيارة ${places.join('، ')}.`
    : `Enjoy a ${daysLabel(pkg.days, false).toLowerCase()} journey visiting ${places.join(', ')}.`;

  const itinerary = Array.from({ length: pkg.days }, (_, i) => ({
    day: i + 1,
    items: places.filter((_, idx) => idx % pkg.days === i),
  }));

  return (
    <div className="bg-[#FBF7F0] pb-16 text-[#3b2a1a]">
      <div className="mx-auto max-w-6xl px-4 pt-6">
        <Link
          to="/packages"
          className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold shadow ring-1 ring-black/10 hover:bg-amber-50"
        >
          <ArrowLeft size={16} className="rtl:rotate-180" />
          {isArabic ? 'رجوع للباقات' : 'Back to Packages'}
        </Link>
      </div>

      {/* Gallery + info */}
      <section className="mx-auto mt-6 grid max-w-6xl gap-8 px-4 lg:grid-cols-2">
        <div>
          <div className="group relative h-80 overflow-hidden rounded-2xl bg-gradient-to-br from-amber-700 to-amber-300 shadow-lg">
            <CoverImage gov={pkg.gov} alt={name} width={1200} image={pkg.image} credit={pkg.imageCredit} />
          </div>
          {thumbs.length > 0 && (
            <div className="mt-3 grid grid-cols-4 gap-3">
              {thumbs.map((_, i) => (
                <div
                  key={i}
                  className="group relative h-20 overflow-hidden rounded-xl bg-amber-200"
                >
                  <CoverImage gov={pkg.gov} index={i + 1} alt={name} width={400} />
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col">
          {pkg.popular && (
            <span className="mb-3 inline-flex w-fit items-center gap-1 rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-800">
              <Star size={12} className="fill-[#E39B1B] text-[#E39B1B]" />
              {isArabic ? 'الأكثر مبيعاً' : 'Best Seller'}
            </span>
          )}

          <h1 className="mb-2 text-3xl font-extrabold md:text-4xl">{name}</h1>

          <p className="mb-4 flex items-center gap-1 text-sm">
            <Star size={16} className="fill-[#E39B1B] text-[#E39B1B]" />
            <span className="font-bold">{pkg.rating}</span>
            <span className="text-gray-500">
              ({reviewsLabel(pkg.reviews)} {isArabic ? 'تقييم' : 'reviews'})
            </span>
          </p>

          <p className="mb-5 text-gray-600">{description}</p>

          <div className="mb-5 flex flex-wrap gap-6 text-sm text-gray-700">
            <span className="flex items-center gap-2">
              <CalendarDays size={16} className="text-[#E39B1B]" />
              {daysLabel(pkg.days, isArabic)}
            </span>
            <span className="flex items-center gap-2">
              <MapPin size={16} className="text-[#E39B1B]" />
              {location}
            </span>
          </div>

          <p className="mb-5 text-3xl font-extrabold">
            {isArabic ? `${pkg.price.toLocaleString()} جنيه` : `EGP ${pkg.price.toLocaleString()}`}
          </p>

          <button
            type="button"
            onClick={() => {
              // TODO: نربطه بصفحة الحجز لما الفريق يجهزها
            }}
            className="w-fit rounded-lg bg-[#E39B1B] px-8 py-3 font-bold text-white shadow transition hover:bg-[#c98714]"
          >
            {isArabic ? 'احجز الآن' : 'Book Now'}
          </button>
        </div>
      </section>

      {/* Highlights + Included */}
      <section className="mx-auto mt-10 grid max-w-6xl gap-6 px-4 md:grid-cols-2">
        <div className="rounded-2xl bg-white p-6 shadow-md ring-1 ring-black/5">
          <h2 className="mb-4 text-xl font-bold">
            {isArabic ? 'أبرز ما في الباقة' : 'Package Highlights'}
          </h2>
          <ul className="space-y-3">
            {places.map((place) => (
              <li key={place} className="flex items-center gap-3">
                <Check size={18} className="text-emerald-600" />
                {isArabic ? `زيارة ${place}` : `Visit ${place}`}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-md ring-1 ring-black/5">
          <h2 className="mb-4 text-xl font-bold">
            {isArabic ? 'متضمن في الباقة' : 'What’s Included?'}
          </h2>
          <ul className="space-y-3">
            {pkg.includes.map((key) => {
              const Icon = services[key].icon;
              return (
                <li key={key} className="flex items-center gap-3">
                  <Icon size={20} className="text-[#E39B1B]" />
                  {isArabic ? services[key].ar : services[key].en}
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* Itinerary */}
      <section className="mx-auto mt-6 max-w-6xl px-4">
        <div className="rounded-2xl bg-white p-6 shadow-md ring-1 ring-black/5">
          <h2 className="mb-4 text-xl font-bold">
            {isArabic ? 'البرنامج' : 'Itinerary'}
          </h2>
          <ol className="space-y-4">
            {itinerary.map((d) => (
              <li key={d.day} className="flex gap-4">
                <span className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#E39B1B] text-sm font-bold text-white">
                  {d.day}
                </span>
                <div>
                  <p className="font-bold">
                    {isArabic ? `اليوم ${d.day}` : `Day ${d.day}`}
                  </p>
                  <p className="text-gray-600">
                    {d.items.length > 0
                      ? d.items.join(isArabic ? '، ' : ', ')
                      : isArabic
                        ? 'وقت حر'
                        : 'Free time'}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto mt-6 flex max-w-6xl flex-wrap items-center justify-between gap-4 rounded-2xl bg-amber-50 px-6 py-5 ring-1 ring-amber-200">
        <div>
          <p className="font-bold">
            {isArabic ? 'جاهزة لرحلة مميزة؟' : 'Ready for an amazing journey?'}
          </p>
          <p className="text-sm text-gray-600">
            {isArabic
              ? 'احجزي الآن واصنعي ذكريات لا تُنسى!'
              : 'Book now and create unforgettable memories!'}
          </p>
        </div>
        <button
          type="button"
          className="rounded-lg bg-[#E39B1B] px-6 py-2 font-bold text-white transition hover:bg-[#c98714]"
        >
          {isArabic ? 'احجز الآن' : 'Book Now'}
        </button>
      </section>

      {/* Similar */}
      <section className="mx-auto mt-10 max-w-6xl px-4">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">
            {isArabic ? 'باقات مشابهة' : 'Similar Packages'}
          </h2>
          <Link to="/packages" className="text-sm font-bold text-[#E39B1B]">
            {isArabic ? 'عرض الكل' : 'View All'}
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-3">
          {similar.map((p) => (
            <Link
              key={p.id}
              to={`/packages/${p.id}`}
              className="group overflow-hidden rounded-2xl bg-white shadow-md ring-1 ring-black/5 transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="relative h-32 overflow-hidden bg-gradient-to-br from-amber-700 to-amber-300">
              <CoverImage gov={p.gov} alt={isArabic ? p.nameAr : p.nameEn} width={500} image={p.image} credit={p.imageCredit} />
              </div>
              <div className="p-4">
                <p className="font-bold">{isArabic ? p.nameAr : p.nameEn}</p>
                <p className="text-sm text-gray-600">
                  {daysLabel(p.days, isArabic)} ·{' '}
                  {isArabic ? `${p.price.toLocaleString()} جنيه` : `EGP ${p.price.toLocaleString()}`}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

export default PackageDetailsPage;