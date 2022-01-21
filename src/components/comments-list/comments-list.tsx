import { FC } from 'react';
import styled from 'styled-components';

import { useAppSelector } from '../../redux/hooks/redux';
import CommentItem from '../comment-item';
interface CommentsListProps {
  columnId: string;
  cardId: string;
}

const CommentsList: FC<CommentsListProps> = ({ columnId, cardId }) => {
  const { comments } = useAppSelector(
    (state) => state.boardSlice.columns[columnId].cards[cardId],
  );
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
`;

export default CommentsList;
