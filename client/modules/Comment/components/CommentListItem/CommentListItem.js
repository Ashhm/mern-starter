import React, { PropTypes } from 'react';

// Import Style
import styles from './CommentListItem.css';

function CommentListItem(props) {
  const { comment, onDelete, onEdit } = props;
  return (
    <div className={styles['single-comment-container']}>
      <div className={styles['content-comment-container']}>
        <h4>{comment.title}</h4>
        <p className={styles['author-name-container']}>By {comment.name}</p>
        <p className={styles['content-container']}>{comment.content}</p>
      </div>
      <div className={styles['action-container']}>
        <div onClick={onDelete.bind(null, comment)}>&times;</div>
        <div onClick={onEdit.bind(null, comment)}>&#10000;</div>
      </div>
    </div>
  );
}

CommentListItem.propTypes = {
  comment: PropTypes.shape({
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};

export default CommentListItem;
