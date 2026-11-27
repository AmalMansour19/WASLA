
import mockUsers from '../data/mockUsers.js';

const USERS_KEY = 'wasla_users';
const CURRENT_USER_KEY = 'wasla_current_user';
const PASSWORD_OVERRIDES_KEY = 'wasla_password_overrides';

// Get all registered users
function getAllUsers() {
    try {
        const savedUsers = JSON.parse(
            localStorage.getItem(USERS_KEY) || '[]'
        );

        const passwordOverrides = JSON.parse(
            localStorage.getItem(PASSWORD_OVERRIDES_KEY) || '{}'
        );

        const users = [
            ...mockUsers,
            ...(Array.isArray(savedUsers) ? savedUsers : []),
        ];

        return users.map((user) => ({
            ...user,
            password:
                passwordOverrides[user.email.toLowerCase()] ??
                user.password,
        }));
    } catch {
        return [...mockUsers];
    }
}

// Save a user without exposing the password
function sanitizeUser(user) {
    const { password, ...safeUser } = user;
    return safeUser;
}

// Login
export function login(email, password) {
    const normalizedEmail = email.trim().toLowerCase();

    const user = getAllUsers().find(
        (item) =>
            item.email.toLowerCase() === normalizedEmail &&
            item.password === password
    );

    if (!user) {
        throw new Error('Invalid email or password.');
    }

    const safeUser = sanitizeUser(user);

    localStorage.setItem(
        CURRENT_USER_KEY,
        JSON.stringify(safeUser)
    );

    return safeUser;
}

// Signup
export function signup(userData) {
    const users = getAllUsers();

    const normalizedEmail = userData.email.trim().toLowerCase();

    const emailExists = users.some(
        (user) => user.email.toLowerCase() === normalizedEmail
    );

    if (emailExists) {
        throw new Error('Email is already registered.');
    }

    if (!['tourist', 'guide'].includes(userData.role)) {
        throw new Error('Invalid account type.');
    }

    const newUser = {
        id: `user-${Date.now()}`,
        name: userData.name.trim(),
        email: normalizedEmail,
        password: userData.password,
        role: userData.role,
        image: null,
    };

    const savedUsers = JSON.parse(
        localStorage.getItem(USERS_KEY) || '[]'
    );

    savedUsers.push(newUser);

    localStorage.setItem(
        USERS_KEY,
        JSON.stringify(savedUsers)
    );

    const safeUser = sanitizeUser(newUser);

    localStorage.setItem(
        CURRENT_USER_KEY,
        JSON.stringify(safeUser)
    );

    return safeUser;
}

// Check whether an account exists
export function requestPasswordReset(email) {
    const normalizedEmail = email.trim().toLowerCase();

    const user = getAllUsers().find(
        (item) => item.email.toLowerCase() === normalizedEmail
    );

    if (!user) {
        throw new Error('No account found with this email.');
    }

    return normalizedEmail;
}

// Reset password
export function resetPassword(email, newPassword) {
    const normalizedEmail = email.trim().toLowerCase();

    const user = getAllUsers().find(
        (item) => item.email.toLowerCase() === normalizedEmail
    );

    if (!user) {
        throw new Error('Account not found.');
    }

    const passwordOverrides = JSON.parse(
        localStorage.getItem(PASSWORD_OVERRIDES_KEY) || '{}'
    );

    passwordOverrides[normalizedEmail] = newPassword;

    localStorage.setItem(
        PASSWORD_OVERRIDES_KEY,
        JSON.stringify(passwordOverrides)
    );

    return true;
}

// Get current logged-in user
export function getCurrentUser() {
    try {
        const user = JSON.parse(
            localStorage.getItem(CURRENT_USER_KEY)
        );

        return user || null;
    } catch {
        return null;
    }
}

// Logout
export function logout() {
    localStorage.removeItem(CURRENT_USER_KEY);
}
