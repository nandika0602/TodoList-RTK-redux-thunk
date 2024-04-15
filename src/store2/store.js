import {configureStore} from '@reduxjs/toolkit'
import todoSlice from './todoSlice';

const store2 = configureStore({
    reducer: {
        todo: todoSlice
    }
})

export default store2;