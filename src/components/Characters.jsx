import React, { useState, useEffect } from 'react';
import Character from './Character';

const styles = {
  Characters: {
    alignItems: "center",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
  },
}
const Characters = () => {

  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    fetch("https://rickandmortyapi.com/api/character")
      .then(res => res.json())
      .then(data => setCharacters(data.results))
  }, []);

  return (
    <div className="Characters" style={styles.Characters}>
      {characters.map(character => (
        <Character
          key={character.id}
          character={character}
        />
      ))}
    </div>
  );
}

export default Characters;