
import {
    createContext,
    useContext,
    useState,
} from 'react';

import {
    login as loginService,
    signup as signupService,
    logout as logoutService,
    getCurrentUser,
} from '../../features/auth/services/authService.js';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => getCurrentUser());

    function login(email, password) {
        const loggedInUser = loginService(email, password);
        setUser(loggedInUser);
        return loggedInUser;
    }

    function signup(userData) {
        const newUser = signupService(userData);
        setUser(newUser);
        return newUser;
    }

    function logout() {
        logoutService();
        setUser(null);
    }

    const isAuthenticated = Boolean(user);

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated,
                login,
                signup,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }

    return context;
}
