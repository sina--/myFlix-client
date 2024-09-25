import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card.jsx";
import { MovieView } from "../movie-view/movie-view.jsx";

export const MainView = () => {
  const [movies, setMovies] = useState([
    {
      "id": 1,
      "Title": "Commando (1985)",
      "Description": "A retired special forces colonel goes on a mission to rescue his kidnapped daughter.",
      "Genre": {
        "Name": "Action",
        "Description": "Action films usually include high energy, big-budget physical stunts and chases, possibly with rescues, battles, martial arts, or other violent elements."
      },
      "Director": {
        "Name": "Mark L. Lester",
        "Bio": "Mark L. Lester is an American film director, screenwriter, and producer. He is known for his action-packed films.",
        "Birth": "1946",
        "Death": null
      },
      "Featured": false,
      "Poster": "https://image.tmdb.org/t/p/w1280/ollPAAAgZ7euU8VisfqU3cuXhZ6.jpg"
    },
    {
      "id": 2,
      "Title": "Die Hard (1988)",
      "Description": "An NYPD officer must save his wife and several others taken hostage by terrorists during a Christmas party at the Nakatomi Plaza in Los Angeles.",
      "Genre": {
        "Name": "Action",
        "Description": "Action films usually include high energy, big-budget physical stunts and chases, possibly with rescues, battles, martial arts, or other violent elements."
      },
      "Director": {
        "Name": "John McTiernan",
        "Bio": "John McTiernan is an American filmmaker known for his work in the action genre, including the films 'Predator' and 'Die Hard.'",
        "Birth": "1951",
        "Death": null
      },
      "Featured": false,
      "Poster": "https://image.tmdb.org/t/p/w1280/7Bjd8kfmDSOzpmhySpEhkUyK2oH.jpg"
    },
    {
      "id": 3,
      "Title": "Face/Off (1997)",
      "Description": "An FBI agent undergoes facial transplant surgery to assume the identity of a terrorist, only for the terrorist to assume the agent's identity.",
      "Genre": {
        "Name": "Action",
        "Description": "Action films usually include high energy, big-budget physical stunts and chases, possibly with rescues, battles, martial arts, or other violent elements."
      },
      "Director": {
        "Name": "John Woo",
        "Bio": "John Woo is a Hong Kong filmmaker, best known for his highly stylized action films, including 'The Killer' and 'Face/Off.'",
        "Birth": "1946",
        "Death": null
      },
      "Featured": false,
      "Poster": "https://image.tmdb.org/t/p/w1280/69Xzn8UdPbVnmqSChKz2RTpoNfB.jpg"
    },
    {
      "id": 4,
      "Title": "The Last Samurai (2003)",
      "Description": "An American military advisor embraces the Samurai culture he was hired to destroy after being captured in battle.",
      "Genre": {
        "Name": "Action",
        "Description": "Action films usually include high energy, big-budget physical stunts and chases, possibly with rescues, battles, martial arts, or other violent elements."
      },
      "Director": {
        "Name": "Edward Zwick",
        "Bio": "Edward Zwick is an American filmmaker and producer. He is known for his epic historical films like 'Glory' and 'The Last Samurai.'",
        "Birth": "1952",
        "Death": null
      },
      "Featured": false,
      "Poster": "https://image.tmdb.org/t/p/w1280/lsasOSgYI85EHygtT5SvcxtZVYT.jpg"
    }
  ]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  if (selectedMovie) {
    return (
      <MovieView movieData={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
    );
  }

  if (movies.length === 0) {
    return <div>No Movies Found!</div>;
  } else {
    return (
      <div>
        {movies.map((movie) => {
          return (
            <MovieCard 
              key={movie.id}
              movieData={movie}
              onMovieClick={(newSelectedMovie) => {
                setSelectedMovie(newSelectedMovie);
              }}
            />
          );
        })}
      </div>
    );
  }
};
