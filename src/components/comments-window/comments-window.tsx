import React, { useState } from 'react';
import styled from 'styled-components';

import { Comment } from '../../types/data';
import { Modal } from '../../types/data';
import CommentsList from '../comments-list';

const ModalWindowWrapper = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalWindowContent = styled.div`
  padding: 20px;
  border: 1px solid #000000;
  border-radius: 3px;
  background-color: gray;
`;

interface CommentsWindowProps extends Comment, Modal {
  removeComment: (id: number) => void;
}

const CommentsWindow: React.FC<CommentsWindowProps> = (props) => {
  const { visible = false, title = '', onClose } = props;
  const [value, setValue] = useState('');
  const [comments, setComments] = useState<Comment[]>([]);

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'Enter') addComment();
  };

  const addComment = () => {
    if (value) {
      setComments([
        ...comments,
        {
          id: Date.now(),
          userName: 'Гость',
          comment: value,
        },
      ]);
      setValue('');
    }
  };

  const removeComment = (id: number): void => {
    setComments(comments.filter((comment) => comment.id !== id));
  };

  const onKeydown = ({ key }: KeyboardEvent) => {
    switch (key) {
      case 'Escape':
        onClose();
        break;
    }
  };

  React.useEffect(() => {
    document.addEventListener('keydown', onKeydown);
    return () => document.removeEventListener('keydown', onKeydown);
  });

  if (!visible) return null;

  return (
    <ModalWindowWrapper onClick={onClose}>
      <ModalWindowContent onClick={(e) => e.stopPropagation()}>
        <h3>{title}</h3>
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button onClick={addComment}>Добавить</button>
        <div onClick={onClose}>X</div>
        <CommentsList items={comments} removeComment={removeComment} />
      </ModalWindowContent>
    </ModalWindowWrapper>
  );
};

export default CommentsWindow;
