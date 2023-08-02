import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from 'app/store';
import { ResponseType } from 'common/api/api';

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
    state: RootState;
    dispatch: AppDispatch;
    rejectValue: null | ResponseType;
}>();
