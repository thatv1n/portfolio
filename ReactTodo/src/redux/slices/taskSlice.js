import { createSlice } from '@reduxjs/toolkit';

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {
    tasks: [
      { title: 'Сходить на тренировку' },
      { title: 'Уборка дома' },
      { title: 'Учить Redux' },
      { title: 'Вывести на улицу собаку' },
    ],
  },
  reducers: {
    getTask: (state, action) => {
      state.tasks = action.payload;
    },
    addNewTask: (state, action) => {
      state.tasks = [...state.tasks, action.payload];
    },
    delTask: (state, action) => {
      state.tasks = [...state.tasks].filter((item, i) => i !== action.payload);
    },
  },
});

export const { getTask, addNewTask, delTask } = tasksSlice.actions;

export default tasksSlice.reducer;
