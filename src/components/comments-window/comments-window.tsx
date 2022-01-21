import { FC, useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';

import { useAppDispatch } from '../../redux/hooks/redux';
import { boardSlice } from '../../redux/store/reducers/board-reducer';
import { Modal } from '../../types/data';
import CommentsList from '../comments-list';

interface CommentsWindowProps extends Modal {
  columnId: string;
  cardId: string;
}

const CommentsWindow: FC<CommentsWindowProps> = ({
  columnId,
  cardId,
  visible = false,
  onClose,
}) => {
  const dispatch = useAppDispatch();
  const { addComment } = boardSlice.actions;
  const [value, setValue] = useState('');

  const addCommentFunction = useCallback(() => {
    dispatch(addComment({ title: value, columnId, cardId }));
  }, [dispatch, addComment, value, columnId, cardId]);

  const clearInput = () => setValue('');

  const addCommentAndClearInput = () => {
    if (value === '') return;
    addCommentFunction();
    clearInput();
  };

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'Enter') {
      addCommentAndClearInput();
    }
  };

  const onKeydown = ({ key }: KeyboardEvent) => {
    switch (key) {
      case 'Escape':
        onClose();
        break;
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', onKeydown);
    return () => document.removeEventListener('keydown', onKeydown);
  });

  return !visible ? null : (
    <ModalWindowWrapper onClick={onClose}>
      <ModalWindowContent onClick={(e) => e.stopPropagation()}>
        <CommentInputWrapper>
          <p>Ваш комментарий:</p>
          <CommentInput
            value={value}
            onChange={(e) => setValue(() => e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <CommentButton onClick={addCommentAndClearInput}>+</CommentButton>
        </CommentInputWrapper>
        <CommentWindowCloseButton onClick={onClose}>X</CommentWindowCloseButton>
        <CommentsList columnId={columnId} cardId={cardId} />
      </ModalWindowContent>
    </ModalWindowWrapper>
  );
};

const ModalWindowWrapper = styled.div`
  position: fixed;
  z-index: 10;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(255, 255, 255, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalWindowContent = styled.div`
  min-width: 360px;
  position: relative;
  padding: 20px;
  border: 1px solid #000000;
  border-radius: 3px;
  background-color: gray;
`;

const CommentWindowCloseButton = styled.button`
  position: absolute;
  top: 3px;
  right: 20px;
  font-size: 20px;
  color: red;
  border: none;
  background: none;
  cursor: pointer;
`;

const CommentInputWrapper = styled.div`
  display: flex;
  padding-top: 10px;
`;

const CommentInput = styled.input`
  width: 80%;
  height: 40px;
`;

const CommentButton = styled.button`
  width: 20%;
  font-size: 20px;
  border-radius: 3px;
  background: rgb(79, 79, 211);
  color: #ffffff;
  border: 1px solid white;
  &:hover {
    opacity: 0.9;
  }
`;

export default CommentsWindow;
