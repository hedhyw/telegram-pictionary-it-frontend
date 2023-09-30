import { configureStore } from '@reduxjs/toolkit'
import playerReducer from '../features/player/playerSlice';
import gameReducer from '../features/game/gameSlice';
import webSocketMiddleware from '../features/game/webSocketMiddleware';

export const store = configureStore({
    reducer: {
        player: playerReducer,
        game: gameReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(webSocketMiddleware),
    devTools: process.env.NODE_ENV !== 'production',
});
