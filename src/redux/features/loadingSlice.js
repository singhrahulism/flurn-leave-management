import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: false,
    changes: true,
    action: false
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
        },
        changeAction: (state, action) => {
            state.action = action.payload
        }
    }
})

export const { changeLoading, changeChanges, changeAction } = loadingSlice.actions

export default loadingSlice.reducer