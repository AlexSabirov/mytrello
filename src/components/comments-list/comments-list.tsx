import { Comment } from '../../types/data';
import CommentItem from '../comment-item';

interface CommentsListProps {
  items: Comment[];
  removeComment: (id: number) => void;
}

const CommentsList: React.FC<CommentsListProps> = (props) => {
  const { items, removeComment } = props;

  return (
    <div>
      {items.map((comment) => (
        <CommentItem key={comment.id} removeComment={removeComment} {...comment} />
      ))}
    </div>
  );
};

export default CommentsList;
