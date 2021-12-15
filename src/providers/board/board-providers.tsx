import { useEffect, useReducer } from 'react';

import reducer, { init, initialState } from '../../components/reducer/reducer';
import { BoardContext } from '../../context/board/board-context';

const BoardProvider: React.FC = ({ children }) => {
  const stateAndDispatch = useReducer(reducer, initialState, init);
  const [state, dispatch] = stateAndDispatch;

  useEffect(() => {
    localStorage.setItem('trello', JSON.stringify(state));
  }, [state]);

  return (
    <BoardContext.Provider value={stateAndDispatch}>{children}</BoardContext.Provider>
  );
};

export default BoardProvider;
