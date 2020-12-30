export interface IUSERPROP {
  name: string;
  count: number;
}

export interface ITask {
  id: number;
  taskName: string;
  deadline: string;
  completed: boolean;
}

export interface ITaskList {
  tasks: ITask[];
  /** スキナーの表示 */
  loading: boolean;
  /** 失敗時のメッセージ */
  failedMessage: string;
}

export interface IState {
  count: number;
  taskList: ITaskList;
}
