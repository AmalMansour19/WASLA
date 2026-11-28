import { Link } from "react-router-dom";
import {
  ArrowRight,
  MapPin,
  Users,
  ShieldCheck,
  Star,
  Headset,
} from "lucide-react";
import { governorates } from "../../../data/places";

const featuredGovernorateIds = ["giza", "luxor", "aswan", "cairo"];

const featuredGovernorates = governorates.filter((governorate) =>
  featuredGovernorateIds.includes(governorate.id),
);

function HomePage() {
  return (
    <main className="overflow-hidden bg-[var(--wasla-background)] text-[var(--wasla-text)]">

      {/* Hero Section */}
      
      <section className="relative flex min-h-[650px] items-center overflow-hidden bg-[var(--wasla-primary-dark)]">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/images/egypt-poster.jpg"
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src="/videos/egypt-hero.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-gradient-to-r from-[var(--wasla-primary-dark)]/95 via-[var(--wasla-text)]/75 to-transparent"> </div>

        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-24 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="mb-6 text-5xl font-black leading-[1.15] tracking-tight text-white sm:text-6xl lg:text-7xl">
              Discover Egypt
              <br />
              <span className="italic text-[var(--wasla-primary)]">
                Your Way
              </span>
            </h1>

            <p className="mb-9 max-w-xl text-lg leading-8 text-white/80 sm:text-xl">
              Explore amazing places, plan your trip,
              <br />
              and book trusted guides & tour packages.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                to="/places"
                className="group inline-flex items-center gap-3 rounded-xl bg-[var(--wasla-primary)] px-7 py-4 font-extrabold text-white shadow-xl transition-all duration-300 hover:-translate-y-1 hover:bg-[var(--wasla-primary-dark)]"
              >
                Explore Egypt
                <ArrowRight
                  size={20}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>

              <Link
                to="/about"
                className="inline-flex items-center rounded-xl border border-white/40 bg-white/10 px-7 py-4 font-bold text-white backdrop-blur-md transition-all duration-300 hover:bg-white/20"
              >
                Discover WASLA
              </Link>
            </div>

            <div className="mt-14 flex flex-wrap gap-8 text-white/80">
              <div className="flex items-center gap-2">
                <MapPin className="text-[var(--wasla-primary)]" />
                <span className="text-sm font-semibold">
                  Amazing Destinations
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Users className="text-[var(--wasla-primary)]" />
                <span className="text-sm font-semibold">Local Experiences</span>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 h-2 w-full bg-gradient-to-r from-[var(--wasla-primary)] via-[var(--wasla-muted)] to-[var(--wasla-primary-dark)]"> </div>
      </section>

      {/* Popular Destinations */}
      <section className="bg-[var(--wasla-background)] px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="text-center sm:text-left">
              <h2 className="text-3xl font-black text-[var(--wasla-text)]">
                Popular Destinations
              </h2>
              <div className="mt-5 h-1 w-20 rounded-full bg-[var(--wasla-primary)]" />
            </div>

            <Link
              to="/governorates"
              className="group inline-flex items-center gap-2 font-bold text-[var(--wasla-primary)] transition-colors hover:text-[var(--wasla-primary-dark)]"
            >
              View All
              <ArrowRight
                size={20}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredGovernorates.map((governorate) => (
              <Link
                key={governorate.id}
               to={`/places?governorate=${encodeURIComponent(governorate.dataName)}`}
                className="group relative block h-72 overflow-hidden rounded-3xl bg-[var(--wasla-primary-dark)] shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                {governorate.imageUrl && (
                  <img
                    src={governorate.imageUrl}
                    alt={governorate.nameAr}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-[var(--wasla-text)]/90 via-transparent to-transparent"> </div>

                <div className="absolute bottom-0 left-0 flex w-full items-center justify-between p-5 text-white">
                  <div className="flex items-center gap-2">
                    <MapPin
                      size={21}
                      className="text-[var( --wasla-surface)]"
                    />

                    <h3 className="text-xl font-bold">{governorate.nameEn}</h3>
                  </div>

                  <ArrowRight
                    size={23}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Plan Your Trip & Why Choose WASLA */}
      <section className="bg-[var(--wasla-background)] px-6 py-16">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="relative grid min-h-[350px] grid-cols-1 gap-8 overflow-hidden rounded-[30px] bg-[var(--wasla-surface)] p-6 shadow-sm sm:p-10 lg:col-span-8 lg:grid-cols-2 lg:items-center lg:gap-8">
            <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[var(--wasla-primary)]/10 blur-3xl" />

            <div className="relative z-10 w-full">
              <h2 className="text-3xl font-black leading-tight text-[var(--wasla-text)] sm:text-4xl">
                Plan Your Perfect Trip
              </h2>

              <p className="mt-5 max-w-lg text-base leading-7 text-[var(--wasla-muted)] sm:text-lg">
                Use our smart trip planner to create your ideal itinerary based
                on your budget, time, and interests.
              </p>

              <Link
                to="/packages"
                className="group my-5 inline-flex items-center gap-3 rounded-xl bg-[var(--wasla-primary)] px-7 py-4 font-extrabold text-white shadow-xl transition-all duration-300 hover:-translate-y-1 hover:bg-[var(--wasla-primary-dark)]"
              >
                Start Planning
                <ArrowRight
                  size={20}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </div>

  
            <div className="relative z-10 grid w-full grid-cols-2 items-center gap-3 sm:gap-5">
     
              <div className="h-36 rotate-[-4deg] overflow-hidden rounded-2xl border-4 border-white shadow-xl transition-transform duration-500 hover:-translate-y-2 sm:h-48">
                <img
                  src="/images/governorates/fayoum.jpg"
                  alt="Explore Fayoum"
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="mt-8 h-36 rotate-[4deg] overflow-hidden rounded-2xl border-4 border-white shadow-xl transition-transform duration-500 hover:-translate-y-2 sm:h-48">
                <img
                  src="/images/governorates/luxor.jpg"
                  alt="Explore Luxor"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>


          <div className="flex min-h-[350px] flex-col justify-center rounded-[30px] bg-[var(--wasla-surface)] p-8 shadow-sm lg:col-span-4 lg:p-7">
            <h2 className="mb-9 text-2xl font-black text-[var(--wasla-text)] sm:text-3xl">
              Why Choose WASLA?
            </h2>

            <div className="space-y-8">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[var(--wasla-background)]">
                  <ShieldCheck
                    size={28}
                    className="text-[var(--wasla-primary)]"
                  />
                </div>

                <p className="font-bold text-[var(--wasla-text)]">
                  Trusted & Verified Guides
                </p>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[var(--wasla-background)]">
                  <Star
                    size={28}
                    className="fill-[var(--wasla-primary)] text-[var(--wasla-primary-dark)]"
                  />
                </div>

                <p className="font-bold text-[var(--wasla-text)]">
                  Curated Tour Packages
                </p>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[var(--wasla-background)]">
                  <Headset size={28} className="text-[var(--wasla-primary)]" />
                </div>

                <p className="font-bold text-[var(--wasla-text)]">
                  24/7 Support
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default HomePage;
