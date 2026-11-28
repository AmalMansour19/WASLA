
import { Outlet } from 'react-router-dom';

function AuthLayout() {
    return (
        <div className="auth-shell relative isolate min-h-screen overflow-hidden">

            {/* Background Decorations */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
            >
                {/* Soft Gradient Blobs */}
                <div className="absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-[#FF8A32]/10 blur-[100px]" />

                <div className="absolute -bottom-48 -left-40 h-[550px] w-[550px] rounded-full bg-[#102B43]/10 blur-[110px]" />

                <div className="absolute left-[45%] top-[35%] h-72 w-72 rounded-full bg-[#83B6D5]/10 blur-[90px]" />

                {/* Subtle Dot Pattern */}
                <div className="auth-dot-pattern absolute inset-0 opacity-40" />

                {/* Travel Route Decoration */}
                <svg
                    viewBox="0 0 1000 700"
                    preserveAspectRatio="none"
                    className="absolute inset-0 h-full w-full opacity-[0.18]"
                >
                    <path
                        d="M-50 520 C180 380 250 650 440 450 S700 170 1050 300"
                        fill="none"
                        stroke="#FF8A32"
                        strokeWidth="2"
                        strokeDasharray="7 12"
                    />

                    <path
                        d="M-30 160 C180 280 350 80 520 190 S800 420 1030 130"
                        fill="none"
                        stroke="#102B43"
                        strokeWidth="1.5"
                        strokeDasharray="5 13"
                    />

                    <circle cx="440" cy="450" r="6" fill="#FF8A32" />
                    <circle cx="520" cy="190" r="5" fill="#102B43" />
                    <circle cx="700" cy="300" r="7" fill="#FF8A32" />
                </svg>

                {/* Decorative Rings */}
                <div className="absolute -right-20 top-[35%] h-72 w-72 rounded-full border border-[#102B43]/[0.07]" />

                <div className="absolute -right-10 top-[39%] h-52 w-52 rounded-full border border-[#FF8A32]/[0.12]" />

                <div className="absolute -bottom-20 left-[35%] h-64 w-64 rounded-full border border-[#102B43]/[0.06]" />
            </div>

            {/* Page Content */}
            <div className="relative z-10">
                <Outlet />
            </div>
        </div>
    );
}

export default AuthLayout;
