
import { PreferencesProvider } from './contexts/PreferencesContext.jsx';
import { AuthProvider } from './contexts/AuthContext.jsx';

function Providers({ children }) {
    return (
        <PreferencesProvider>
            <AuthProvider>
                {children}
            </AuthProvider>
        </PreferencesProvider>
    );
}

export default Providers;
