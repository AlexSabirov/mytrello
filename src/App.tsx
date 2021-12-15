import React from 'react';
import { createGlobalStyle } from 'styled-components';

import Board from './components/board';
import ModalWindow from './components/modal';
import BoardProvider from './providers/board/board-providers';

const Global = createGlobalStyle`
* {
	box-sizing: border-box;
  margin: 0;
  padding: 0;
}
`;

const App: React.FC = () => {
  const [isModal, setModal] = React.useState(true);
  const onClose = () => setModal(false);

  return (
    <>
      <Global />
      <div>
        <BoardProvider>
          <Board />
          <ModalWindow visible={isModal} title="Введите ваше имя:" onClose={onClose} />
        </BoardProvider>
      </div>
    </>
  );
};

export default App;
