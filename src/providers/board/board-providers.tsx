import { useEffect, useReducer } from 'react';

import { BoardContext } from '../../context/board/board-context';
import { init } from '../../store/init';
import reducer from '../../store/reducer';
import { initialState } from '../../store/state';

const BoardProvider: React.FC = ({ children }) => {
  const stateAndDispatch = useReducer(reducer, initialState, init);
  const [state] = stateAndDispatch;

  useEffect(() => {
    localStorage.setItem('trello', JSON.stringify(state));
  }, [state]);

  return (
    <BoardContext.Provider value={stateAndDispatch}>{children}</BoardContext.Provider>
  );
};

export default BoardProvider;
