import { configureStore} from '@reduxjs/toolkit';
import { reducer } from './slices/rootSlices';

export const store = configureStore({
    reducer,
    devTools: true
})