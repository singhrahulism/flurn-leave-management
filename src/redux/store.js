import { configureStore } from "@reduxjs/toolkit";
import loadingReducer from './features/loadingSlice'
import supabaseReducer from './features/supabaseSlice'

export default configureStore({
    reducer: {
        loading: loadingReducer,
        supabase: supabaseReducer
    },
    middleware: (getDefaultMiddleware => getDefaultMiddleware({
        serializableCheck: false
    }))
})