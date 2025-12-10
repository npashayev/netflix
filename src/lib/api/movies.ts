import { MoviesResponse } from "@/types/movies";
import { tmdbFetch } from "./client";

// Popular movies
export async function getPopularMovies() {
    try {
        await new Promise(res => setTimeout(res, 2000)); // simulate latency
        const res = await tmdbFetch<MoviesResponse>("/movie/popular");

        if (!res.results?.length) {
            throw new Error("Empty 'popular' movies response");
        }

        return res.results;
    } catch (err) {
        console.error("getPopularMovies() failed:", err);
        return [];
    }
}

// Top rated movies
export async function getTopRatedMovies() {
    try {
        await new Promise(res => setTimeout(res, 1200)); // simulate latency
        const res = await tmdbFetch<MoviesResponse>("/movie/top_rated");

        if (!res.results?.length) {
            throw new Error("Empty 'top rated' movies response");
        }

        return res.results;
    } catch (err) {
        console.error("getTopRatedMovies() failed:", err);
        return getPopularMovies();
    }
}

// Upcoming movies
export async function getUpcomingMovies() {
    try {
        await new Promise(res => setTimeout(res, 1200)); // simulate latency
        const res = await tmdbFetch<MoviesResponse>("/movie/upcoming");

        if (!res.results?.length) {
            throw new Error("Empty 'upcoming' movies response");
        }

        return res.results;
    } catch (err) {
        console.error("getUpcomingMovies() failed:", err);
        return [];
    }
}
