export const songListReducer = (state, action) => {
  switch (action.type) {
    case "ADD_SONG":
      // console.log(action.payload);
      // console.log(state);

      return [...state, action.payload];

    case "REMOVE_SONG":
      return state.filter((song) => song.title !== action.payload.title);

    default:
      return state;
  }
};
