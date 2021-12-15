import { createContext, useContext } from 'react';

import { initialState } from '../../components/board/board';

export const BoardContext = createContext([initialState, () => {}]);
export const useBoardContext = () => useContext(BoardContext);
