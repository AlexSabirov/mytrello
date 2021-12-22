import { Board } from '../types/data';

export function init(initialState: Board) {
  localStorage.setItem('trello', JSON.stringify(initialState));
  const state = JSON.parse(localStorage.getItem('trello') || '');
  try {
    return state;
  } catch (err) {
    localStorage.removeItem('trello');
    return initialState;
  }
}
