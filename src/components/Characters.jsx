import React, { useState, useReducer, useMemo, useRef, useCallback } from 'react';
import useCharacters from '../hooks/useCharacters';
import { favoriteReducer, initialState } from '../reducers/favoriteReducer';
import Character from './Character';
import Favorite from './Favorite';
import Search from './Search';

const styles = {
  Subtitle: {
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
    marginBottom: "12px",
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
  },
  FetchMore: {
    height: "32px",
    margin: "12px",
    width: "92px",
  }
}

const Characters = () => {

  const [favorites, dispatch] = useReducer(favoriteReducer, initialState);

  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [characters, loading, more] = useCharacters(`?page=${page}`);

  const handleFavorite = favorite => {
    dispatch({ type: "ADD_TO_FAVORITE", payload: favorite })
  };

  const handleRemoveFavorite = favorite => {
    dispatch({ type: "REMOVE_FAVORITE", payload: favorite })
  };

  // const filteredCharacters = characters.filter(character => {
  //   return character.name.toLowerCase().includes(search.toLowerCase())
  // });

  const filteredCharacters = useMemo(() =>
    characters?.filter(character => {
      return character.name.toLowerCase().includes(search.toLowerCase())
    }),
    [characters, search]
  );

  const searchInput = useRef(null);
  const handleSearch = useCallback(() => {
    setSearch(searchInput.current.value);
  }, []);

  const handleFetchMore = () => {
    setPage(prevState => prevState +1);
  }

  return (
    <>
      {/* <Search search={search} searchInput={searchInput} handleSearch={() => setSearch(searchInput.current.value)} /> */}
      <Search search={search} searchInput={searchInput} handleSearch={handleSearch} />

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

      <div style={styles.Subtitle}>
        <h3 style={styles.Title}>Todos los personajes</h3>
        <button
          onClick={handleFetchMore}
          style={styles.FetchMore}
          disabled={!more}
        >
          Mostrar más
        </button>
        <h5 style={styles.Title}>Mostrando: {filteredCharacters.length} de {page} páginas</h5>
      </div>

      {loading && <h5 style={styles.Title}>Cargando ...</h5>}
      {
        !loading && 
        (filteredCharacters?.length === 0 || filteredCharacters === undefined) && 
        <h5 style={styles.Title}>No hay resultados para: {search}</h5>
      }
      <div className="Characters" style={styles.Characters}>
        {filteredCharacters?.map(character => (
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