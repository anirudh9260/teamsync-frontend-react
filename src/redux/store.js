import { configureStore } from '@reduxjs/toolkit'
import { rootReducer } from './reducer/index'

const store = configureStore({
    reducer: rootReducer,
    // resolved non serializable value issue in axios headers
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
})

export default store
