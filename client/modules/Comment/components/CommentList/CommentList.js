import React, { PropTypes } from 'react';

// Import components
import CommentListItem from '../CommentListItem/CommentListItem';

// Import Style
import styles from './CommentList.css';

function CommentList(props) {
  const { comments, handleDeleteComment, handleEditCommentInit } = props;
  return (
    <div className={styles['comment-container']}>
      {comments.map(comment => {
        return (
          <CommentListItem
            key={comment.cuid}
            comment={comment}
            onDelete={handleDeleteComment}
            onEdit={handleEditCommentInit}
          />);
      })}
    </div>
  );
}

CommentList.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
  })).isRequired,
  handleDeleteComment: PropTypes.func.isRequired,
  handleEditCommentInit: PropTypes.func.isRequired,
};

export default CommentList;
