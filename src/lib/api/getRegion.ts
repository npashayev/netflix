import { headers } from "next/headers";

export async function getRegion(): Promise<string> {
    try {
        const h = await headers(); // now async in your environment
        const country = h.get("x-vercel-ip-country");

        if (country && country.length === 2) {
            return country.toUpperCase();
        }

        return "US";
    } catch (err) {
        console.error("getRegion() failed:", err);
        return "US";
    }
}
