import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import SearchBar from "../SearchBar/SearchBar";
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";
import { fetchMovies } from "../../services/movieService";
import type { Movie } from "../../types/movie";
import styles from "./App.module.css";

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [selected, setSelected] = useState<Movie | null>(null);

  
  const handleSearch = async (formData: FormData) => {
    const query = String(formData.get("query") ?? "").trim();
    if (!query) {
    
      toast.error("Please enter your search query.");
      return;
    }

    
    setMovies([]);
    setError(false);
    setLoading(true);

    try {
      const data = await fetchMovies(query, 1);
      if (!data.length) {
        toast.error("No movies found for your request.");
      }
      setMovies(data);
    } catch {
      setError(true);
      toast.error("There was an error, please try again...");
    } finally {
      setLoading(false);
    }
  };

  const openModal = (movie: Movie) => setSelected(movie);
  const closeModal = () => setSelected(null);

  return (
    <>
      <SearchBar onSubmit={handleSearch} />

      <main className={styles.main}>
        {loading ? (
          <Loader />
        ) : error ? (
          <ErrorMessage />
        ) : (
          <MovieGrid movies={movies} onSelect={openModal} />
        )}
      </main>

      <MovieModal movie={selected} onClose={closeModal} />
      <Toaster position="top-right" />
    </>
  );
}
