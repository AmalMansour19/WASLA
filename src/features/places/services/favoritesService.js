
const FAVORITES_KEY = "wasla_favorites";

// Get all favorites for a specific user
export function getFavorites(userId) {
    if (!userId) return [];

    try {
        const savedFavorites = JSON.parse(
            localStorage.getItem(FAVORITES_KEY) || "{}"
        );

        return Array.isArray(savedFavorites[userId])
            ? savedFavorites[userId]
            : [];
    } catch {
        return [];
    }
}

// Add a destination to favorites
export function addFavorite(userId, placeId) {
    if (!userId || !placeId) return [];

    const favorites = getAllFavorites();
    const userFavorites = favorites[userId] || [];

    if (!userFavorites.includes(placeId)) {
        favorites[userId] = [...userFavorites, placeId];
        saveFavorites(favorites);
    }

    return favorites[userId];
}

// Remove a destination from favorites
export function removeFavorite(userId, placeId) {
    if (!userId || !placeId) return [];

    const favorites = getAllFavorites();

    favorites[userId] = (favorites[userId] || []).filter(
        (id) => id !== placeId
    );

    saveFavorites(favorites);

    return favorites[userId];
}

// Check if a destination is already favorite
export function isFavorite(userId, placeId) {
    return getFavorites(userId).includes(placeId);
}

// Get all users' favorites
function getAllFavorites() {
    try {
        const data = JSON.parse(
            localStorage.getItem(FAVORITES_KEY) || "{}"
        );

        return data && typeof data === "object" && !Array.isArray(data)
            ? data
            : {};
    } catch {
        return {};
    }
}

// Save favorites
function saveFavorites(favorites) {
    localStorage.setItem(
        FAVORITES_KEY,
        JSON.stringify(favorites)
    );
}
