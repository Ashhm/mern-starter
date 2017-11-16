import {
  ADD_COMMENT,
  GET_COMMENTS,
  EDIT_COMMENT,
  DELETE_COMMENT,
  TOGGLE_ADD_COMMENT,
} from './CommentActions';

// Initial State: data object with key equals to postID
const initialState = { data: {} };

// Reducer implementation
const CommentReducer = (state = initialState, action) => {
  switch (action.type) {

    // Adding a comment into store
    case ADD_COMMENT :
      return {
        data: {
          ...state.data,
          [action.postId]: [...state.data[action.postId], action.comments],
        },
      };

    // Getting comments and spread with prev state
    case GET_COMMENTS :
      return {
        data: { ...state.data, [action.postId]: action.comments },
      };

    // Reducing remaped array of object into data object
    case EDIT_COMMENT:
      return {
        data: Object.keys(state.data).reduce((object, key) => {
          object[key] = state.data[key].map(item => { // eslint-disable-line
            return item.cuid !== action.cuid ? item : action.comment;
          });
          return object;
        }, {}),
      };

    // Reducing filtered array of object into data object
    case DELETE_COMMENT :
      return {
        data: Object.keys(state.data).reduce((object, key) => {
          object[key] = state.data[key].filter(item => { // eslint-disable-line
            return item.cuid !== action.cuid;
          });
          return object;
        }, {}),
      };

    // After each change in comments list need to refresh it
    case TOGGLE_ADD_COMMENT:
      return {
        data: { ...state.data },
      };

    default:
      return state;
  }
};

// Get comments by postId
export const getComments = (state, postId) => state.comments.data[postId];

// Export Reducer
export default CommentReducer;
