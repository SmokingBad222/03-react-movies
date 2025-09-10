import { toast } from "react-hot-toast";
import styles from "./SearchBar.module.css";

interface SearchBarProps {
  onSubmit: (formData: FormData) => void | Promise<void>;
}

export default function SearchBar({ onSubmit }: SearchBarProps) {

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const query = String(fd.get("query") ?? "").trim();
    if (!query) {
      toast.error("Please enter your search query.");
      return;
    }
    onSubmit(fd);
    e.currentTarget.reset();
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <a
          className={styles.link}
          href="https://www.themoviedb.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by TMDB
        </a>

   
        <form className={styles.form} onSubmit={handleSubmit} action={onSubmit as any}>
          <input
            className={styles.input}
            type="text"
            name="query"
            autoComplete="off"
            placeholder="Search movies..."
            autoFocus
          />
          <button className={styles.button} type="submit">
            Search
          </button>
        </form>
      </div>
    </header>
  );
}
