import { FC } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { createGlobalStyle } from 'styled-components';

import BoardItem from './components/board';
import ModalWindow from './components/modal';
import { persistor, store } from './redux/store/store';

const App: FC = () => {
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Global />
          <BoardItem />
          <ModalWindow />
        </PersistGate>
      </Provider>
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
