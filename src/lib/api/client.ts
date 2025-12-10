export async function tmdbFetch<T>(endpoint: string): Promise<T> {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;
    const apiKey = process.env.TMDB_API_KEY;

    if (!baseUrl || !apiKey) {
        throw new Error("TMDB env variables are missing");
    }

    // logic to add api key to the end of url
    const separator = endpoint.includes("?") ? "&" : "?";
    const url = `${baseUrl}${endpoint}${separator}api_key=${apiKey}`;

    const res = await fetch(url, {
        headers: {
            accept: "application/json",
        },
        next: {
            revalidate: 3600, // cache 1 hour
        },
    });

    if (!res.ok) {
        throw new Error(`TMDB fetch failed: ${res.status} ${res.statusText}`);
    }

    const data: T = await res.json();
    return data;
}
