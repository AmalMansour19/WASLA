
import { Outlet } from 'react-router-dom';

import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';

function MainLayout() {
    return (
        <div className="flex min-h-screen flex-col bg-[var(--wasla-background)] text-[var(--wasla-text)] transition-colors duration-200">
            <Navbar />

            <main className="flex-1">
                <Outlet />
            </main>

            <Footer />
        </div>
    );
}

export default MainLayout;
