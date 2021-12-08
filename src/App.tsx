import React from 'react';
import { createGlobalStyle } from 'styled-components';

import Board from './components/board';
import ModalWindow from './components/modal';

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
        <Board />
        <ModalWindow visible={isModal} title="Введите ваше имя:" onClose={onClose} />
      </div>
    </>
  );
};

export default App;
