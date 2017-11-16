import Comment from '../models/comment';
import cuid from 'cuid';
import sanitizeHtml from 'sanitize-html';

// Add comment handler
export async function addComment(req, res) {
  if (!req.body.comment.name
    || !req.body.comment.title
    || !req.body.comment.postId
    || !req.body.comment.content
  ) {
    res.status(403).end();
  }

  const newComment = new Comment(req.body.comment);

  // Sanitize html
  newComment.title = sanitizeHtml(newComment.title);
  newComment.name = sanitizeHtml(newComment.name);
  newComment.content = sanitizeHtml(newComment.content);
  newComment.postId = sanitizeHtml(newComment.postId);

  newComment.cuid = cuid();

  try {
    var comments = await newComment.save(); // eslint-disable-line
  } catch (err) {
    res.status(500).send(err);
  }
  res.json({ comments }); // eslint-disable-line
}

// Fetch comments by postID
export async function getComment(req, res) {
  const postId = req.params.postId;

  try {
    var comments = await Comment.find({ postId }).sort('-dateAdded').exec(); // eslint-disable-line
  } catch (err) {
    res.status(500).send(err);
  }

  res.json({ comments }); // eslint-disable-line
}

// Edit comment handler
export async function editComment(req, res) {
  if (!req.body.comment) {
    res.status(403).end();
  }

  const { cuid } = req.params; // eslint-disable-line

  try {
    var comment = await Comment.findOne({ cuid }).exec(); // eslint-disable-line
    await Comment.update(comment, { $set: req.body.comment });
  } catch (err) {
    res.status(500).send(err);
  }

  res.send({ comment }); // eslint-disable-line
}

// Delete comment by post_cuid
export async function deleteComment(req, res) {
  const { cuid } = req.params; // eslint-disable-line

  try {
    var comment = await Comment.findOne({ cuid }).exec(); // eslint-disable-line
    await comment.remove();
  } catch (err) {
    res.status(500).send(err);
  }

  res.status(200).end();
}

