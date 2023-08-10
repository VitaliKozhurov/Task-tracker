import { AppDispatch, RootState } from 'app/model/store';
import { BaseThunkAPI } from '@reduxjs/toolkit/dist/createAsyncThunk';
import { handleNetworkAppError } from 'common/utils/handle-network-app-error';
import { ResponseType } from 'common/api/api';

export const thunkTryCatch = async <T>(
    thunkAPI: BaseThunkAPI<RootState, any, AppDispatch, null | ResponseType>,
    logic: () => Promise<T>,
): Promise<T | ReturnType<typeof thunkAPI.rejectWithValue>> => {
    const { dispatch, rejectWithValue } = thunkAPI;
    try {
        return await logic();
    } catch (e) {
        handleNetworkAppError(e, dispatch);
        return rejectWithValue(null);
    }
};
