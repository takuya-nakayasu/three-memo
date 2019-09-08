import { Action } from '@ngrx/store';
import { ActionTypes } from '../action/kintai-card.action';

export const initialState = 0;

export function kintaiCardReducer(state = initialState, action: Action) {
  switch (action.type) {
    case ActionTypes.StartWork:
      return state + 1;

    case ActionTypes.EndWork:
      return state - 1;

    case ActionTypes.StartBreak:
      return 0;

    default:
      return state;
  }
}
