import { MoviesResponse } from "@/types/movies";
import { tmdbFetch } from "./client";
import { getPopularMovies } from "./movies";

// Popular movies by region
export async function getPopularMoviesByRegion(region?: string) {
    try {
        const finalRegion = region ?? "US";
        const res = await tmdbFetch<MoviesResponse>(
            `/movie/popular?region=${finalRegion}`
        );

        await new Promise(res => setTimeout(res, 1500)); // simulate latency

        if (!res.results?.length) {
            throw new Error(`Empty 'popular' movies for region: ${finalRegion}`);
        }

        return res.results;
    } catch (err) {
        console.error("getPopularMoviesByRegion() failed:", err);
        return getPopularMovies();
    }
}

// Top rated movies by region
export async function getTopRatedMoviesByRegion(region?: string) {
    try {
        const finalRegion = region ?? "US";

        const res = await tmdbFetch<MoviesResponse>(
            `/movie/top_rated?region=${finalRegion}`
        );

        await new Promise(res => setTimeout(res, 1000)); // simulate latency

        if (!res.results?.length) {
            throw new Error(`Empty 'top rated' movies for region: ${finalRegion}`);
        }

        return res.results;
    } catch (err) {
        console.error("getTopRatedMoviesByRegion() failed:", err);
        return getPopularMovies();
    }
}