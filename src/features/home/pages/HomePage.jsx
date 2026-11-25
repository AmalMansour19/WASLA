
import { Link } from 'react-router-dom';
import {
    ArrowRight,
    Compass,
    MapPin,
    ShieldCheck,
    Users,
    Globe2,
} from 'lucide-react';

function HomePage() {
    return (
        <main className="overflow-hidden bg-[#FFF8EF] text-[#10243A]">

            {/* Hero Section */}
            <section className="relative flex min-h-[650px] items-center overflow-hidden bg-[#10243A]">
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

                <div className="absolute inset-0 bg-gradient-to-r from-[#071727]/95 via-[#10243A]/75 to-[#10243A]/20" />

                <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-24 lg:px-8">
                    <div className="max-w-3xl">

                        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#FF8A32]/40 bg-[#FF8A32]/10 px-5 py-2 text-sm font-bold text-[#FFAD65] backdrop-blur-md">
                            <Compass size={17} />
                            Discover the beauty of Egypt
                        </div>

                        <h1 className="mb-6 text-5xl font-black leading-[1.15] tracking-tight text-white sm:text-6xl lg:text-7xl">
                            Your Journey.
                            <br />
                            Your Story.
                            <br />
                            <span className="italic text-[#FF8A32]">
                                Your Egypt.
                            </span>
                        </h1>

                        <p className="mb-9 max-w-xl text-lg leading-8 text-white/80 sm:text-xl">
                            Explore breathtaking destinations, meet local
                            guides, and discover unforgettable experiences
                            across Egypt with WASLA.
                        </p>

                        <div className="flex flex-wrap gap-4">
                            <Link
                                to="/places"
                                className="group inline-flex items-center gap-3 rounded-xl bg-[#FF8A32] px-7 py-4 font-extrabold text-[#10243A] shadow-xl shadow-[#FF8A32]/20 transition-all duration-300 hover:-translate-y-1 hover:bg-[#FFAD65]"
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
                                <MapPin className="text-[#FF8A32]" />
                                <span className="text-sm font-semibold">
                                    Amazing Destinations
                                </span>
                            </div>

                            <div className="flex items-center gap-2">
                                <Users className="text-[#FF8A32]" />
                                <span className="text-sm font-semibold">
                                    Local Experiences
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="absolute bottom-0 left-0 h-2 w-full bg-gradient-to-r from-[#FF8A32] via-[#FFD08A] to-[#287C78]" />
            </section>

            {/* Intro Section */}
            <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
                <div className="mx-auto max-w-3xl text-center">
                    <span className="mb-4 inline-block text-sm font-extrabold uppercase tracking-[0.25em] text-[#D96B24]">
                        Welcome to WASLA
                    </span>

                    <h2 className="mb-6 text-4xl font-black leading-tight sm:text-5xl">
                        Egypt is waiting
                        <span className="text-[#E97832]"> for you.</span>
                    </h2>

                    <p className="text-lg leading-8 text-[#617080]">
                        From ancient wonders to beautiful coastlines,
                        discover the places, people, and stories that
                        make Egypt unforgettable.
                    </p>
                </div>

                {/* Feature Cards */}
                <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

                    <Link
                        to="/places"
                        className="group rounded-3xl border border-[#E9DFD1] bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                    >
                        <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FF8A32]/15 text-[#E97832] transition-colors group-hover:bg-[#FF8A32] group-hover:text-white">
                            <Globe2 size={28} />
                        </div>

                        <h3 className="mb-3 text-xl font-extrabold">
                            Explore Destinations
                        </h3>

                        <p className="leading-7 text-[#718091]">
                            Discover incredible places and hidden gems
                            throughout Egypt.
                        </p>

                        <span className="mt-6 inline-flex items-center gap-2 font-bold text-[#E97832]">
                            Explore now <ArrowRight size={17} />
                        </span>
                    </Link>

                    <Link
                        to="/guides"
                        className="group rounded-3xl border border-[#E9DFD1] bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                    >
                        <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#287C78]/15 text-[#287C78] transition-colors group-hover:bg-[#287C78] group-hover:text-white">
                            <Users size={28} />
                        </div>

                        <h3 className="mb-3 text-xl font-extrabold">
                            Meet Local Guides
                        </h3>

                        <p className="leading-7 text-[#718091]">
                            Connect with local guides and experience
                            Egypt like never before.
                        </p>

                        <span className="mt-6 inline-flex items-center gap-2 font-bold text-[#287C78]">
                            Meet our guides <ArrowRight size={17} />
                        </span>
                    </Link>

                    <Link
                        to="/packages"
                        className="group rounded-3xl border border-[#E9DFD1] bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl sm:col-span-2 lg:col-span-1"
                    >
                        <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#10243A]/10 text-[#10243A] transition-colors group-hover:bg-[#10243A] group-hover:text-white">
                            <ShieldCheck size={28} />
                        </div>

                        <h3 className="mb-3 text-xl font-extrabold">
                            Plan Your Journey
                        </h3>

                        <p className="leading-7 text-[#718091]">
                            Find suitable packages and plan your
                            next Egyptian adventure.
                        </p>

                        <span className="mt-6 inline-flex items-center gap-2 font-bold text-[#10243A]">
                            View packages <ArrowRight size={17} />
                        </span>
                    </Link>
                </div>
            </section>

            {/* Call To Action */}
            <section className="relative overflow-hidden bg-[#10243A] px-6 py-20 text-center">
                <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[#FF8A32]/10 blur-3xl" />
                <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-[#287C78]/20 blur-3xl" />

                <div className="relative mx-auto max-w-3xl">
                    <Compass
                        size={42}
                        className="mx-auto mb-6 text-[#FF8A32]"
                    />

                    <h2 className="mb-5 text-3xl font-black text-white sm:text-5xl">
                        Ready for your next adventure?
                    </h2>

                    <p className="mb-8 text-lg leading-8 text-white/70">
                        Your Egyptian story starts here. Let WASLA
                        help you discover it.
                    </p>

                    <Link
                        to="/places"
                        className="inline-flex items-center gap-3 rounded-xl bg-[#FF8A32] px-8 py-4 font-extrabold text-[#10243A] transition-all duration-300 hover:-translate-y-1 hover:bg-[#FFAD65]"
                    >
                        Start Exploring
                        <ArrowRight size={20} />
                    </Link>
                </div>
            </section>
        </main>
    );
}

export default HomePage;
