import callApi from '../../util/apiCaller';

// Export Constants
export const ADD_COMMENT = 'ADD_COMMENT';
export const GET_COMMENTS = 'GET_COMMENTS';
export const EDIT_COMMENT = 'EDIT_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';
export const TOGGLE_ADD_COMMENT = 'TOGGLE_ADD_COMMENT';

// Export Actions

// Simple toggle action necessary for refreshing comments list
export function toggleAddComment() {
  return {
    type: TOGGLE_ADD_COMMENT,
  };
}

// Add comment action
export function addComment(comments, postId) {
  return {
    type: ADD_COMMENT,
    comments,
    postId,
  };
}

// Request for add comment action
export function addCommentRequest(comment) {
  return (dispatch) => {
    return callApi('comments', 'post', {
      comment: {
        name: comment.name,
        title: comment.title,
        content: comment.content,
        postId: comment.postId,
      },
    }).then(res => dispatch(addComment(res.comments, comment.postId)))
      .then(() => dispatch(toggleAddComment()));
  };
}

// Get comments by postId action
export function getComments(comments, postId) {
  return {
    type: GET_COMMENTS,
    comments,
    postId,
  };
}

// Request for get comments action by postId
export function fetchComments(postId) {
  return (dispatch) => {
    return callApi(`comments/${postId}`)
      .then(res => {
        dispatch(getComments(res.comments, postId));
      });
  };
}

// Delete comment by cuid action
export function deleteComment(cuid) {
  return {
    type: DELETE_COMMENT,
    cuid,
  };
}

// Request for delete comments action by cuid
export function deleteCommentRequest(cuid) {
  return (dispatch) => {
    return callApi(`comments/${cuid}`, 'delete')
      .then(() => dispatch(deleteComment(cuid)))
      .then(() => dispatch(toggleAddComment()));
  };
}

// Editing comment action by cuid
export function editComment(comment, cuid) {
  return {
    type: EDIT_COMMENT,
    comment,
    cuid,
  };
}

// Request for edit comment action by cuid
export function editCommentRequest(comment, cuid) {
  return (dispatch) => {
    return callApi(`comments/${cuid}`, 'put',
      {
        comment: {
          name: comment.name,
          title: comment.title,
          content: comment.content,
          postId: comment.postId,
        },
      })
      .then(() => dispatch(editComment(comment, cuid)))
      .then(() => dispatch(toggleAddComment()));
  };
}
