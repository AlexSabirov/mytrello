import { createContext, useContext } from 'react';

import { BoardAction } from '../../store/actions-type';
import { initialState } from '../../store/state';
import { Board } from '../../types/data';

export const BoardContext = createContext<ContextType>([initialState, () => {}]);
export const useBoardContext = () => useContext(BoardContext);

type ContextType = [Board, React.Dispatch<BoardAction>];
