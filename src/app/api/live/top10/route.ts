export const runtime = "edge";

import { trendingMovies } from "@/lib/constants/trendingMovies";
import { TrendingMovie } from "@/types/movies";

// Internal type used during simulation
type MovieInternal = TrendingMovie & { _momentum: number };

export function GET(req: Request) {
    const encoder = new TextEncoder();

    const stream = new ReadableStream({
        start(controller) {
            // Create per-client movie state
            const movies: MovieInternal[] = trendingMovies.map(m => ({
                ...m,
                _momentum: 0,
            }));

            // Send initial full snapshot
            controller.enqueue(
                encoder.encode(`event: initial\ndata: ${JSON.stringify(movies)}\n\n`)
            );

            // Start live updates
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

                    controller.enqueue(
                        encoder.encode(
                            `event: delta\ndata: ${JSON.stringify({
                                id: movie.id,
                                popularity: movie.popularity,
                            })}\n\n`
                        )
                    );
                }
            }, 1000);

            // Cleanup if client disconnects
            req.signal.addEventListener("abort", () => {
                clearInterval(intervalId);
                controller.close();
            });
        },
    });

    // Return SSE response
    return new Response(stream, {
        headers: {
            "Content-Type": "text/event-stream",
            "Cache-Control": "no-cache, no-transform",
            "Connection": "keep-alive",
        },
    });
}
