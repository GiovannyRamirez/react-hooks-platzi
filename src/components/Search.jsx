import React from 'react';

const styles = {
  Filter: {
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
    margin: "12px auto",
  },
  Label: {
    marginRight: "6px",
  }
}

const Search = ({ search, searchInput, handleSearch }) => {
  return (
    <div className="Filter" style={styles.Filter}>
      <label style={styles.Label} htmlFor="searchBar" onClick={() => searchInput.current.focus()}>Ingresa nombre a buscar: </label>
      {/* <input type="text" name="searchBar" value={search} onChange={e => setSearch(e.target.value)}/> */}
      <input 
        ref={searchInput}
        type="text"
        name="searchBar"
        value={search}
        onChange={handleSearch}
      />
    </div>
  )
};

export default Search;