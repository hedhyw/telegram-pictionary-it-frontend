import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: {
        username: 'loading...',
    },
};

export const playerSlice = createSlice({
    name: 'player',
    initialState,
    reducers: {
        setPlayer: (state, action) => {
            state.value = action.payload;
        },
    },
});

export const { setPlayer } = playerSlice.actions;
export const selectPlayer = (state) => state.player.value;

export default playerSlice.reducer;
