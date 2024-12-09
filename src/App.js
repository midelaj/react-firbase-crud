import { useEffect, useState } from "react";
import "./App.css";
import { Auth } from "./components/Auth";
import { db } from "./config/firebase";
import {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

function App() {
  const [movieList, setMovieList] = useState([]);
  const [newMovieTitle, setNewMovieTitle] = useState("");
  const [newMovieReleaseDate, setNewMovieReleaseDate] = useState(0);
  const [isNewMovieReseivedOscar, setIsNewMovieReseivedOscar] = useState(false);
  const [updateTitle, setUpdateTitle] = useState("");

  const moviesCollectionRef = collection(db, "movies");

  const getMovieList = async () => {
    try {
      const data = await getDocs(moviesCollectionRef);
      const filteredDate = await data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setMovieList(filteredDate);
    } catch (err) {
      console.error(err);
    }
  };

  const onSubmintNewMovie = async () => {
    try {
      await addDoc(moviesCollectionRef, {
        title: newMovieTitle,
        releaseDate: newMovieReleaseDate,
        receivedAnOscar: isNewMovieReseivedOscar,
      });
      getMovieList();
    } catch (err) {
      console.error(err);
    }
  };

  const onDeleteMovie = async (id) => {
    const getMovie = await doc(db, "movies", id);
    try {
      await deleteDoc(getMovie);
      getMovieList();
    } catch (err) {
      console.error(err);
    }
  };

  const updateMovie = async (id) => {
    const getMovie = await doc(db, "movies", id);
    try {
      await updateDoc(getMovie, { title: updateTitle });
      getMovieList();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getMovieList();
  }, []);

  return (
    <div className="App">
      <Auth />
      <input
        placeholder="movie title"
        onChange={(e) => setNewMovieTitle(e.target.value)}
      />
      <input
        placeholder="Release Date"
        type="number"
        onChange={(e) => setNewMovieReleaseDate(Number(e.target.value))}
      />
      <input
        type="checkbox"
        checked={isNewMovieReseivedOscar}
        onChange={(e) => setIsNewMovieReseivedOscar(e.target.checked)}
      />
      <label htmlFor="">is Reseived oscar</label>

      <button onClick={onSubmintNewMovie}>submit</button>

      {movieList.map((movie) => (
        <div>
          <h1 style={{ color: movie.receivedAnOscar ? "green" : "red" }}>
            {movie.title}
          </h1>
          <p>Date:{movie.releaseDate}</p>
          <p>id: {movie.id}</p>
          <button onClick={() => onDeleteMovie(movie.id)}>Delete Movie</button>
          <input
            placeholder="update Title..."
            type="text"
            onChange={(e) => setUpdateTitle(e.target.value)}
          />
          <button onClick={() => updateMovie(movie.id)}>update</button>
        </div>
      ))}
    </div>
  );
}

export default App;
