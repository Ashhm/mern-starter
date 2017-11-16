import mongoose from 'mongoose';
const Schema = mongoose.Schema;

// Additional collection for comments,
// where postId is ID of post collection
const commentSchema = new Schema({
  name: { type: 'String', required: true },
  title: { type: 'String', required: true },
  content: { type: 'String', required: true },
  cuid: { type: 'String', required: true },
  dateAdded: { type: 'Date', default: Date.now, required: true },
  postId: { type: Schema.Types.ObjectId, ref: 'Post' },
});

export default mongoose.model('Comment', commentSchema);
