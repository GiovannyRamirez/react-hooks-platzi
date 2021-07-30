import React from 'react';

const styles = {
  Card: {
    border: "1px solid red",
    borderRadius: "16px",
    margin: "2px",
    padding: "3px",
  },
  Picture: {
    borderRadius: "16px",
    height: "115px",
    width: "115px",
  },
  Name: {
    fontSize: "16px",
    fontWeight: "700",
    margin: "2px",
    maxWidth: "130px",
  },
  Data: {
    fontSize: "14px",
    margin: "0",
  },
};

const Favorite = ({ character }) => {

  const { name, species, status, gender, image } = character;

  return (
    <div className="Card" style={styles.Card}>
      <img src={image} alt="ProfileImage" className="Picture" style={styles.Picture}/>
      <h3 className="Name" style={styles.Name}>{name}</h3>
      <p className="Data" style={styles.Data}>Especie: {species}</p>
      <p className="Data" style={styles.Data}>Género: {gender}</p>
      <p className="Data" style={styles.Data}>Status: {status}</p>
    </div>
  );
}

export default Favorite;