
import axios from "axios";

const COMMONS_API = "https://commons.wikimedia.org/w/api.php";

export const getPlaceImage = async (placeName) => {
    try {
        const response = await axios.get(COMMONS_API, {
            params: {
                action: "query",
                generator: "search",
                gsrsearch: placeName,
                gsrnamespace: 6,
                gsrlimit: 5,
                prop: "imageinfo",
                iiprop: "url|extmetadata",
                iiurlwidth: 600,
                format: "json",
                origin: "*",
            },
        });

        const pages = Object.values(
            response.data.query?.pages || {}
        );

        if (!pages.length) return null;

        const image = pages.find(
            (page) => page.imageinfo?.[0]?.thumburl
        );

        if (!image) return null;

        const info = image.imageinfo[0];

        return {
            url: info.thumburl,
            pageUrl: info.descriptionurl,
            license:
                info.extmetadata?.LicenseShortName?.value || "Unknown",
            artist:
                info.extmetadata?.Artist?.value || "Unknown",
        };
    } catch (error) {
        console.error("Failed to fetch place image:", error);
        return null;
    }
};
