export const runtime = "edge";

import type { Movie } from "@/types/movies";

// Server-only type — not sent to client
type MovieInternal = Movie & { _momentum: number };

// Use TMDB v3 key (query param)
const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/movie/top_rated?api_key=${process.env.TMDB_API_KEY}`;

export async function GET(req: Request) {
    // Fetch top movies from TMDB using v3 API key
    const tmdbRes = await fetch(API_URL, {
        cache: "no-store",
    });

    const data = await tmdbRes.json();
    console.log("TMDB RESPONSE:", data);

    if (!data.results) {
        console.error("TMDB returned invalid data:", data);
        return new Response("Invalid TMDB API response", { status: 500 });
    }

    // Template list for cloning per client
    const templateMovies: MovieInternal[] = data.results
        .slice(0, 10)
        .map((m: Movie) => ({ ...m, _momentum: 0 }));

    const stream = new ReadableStream({
        start(controller) {
            // Per-client simulation copy
            const movies = templateMovies.map(m => ({ ...m }));

            // Initial send
            controller.enqueue(
                `event: initial\ndata: ${JSON.stringify(movies)}\n\n`
            );

            // Live updates every 1 second
            const intervalId = setInterval(() => {
                for (const movie of movies) {
                    const drift = (Math.random() - 0.5) * 0.8;
                    movie.popularity += drift;

                    movie._momentum = movie._momentum * 0.9 + drift * 0.1;
                    movie.popularity += movie._momentum;

                    if (Math.random() < 0.01) {
                        movie.popularity += Math.random() * 20 + 10;
                    }

                    if (movie.popularity < 0) movie.popularity = 0;

                    const delta = { id: movie.id, popularity: movie.popularity };

                    controller.enqueue(
                        `event: delta\ndata: ${JSON.stringify(delta)}\n\n`
                    );
                }
            }, 1000);

            // Cleanup on disconnect
            req.signal.addEventListener("abort", () => {
                clearInterval(intervalId);
            });
        },
    });

    return new Response(stream, {
        headers: {
            "Content-Type": "text/event-stream",
            "Cache-Control": "no-cache, no-transform",
            "Connection": "keep-alive",
        },
    });
}
