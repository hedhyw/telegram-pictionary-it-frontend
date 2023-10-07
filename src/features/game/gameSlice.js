import { createSlice } from '@reduxjs/toolkit';

export const GAME_STATE_INITIAL = 'game.StateInitial';
export const GAME_STATE_IN_PROGRESS = 'game.StateInProgress';
export const GAME_STATE_FINISHED = 'game.StateFinished';

const initialState = {
    isEstablishingConnection: false,
    value: {
        players: [],
        state: GAME_STATE_INITIAL,
        unixNano: 0,
    },
    leaderWord: null,
    lastRemoteImageUnixNano: 0,
    remoteImage: null,
};

export const gameSlice = createSlice({
    name: 'game',
    initialState,
    reducers: {
        startConnecting: (state => {
            state.isEstablishingConnection = true;
        }),
        serverDisconnected: (state => {
            state.isEstablishingConnection = false;
        }),
        sendServerMessage: (_ => { }),
        setGame: (state, action) => {
            if (state.value.unixNano < action.payload.unixNano) {
                state.value = action.payload;
            }
        },
        setRemoteImage: (state, action) => {
            if (state.lastRemoteImageUnixNano < action.payload.unixNano) {
                state.lastRemoteImageUnixNano = action.payload.unixNano;
                state.remoteImage = action.payload.imageBase64;
            }
        },
        setGameLeaderWord: (state, action) => {
            state.leaderWord = action.payload;
        },
    },
});

export const {
    startConnecting,
    sendServerMessage,
    serverDisconnected,
    setGame,
    setRemoteImage,
    setGameLeaderWord,
} = gameSlice.actions;

export const selectIsEstablishingConnection = (state) => state.game.isEstablishingConnection;

export const startGame = () => (dispatch) => {
    dispatch(sendServerMessage({
        'name': 'core.RequestEventGameStarted',
        'payload': {},
    }));
};

export const guessWord = (word) => (dispatch) => {
    dispatch(sendServerMessage({
        'name': 'core.RequestEventWordGuessAttempted',
        'payload': {
            'word': word,
        },
    }));
};

export const setCanvasImage = (imageData) => (dispatch) => {
    dispatch(sendServerMessage({
        'name': 'core.RequestEventCanvasChanged',
        'payload': {
            'imageBase64': imageData,
        },
    }));
};

export const selectGameState = (state) => state.game.value.state;
export const selectGame = (state) => state.game.value;
export const selectGamePlayers = (state) => state.game.value.players;

export const selectGameLeaderWord = (state) => state.game.leaderWord;

export const selectRemoteImage = (state) => state.game.remoteImage;

export const selectCurrentPlayer = (state) => {
    return state.game.value.players.find((player) => {
        return player.clientId === state.player.value.clientId;
    });
};


export const selectIsCurrentPlayerLead = (state) => {
    const currentPlayer = selectCurrentPlayer(state);

    return currentPlayer && currentPlayer.isLead;
};

export default gameSlice.reducer;
