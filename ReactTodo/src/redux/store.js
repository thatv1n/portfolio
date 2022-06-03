import { configureStore, combineReducers } from '@reduxjs/toolkit';
import taskSlice from './slices/taskSlice';

const rootReducer = combineReducers({
  taskSlice: taskSlice,
});
const store = configureStore({
  reducer: rootReducer,
});

export default store;
