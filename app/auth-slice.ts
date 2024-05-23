import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface UserName {
    firstName: string;
    lastName: string;
}

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        firstName: '',
        lastName: ''
    },
    reducers: {
        setName: (state, action: PayloadAction<UserName>) => {
            // return { ...action.payload }
            return {
                firstName: action.payload.firstName,
                lastName: action.payload.lastName
            }
        }
    }
});

export const { setName } = authSlice.actions;
export const AuthReducer = authSlice.reducer;