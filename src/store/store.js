import { configureStore } from '@reduxjs/toolkit';
import candidateReducer from '../features/candidate/candidateSlice';


export const store = configureStore({
  reducer: {
   candidate:candidateReducer,
//    company:companyReducer,
  }
});
