import { FC } from 'react';
import { createGlobalStyle } from 'styled-components';

import BoardItem from './components/board';
import ModalWindow from './components/modal';
import BoardProvider from './providers/board/board-providers';

const App: FC = () => {
  return (
    <>
      <Global />
      <BoardProvider>
        <BoardItem />
        <ModalWindow />
      </BoardProvider>
    </>
  );
};

const Global = createGlobalStyle`
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
`;

export default App;
