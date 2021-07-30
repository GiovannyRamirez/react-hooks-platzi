import React, { useState, useEffect, useReducer } from 'react';
import { favoriteReducer, initialState } from '../reducers/favoriteReducer';
import Character from './Character';
import Favorite from './Favorite';

const styles = {
  Characters: {
    alignItems: "center",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
  },
  Favorite: {
    borderRadius: "16px",
    margin: "5px auto 10px",
    maxWidth: "115px",
    padding: "2px",
  }
}

const Characters = () => {

  const [characters, setCharacters] = useState([]);
  const [favorites, dispatch] = useReducer(favoriteReducer, initialState);

  useEffect(() => {
    fetch("https://rickandmortyapi.com/api/character")
      .then(res => res.json())
      .then(data => setCharacters(data.results))
  }, []);

  const handleFavorite = favorite => {
    dispatch({ type: "ADD_TO_FAVORITE", payload: favorite })
  };

  const handleRemoveFavorite = favorite => {
    dispatch({ type: "REMOVE_FAVORITE", payload: favorite })
  };

  return (
    <div className="Characters" style={styles.Characters}>
      {favorites.favorites.length > 0 && favorites.favorites.map(fav => (
        <div key={fav.id}>
          <Favorite
            key={fav.id}
            character={fav}
          />
          <div className="Remove" style={styles.Favorite} onClick={() => handleRemoveFavorite(fav)}>
            Quitar favorito
          </div>
        </div>
      ))}

      {characters.map(character => (
        <div key={character.id}>
          <Character
            key={character.id}
            character={character}
            favorite={handleFavorite}
          />
          <div className="Add" style={styles.Favorite}onClick={() => handleFavorite(character)}>
            Añadir favorito
          </div>
        </div>
      ))}
    </div>
  );
}

export default Characters;