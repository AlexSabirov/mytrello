import React, { useContext } from 'react';
import { createGlobalStyle } from 'styled-components';

import BoardItem from './components/board';
import ModalWindow from './components/modal';
import { BoardContext } from './context/board/board-context';
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
  const [state] = useContext(BoardContext);

  return (
    <>
      <Global />
      <div>
        <BoardProvider>
          <BoardItem user={state.user} columns={state.columns} />
          <ModalWindow visible={isModal} onClose={onClose} />
        </BoardProvider>
      </div>
    </>
  );
};

export default App;
