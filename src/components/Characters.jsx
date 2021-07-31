import React, { useState, useEffect, useReducer } from 'react';
import { favoriteReducer, initialState } from '../reducers/favoriteReducer';
import Character from './Character';
import Favorite from './Favorite';

const styles = {
  Filter: {
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
    margin: "12px auto",
  },
  Title: {
    margin: "2px 0",
  },
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

  const [search, setSearch] = useState("");

  const filteredCharacters = characters.filter(character => {
    return character.name.toLowerCase().includes(search.toLowerCase())
  });

  return (
    <>
      <div className="Filter" style={styles.Filter}>
        <label htmlFor="searchBar">Ingresa nombre a buscar: </label>
        <input type="text" name="searchBar" value={search} onChange={e => setSearch(e.target.value)}/>
      </div>

      {favorites.favorites.length > 0 && <h3 style={styles.Title}>Favoritos</h3>}
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
      </div>

      <h3 style={styles.Title}>Todos los personajes</h3>
      {filteredCharacters.length === 0 && <h5 style={styles.Title}>No hay resultados para: {search}</h5>}
      <div className="Characters" style={styles.Characters}>
        {filteredCharacters.map(character => (
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
    </>    
  );
}

export default Characters;