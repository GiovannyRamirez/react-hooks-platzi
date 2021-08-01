import { useState, useEffect } from 'react';

const useCharacters = url => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(false);
  const API = "https://rickandmortyapi.com/api/character";

  useEffect(() => {
    setLoading(true);
    fetch(`${API}${url}`)
      .then(res => res.json())
      .then(data => setCharacters(data.results))
      .then(() => setLoading(false))
  }, [url])

  return [characters, loading];
};

export default useCharacters;