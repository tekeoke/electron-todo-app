// Userの名前とカウントを管理する
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Dispatch } from 'redux';

import { RootState } from '../../app/store';
import { ITask, IState } from '../types';
import '../../core/ICore';

const initialState: IState = {
  count: 0,
  taskList: {
    tasks: [],
    loading: false,
    failedMessage: '',
  },
};

export const getTaskList = createAsyncThunk('local/load', async () => {
  const taskList: ITask[] = await window.core.loadTaskList();
  return taskList;
});

export const addTask = createAsyncThunk('local/add', async (task: ITask) => {
  const taskList: ITask[] = await window.core.saveTask(task);
  console.log('task:' + JSON.stringify(task));
  return taskList;
});

export const toggleTask = createAsyncThunk(
  'local/toggle',
  async (task: ITask) => {
    task.completed = !task.completed;
    const taskList: ITask[] = await window.core.saveTask(task);
    return taskList;
  },
);

export const deleteTask = createAsyncThunk(
  'local/delete',
  async (taskId: number) => {
    const taskList: ITask[] = await window.core.deleteTask(taskId);
    return taskList;
  },
);

export const taskSlice = createSlice({
  name: 'tasklist',
  initialState,
  reducers: {
    /* addTask(state, action) {
      state.count++;
      const newTask: ITask = {
        id: state.count,
        taskName: action.payload.taskName,
        deadline: action.payload.deadline,
        completed: false,
      };
      state.taskList.tasks = [newTask, ...state.taskList.tasks];
    },
    deleteTask(state, action) {
      state.taskList.tasks = state.taskList.tasks.filter(
        t => t.id !== action.payload,
      );
    },
    toggleCompleteTask(state, action) {
      const task = state.taskList.tasks.find(t => t.id === action.payload);
      if (task) {
        task.completed = !task.completed;
      }
    },*/
  },
  extraReducers: builder => {
    builder.addCase(getTaskList.pending, (state, action) => {
      state.taskList.loading = true;
    });
    builder.addCase(getTaskList.fulfilled, (state, action) => {
      state.taskList.loading = false;
      state.taskList.tasks = action.payload;
    });
    builder.addCase(getTaskList.rejected, (state, action) => {
      state.taskList.failedMessage = 'ファイルの読み込みに失敗しました。';
      state.taskList.loading = false;
    });
    builder.addCase(addTask.pending, (state, action) => {
      state.taskList.loading = true;
    });
    builder.addCase(addTask.fulfilled, (state, action) => {
      state.count++;
      state.taskList.loading = false;
      state.taskList.tasks = action.payload;
    });
    builder.addCase(addTask.rejected, (state, action) => {
      state.taskList.failedMessage = 'ファイルの書き込みに失敗しました。';
      state.taskList.loading = false;
    });
    builder.addCase(toggleTask.pending, (state, action) => {
      state.taskList.loading = true;
    });
    builder.addCase(toggleTask.fulfilled, (state, action) => {
      state.taskList.loading = false;
      state.taskList.tasks = action.payload;
    });
    builder.addCase(toggleTask.rejected, (state, action) => {
      state.taskList.failedMessage = 'ファイルの書き込みに失敗しました。';
      state.taskList.loading = false;
    });
    builder.addCase(deleteTask.pending, (state, action) => {
      state.taskList.loading = true;
    });
    builder.addCase(deleteTask.fulfilled, (state, action) => {
      state.taskList.loading = false;
      state.taskList.tasks = action.payload;
    });
    builder.addCase(deleteTask.rejected, (state, action) => {
      state.taskList.failedMessage = 'ファイルの書き込みに失敗しました。';
      state.taskList.loading = false;
    });
  },
});

export const {} = taskSlice.actions;

export const selectTaskList = (state: RootState) => state.tasks;

export default taskSlice.reducer;
