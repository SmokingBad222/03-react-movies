import axios, { AxiosInstance, AxiosResponse } from "axios";
import type { Movie } from "../types/movie";

const TMDB_TOKEN = import.meta.env.VITE_TMDB_TOKEN as string;

if (!TMDB_TOKEN) {
  // Допоможе зловити помилку конфігурації ще на старті
  // eslint-disable-next-line no-console
  console.error("VITE_TMDB_TOKEN is missing in .env");
}

const api: AxiosInstance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Authorization: `Bearer ${TMDB_TOKEN}`,
  },
  params: {
    language: "en-US",
    include_adult: false,
  },
});

type SearchMoviesResponse = {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
};

export async function fetchMovies(
  query: string,
  page = 1
): Promise<Movie[]> {
  const res: AxiosResponse<SearchMoviesResponse> = await api.get(
    "/search/movie",
    {
      params: { query, page },
    }
  );
  return res.data.results ?? [];
}


export function buildImageUrl(
  path: string | null,
  size: "w500" | "original" = "w500"
): string | undefined {
  if (!path) return undefined;
  return `https://image.tmdb.org/t/p/${size}${path}`;
}
