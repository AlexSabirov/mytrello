import { FC } from 'react';
import { createGlobalStyle } from 'styled-components';

import BoardItem from './components/board';
import ModalWindow from './components/modal';
import BoardProvider from './providers/board/board-providers';

const App: FC = () => {
  return (
    <>
      <Global />
      <div>
        <BoardProvider>
          <BoardItem />
          <ModalWindow />
        </BoardProvider>
      </div>
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
