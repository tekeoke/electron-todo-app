import { ITask } from '../components/types';

// window オブジェクトに、coreがあることを定義する
export default interface ICore {
  loadTaskList: () => Promise<ITask[]>;
  saveTask: (task: ITask) => Promise<ITask[]>;
  deleteTask: (taskId: number) => Promise<ITask[]>;
}
// window オブジェクトに、core の定義を追加する。
declare global {
  interface Window {
    core: ICore;
  }
}
