import { Link } from "react-router-dom";
import { ArrowRight, MapPin } from "lucide-react";
import { governorates } from "../../../data/places";

function GovernoratesPage() {
  return (
    <main className="overflow-hidden bg-[var(--wasla-background)] text-[var(--wasla-text)]">

      {/* Hero Section */}

      <section
        className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] flex min-h-[480px] w-screen items-center overflow-hidden bg-cover bg-center px-7 py-20 sm:px-12 lg:px-20"
        style={{
          backgroundImage: "url('/images/governorates/alexandria.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--wasla-primary-dark)]/95 via-[var(--wasla-text)]/75 to-transparent"></div>

        <div className="relative z-10 w-full max-w-2xl text-left text-white">

          <h1 className="text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
            Explore Egypt's
            <br />
            <span className="text-[var(--wasla-primary)]">
              Governorates
            </span>
          </h1>

          <p className="mt-6 max-w-lg text-base leading-7 text-white/85 sm:text-lg">
            Discover Egypt's hidden gems, historic landmarks,
            and unforgettable destinations.
          </p>

          <Link
            to="/"
            className="group mt-8 inline-flex items-center gap-3 rounded-xl bg-[var(--wasla-primary)] px-7 py-4 font-extrabold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-[var(--wasla-primary-dark)]"
          >
            Back to Home

            <ArrowRight
              size={20}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>

        </div>

      </section>


      {/* All Governorates */}

      <section className="bg-[var(--wasla-background)] px-6 py-16">

        <div className="mx-auto max-w-7xl">

          <div className="mb-10">

            <h2 className="text-3xl font-black text-[var(--wasla-text)] sm:text-4xl">
              All Governorates
            </h2>

            <p className="mt-3 text-[var(--wasla-muted)]">
              Explore all the beautiful governorates of Egypt.
            </p>

           

          </div>


          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

            {governorates.map((governorate) => (

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

                <div className="absolute inset-0 bg-gradient-to-t from-[var(--wasla-text)]/90 via-transparent to-transparent"></div>

                <div className="absolute bottom-0 left-0 flex w-full items-center justify-between p-5 text-white">

                  <div className="flex items-center gap-2">

                    <MapPin
                      size={21}
                      className="text-[var( --wasla-surface)]"
                    />

                    <h3 className="text-xl font-extrabold">
                      {governorate.nameEn}
                    </h3>

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

    </main>
  );
}

export default GovernoratesPage;
