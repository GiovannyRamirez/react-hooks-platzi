export const initialState = {
  favorites: []
};

export const favoriteReducer = (state, action) => {
  switch(action.type) {
    case "ADD_TO_FAVORITE":
      return {
        ...state,
        favorites: [...state.favorites, action.payload]
      };
    case "REMOVE_FAVORITE":
      return {
        ...state,
        favorites: [...state.favorites.filter(el => el.id !== action.payload.id)]
      }
    default: 
    return state;
  }
};