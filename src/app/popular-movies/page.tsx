import { getRegion } from "@/lib/api/getRegion";
import MovieList from "./components/MovieList";
import { getPopularMovies, getTopRatedMovies, getUpcomingMovies } from "@/lib/api/movies";
import { Suspense } from "react";
import { getPopularMoviesByRegion } from "@/lib/api/moviesByRegion";
import LoadingFallback from "@/lib/components/shared/LoadingFallback";


export default function PopularMoviesPage() {
    const regionPromise = getRegion();

    return (
        <main className="bg-black min-h-screen p-15 text-white font-bold max-sm:p-5">
            <h1 className="text-3xl border-b-2 pb-8">Explore amazing movies</h1>

            <Suspense fallback={<LoadingFallback>Loading popular movies globally...</LoadingFallback>}>
                <MovieList fetchFn={getPopularMovies}>
                    Global Trending
                </MovieList>
            </Suspense>

            <Suspense fallback={<LoadingFallback>Loading popular movies in your region...</LoadingFallback>}>
                <MovieList regionPromise={regionPromise} fetchFn={getPopularMoviesByRegion}>
                    Trending movies in
                </MovieList>
            </Suspense>

            <Suspense fallback={<LoadingFallback>Loading top rated movies in your region...</LoadingFallback>}>
                <MovieList regionPromise={regionPromise} fetchFn={getTopRatedMovies}>
                    Top rated movies in
                </MovieList>
            </Suspense>

            <Suspense fallback={<LoadingFallback>Loading upcoming movies...</LoadingFallback>}>
                <MovieList fetchFn={getUpcomingMovies}>
                    Upcoming movies
                </MovieList>
            </Suspense>
        </main>
    );
}
