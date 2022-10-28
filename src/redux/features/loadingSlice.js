import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: false,
    changes: false
}

const loadingSlice = createSlice({
    name: 'loading',
    initialState,
    reducers: {
        changeLoading: (state, action) => {
            state.value = action.payload
        },
        changeChanges: (state, action) => {
            state.changes = action.payload
        }
    }
})

export const { changeLoading, changeChanges } = loadingSlice.actions

export default loadingSlice.reducer