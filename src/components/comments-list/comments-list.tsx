import styled from 'styled-components';

import { selectorComments } from '../../store/ducks/board/selectors';
import { useAppSelector } from '../../store/hooks/redux';
import CommentItem from '../comment-item';
interface CommentsListProps {
  columnId: string;
  cardId: string;
}

const CommentsList = function ({ columnId, cardId }: CommentsListProps): JSX.Element {
  const { comments } = useAppSelector(selectorComments(columnId, cardId));
  return (
    <CommentsListWrapper>
      {Object.values(comments).map((comment) => (
        <CommentItem
          key={comment.id}
          comment={comment}
          columnId={columnId}
          cardId={cardId}
        ></CommentItem>
      ))}
    </CommentsListWrapper>
  );
};

const CommentsListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5px;
  border: 1px solid blue;
  background-color: #f0f0f0;
  z-index: 14;
`;

export default CommentsList;
