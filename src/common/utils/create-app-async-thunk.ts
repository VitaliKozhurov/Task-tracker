import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, RootState } from 'app/model/store';
import { ResponseType } from 'common/api/api';

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
    state: RootState;
    dispatch: AppDispatch;
    rejectValue: null | RejectValueType;
}>();

export type RejectValueType = {
    data: ResponseType;
    showGlobalError: boolean;
};
