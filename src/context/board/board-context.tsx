import { createContext, useContext } from 'react';

import { initialState } from '../../store/state';

export const BoardContext = createContext([initialState]);
export const useBoardContext = () => useContext(BoardContext);
