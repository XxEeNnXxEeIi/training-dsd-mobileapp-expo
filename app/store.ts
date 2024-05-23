import { configureStore } from '@reduxjs/toolkit';
import { AuthReducer} from './auth-slice'

export const store = configureStore({
    reducer: {
        auth: AuthReducer
    }
});