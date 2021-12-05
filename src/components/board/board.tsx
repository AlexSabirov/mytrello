import React, { useState } from 'react';

import { Card } from '../../types/data';
import CardList from '../card-list';

const Board = () => {
  const [value, setValue] = useState('');
  const [cards, setCards] = useState<Card[]>([]);

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'Enter') addCard();
  };

  const addCard = () => {
    if (value) {
      setCards([
        ...cards,
        {
          idCard: Date.now(),
          titleCard: value,
        },
      ]);
      setValue('');
    }
  };

  const removeCard = (id: number): void => {
    setCards(cards.filter((card) => card.idCard !== id));
  };

  return (
    <div>
      <CardList items={cards} removeCard={removeCard} />
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button onClick={addCard}>Add Card</button>
    </div>
  );
};

export default Board;
