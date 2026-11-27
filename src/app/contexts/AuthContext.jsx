
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
    requestPasswordReset as requestPasswordResetService,
    resetPassword as resetPasswordService,
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

    function requestPasswordReset(email) {
        return requestPasswordResetService(email);
    }

    function resetPassword(email, newPassword) {
        return resetPasswordService(email, newPassword);
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
                requestPasswordReset,
                resetPassword,
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
