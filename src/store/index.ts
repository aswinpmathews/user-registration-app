import { configureStore } from "@reduxjs/toolkit";
import { usersReducer } from "./slice/UserSlice";

export const store =configureStore({
    reducer:{
        user:usersReducer,
    }
})
export * from './thunks/userThunks'
export type RootState=ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;