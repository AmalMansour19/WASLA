
import { useEffect, useState } from "react";
import { getPlaceImage } from "../services/imageService";

function PlaceImage({ placeName }) {
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let active = true;

        async function loadImage() {
            setLoading(true);
            const result = await getPlaceImage(placeName);

            if (active) {
                setImage(result);
                setLoading(false);
            }
        }

        loadImage();

        return () => {
            active = false;
        };
    }, [placeName]);

    if (loading) {
        return (
            <div className="h-48 w-full animate-pulse rounded-xl bg-gray-200" />
        );
    }

    if (!image) {
        return (
            <div className="flex h-48 items-center justify-center rounded-xl bg-gray-100 text-sm text-gray-400">
                No image available
            </div>
        );
    }

    return (
        <div>
            <img
                src={image.url}
                alt={placeName}
                className="h-48 w-full rounded-xl object-cover"
                loading="lazy"
            />
            <p className="mt-2 text-xs text-gray-500">
                {image.license} · {image.artist}
            </p>
            <a
                href={image.pageUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-amber-700 underline"
            >
                Image source
            </a>
        </div>
    );
}

export default PlaceImage;
