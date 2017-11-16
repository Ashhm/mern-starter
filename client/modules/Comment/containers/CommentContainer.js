import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

// Import Components
import CommentList from '../components/CommentList/CommentList';
import CommentEditor from '../components/CommentEditor/CommentEditor';


// Import Actions
import {
  addCommentRequest,
  fetchComments,
  deleteCommentRequest,
  editCommentRequest,
} from '../CommentActions';


// Import comments selector
import { getComments } from '../CommentReducer';

class CommentListPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      comment: {
        name: '',
        title: '',
        content: '',
        cuid: null,
      },
    };
  }

  componentDidMount() {
    this.props.dispatch(fetchComments(this.props.postId));
  }

  handleDeleteComment = comment => {
    if (confirm('Do you want to delete this comment')) { // eslint-disable-line
      this.props.dispatch(deleteCommentRequest(comment.cuid));
    }
  };

  handleEditComment = comment => {
    this.props.dispatch(editCommentRequest(comment, comment.cuid));
    this.setState(() => {
      return {
        comment: {
          title: '',
          content: '',
          name: '',
          cuid: null,
        },
      };
    });
  };

  handleEditCommentInit = comment => {
    this.setState(() => {
      return {
        isEditing: true,
        comment,
      };
    });
  };

  handleEditCommentCancel = () => {
    this.setState(() => {
      return {
        isEditing: false,
        comment: {
          name: '',
          title: '',
          content: '',
          cuid: null,
        },
      };
    });
  };

  handleAddComment = (name, title, content) => {
    this.props.dispatch(
      addCommentRequest({ name, title, content, postId: this.props.postId })
    );
  };

  render() {
    return (
      <div>
        <CommentList
          comments={this.props.comments}
          handleDeleteComment={this.handleDeleteComment}
          handleEditCommentInit={this.handleEditCommentInit}
        />
        <CommentEditor
          editing={this.state.isEditing}
          comment={this.state.comment}
          handlerAddComment={this.handleAddComment}
          handleEditComment={this.handleEditComment}
          handleEditCommentCancel={this.handleEditCommentCancel}
        />
      </div>
    );
  }
}

// Retrieve data from store as props
function mapStateToProps(state, props) {
  return {
    comments: getComments(state, props.postId),
  };
}

CommentListPage.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
  })).isRequired,
  postId: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
};

CommentListPage.defaultProps = {
  comments: [],
};

export default connect(mapStateToProps)(CommentListPage);
