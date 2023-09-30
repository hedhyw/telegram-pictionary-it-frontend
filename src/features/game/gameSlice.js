import { createSlice } from '@reduxjs/toolkit';

export const GAME_STATE_INITIAL = 'game.stateInitial';
export const GAME_STATE_IN_PROGRESS = 'game.stateInProgress';

const initialState = {
    isEstablishingConnection: false,
    value: {
        players: [],
        state: GAME_STATE_INITIAL,
    },
    leaderWord: null,
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
            state.value = action.payload
        },
        setRemoteImage: (state, action) => {
            state.remoteImage = action.payload
        },
        setGameLeaderWord: (state, action) => {
            state.leaderWord = action.payload
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
}

export const guessWord = (word) => (dispatch) => {
    dispatch(sendServerMessage({
        'name': 'core.RequestEventWordGuessAttempted',
        'payload': {
            'word': word,
        },
    }));
}

export const setCanvasImage = (image) => (dispatch) => {
    dispatch(sendServerMessage({
        'name': 'core.RequestEventCanvasChanged',
        'payload': {
            'imageBase64': image,
        },
    }));
}

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
