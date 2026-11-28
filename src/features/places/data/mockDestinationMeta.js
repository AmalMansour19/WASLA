
const PRICE_OPTIONS = [100, 150, 200, 250, 300, 400, 500, 650];

function getSeed(id) {
    return [...String(id)].reduce(
        (total, char) => total + char.charCodeAt(0),
        0
    );
}

export function getDestinationMeta(id) {
    const seed = getSeed(id);

    // Generate ratings from 3.0 to 5.0
    const rating = Number((3 + (seed % 21) / 10).toFixed(1));

    return {
        price: PRICE_OPTIONS[seed % PRICE_OPTIONS.length],
        rating,
        reviewsCount: 20 + (seed % 481),
    };
}
