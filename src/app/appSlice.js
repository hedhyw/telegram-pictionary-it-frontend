import { createSlice } from '@reduxjs/toolkit';

export const GAME_STATE_INITIAL = 'game.StateInitial';
export const GAME_STATE_IN_PROGRESS = 'game.StateInProgress';
export const GAME_STATE_FINISHED = 'game.StateFinished';

export const THEME_DARK = 'dark';
export const THEME_LIGHT = 'light';

const initialState = {
    theme: window.Telegram?.WebApp?.colorScheme,
};

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setTheme: (state, action) => {
            state.theme = action.payload;
        },
    },
});

export const { setTheme } = appSlice.actions;
export const selectTheme = (state) => state.app.theme;

export default appSlice.reducer;
