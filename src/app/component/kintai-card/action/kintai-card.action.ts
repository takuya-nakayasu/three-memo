import { Action } from '@ngrx/store';

export enum ActionTypes {
  StartWork = '[KintaiCard Component] StartWork',
  EndWork = '[KintaiCard Component] EndWork',
  StartBreak = '[KintaiCard Component] StartBreak'
}

export class StartWork implements Action {
  readonly type = ActionTypes.StartWork;
}

export class EndWork implements Action {
  readonly type = ActionTypes.EndWork;
}

export class StartBreak implements Action {
  readonly type = ActionTypes.StartBreak;
}
