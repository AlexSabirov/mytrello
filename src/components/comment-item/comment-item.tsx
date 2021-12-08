import { Comment } from '../../types/data';

interface CommentItemProps extends Comment {
  removeComment: (id: number) => void;
}

const CommentItem: React.FC<CommentItemProps> = (props) => {
  const { id, userName, comment, removeComment } = props;
  return (
    <div>
      <div>{userName}</div>
      <div>{comment}</div>
      <button onClick={() => removeComment(id)}>X</button>
    </div>
  );
};

export default CommentItem;
