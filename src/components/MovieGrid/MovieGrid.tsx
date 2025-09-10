import css from "./MovieGrid.module.css";
import type { Movie } from "../../types/movie";
import { buildImageUrl } from "../../services/movieService";

interface MovieGridProps {
  movies: Movie[];
  onSelect: (movie: Movie) => void;
}

export default function MovieGrid({ movies, onSelect }: MovieGridProps) {
  if (!movies.length) return null;

  return (
    <ul className={css.grid}>
      {movies.map((m) => (
        <li key={m.id}>
          <div className={css.card} onClick={() => onSelect(m)} role="button" tabIndex={0}
               onKeyDown={(e) => (e.key === "Enter" ? onSelect(m) : null)}>
            <img
              className={css.image}
              src={buildImageUrl(m.poster_path, "w500") || ""}
              alt={m.title}
              loading="lazy"
            />
            <h2 className={css.title}>{m.title}</h2>
          </div>
        </li>
      ))}
    </ul>
  );
}
