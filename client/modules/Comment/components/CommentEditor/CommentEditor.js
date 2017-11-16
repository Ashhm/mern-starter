import React, { PropTypes } from 'react';

// Import Style
import styles from './CommentEditor.css';

class CommentEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      name: '',
      content: '',
      cuid: null,
    };
  }

  // for editing need to get props.comment from parent
  componentWillReceiveProps(nextProps) {
    if (nextProps.comment) {
      this.setState(() => {
        return nextProps.comment;
      });
    }
  }

  handleSubmit = e => {
    e.preventDefault();
    const { name, title, content } = this.state;
    if (!this.props.editing) {
      this.props.handlerAddComment(name, title, content);
    } else {
      this.props.handleEditComment({ name, title, content, cuid: this.state.cuid });
    }
    this.props.handleEditCommentCancel();
  };

  handleCancel = e => {
    e.preventDefault();
    this.setState(() => {
      return {
        title: '',
        name: '',
        content: '',
      };
    });
    this.props.handleEditCommentCancel();
  };

  handleInputChange = e => {
    const value = e.target.value;
    const name = e.target.name;
    this.setState({
      [name]: value,
    });
  };

  render() {
    const editing = this.props.editing;
    const { title, content, name } = this.state;
    return (
      <form className={styles['comment-editor-container']} onSubmit={this.handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Enter your name"
          value={name}
          onChange={this.handleInputChange}
        />
        <input
          type="text"
          name="title"
          placeholder="Enter title"
          value={title}
          onChange={this.handleInputChange}
        />
        <textarea
          name="content"
          placeholder="Enter comment text"
          rows="5"
          value={content}
          onChange={this.handleInputChange}
        />
        <div className={styles['editor-actions-container']}>
          <button
            disabled={!name || !title || !content}
            hidden={editing}
          >
            Add
          </button>
          <button
            disabled={!name || !title || !content}
            hidden={!editing}
          >
            Edit
          </button>
          <button
            onClick={this.handleCancel}
            hidden={!editing}
          >
            Cancel
          </button>
        </div>
      </form>
    );
  }
}

CommentEditor.propTypes = {
  editing: PropTypes.bool,
  handleEditCommentCancel: PropTypes.func.isRequired,
  handleEditComment: PropTypes.func.isRequired,
  handlerAddComment: PropTypes.func.isRequired,
};

export default CommentEditor;
