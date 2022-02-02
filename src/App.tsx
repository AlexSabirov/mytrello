import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { createGlobalStyle } from 'styled-components';

import BoardItem from './components/board';
import { persistor, store } from './store/store';

const App = function (): JSX.Element {
  return (
    <>
<<<<<<< HEAD
      <Global />
      <BoardProvider>
        <BoardItem />
        <ModalWindow />
      </BoardProvider>
=======
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Global />
          <BoardItem />
        </PersistGate>
      </Provider>
>>>>>>> origin/finalform
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
