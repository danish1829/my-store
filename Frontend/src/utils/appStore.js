import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice';
import clothesReducer from './clothSlice';

const appStore = configureStore({
    reducer : {
        user : userReducer,
        clothes : clothesReducer
    }
})

export default appStore;