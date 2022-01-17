import { Board } from '../types/data';

export function init(initialState: Board) {
  try {
    const state = JSON.parse(localStorage.getItem('trello') || '');
    return state;
  } catch (err) {
    localStorage.removeItem('trello');
    localStorage.setItem('trello', JSON.stringify(initialState));
    return initialState;
  }
}
