import { v4 as uuidv4 } from 'uuid';

import { setPlayer } from '../player/playerSlice';
import {
    sendServerMessage,
    serverDisconnected,
    setGame,
    setGameLeaderWord,
    setRemoteImage,
    startConnecting,
} from './gameSlice';

function _handleWebSocketEvent(store, name, payload) {
    switch (name) {
        case 'game.ResponseEventLeadHello':
            store.dispatch(setGameLeaderWord(payload.word));

            break;
        case 'game.ResponseEventPlayerHello':
            store.dispatch(setPlayer(payload.player));

            break;
        case 'game.ResponseEventGameStateChanged':
            store.dispatch(setGame(payload));

            break;
        case 'game.ResponseEventCanvasChanged':
            store.dispatch(setRemoteImage(payload));

            break;
        case 'game.ResponseEventPlayerGuessFailed':
            console.log('todo: show notification on guess failed');

            break;
        default:
            break;
    }
}

const webSocketMiddleware = store => {
    let socket = null;

    return next => action => {
        const onOpen = _ => (event) => {
            console.log('websocket connected', event.target.url);

            const initData = window?.Telegram?.WebApp?.initData;

            if (initData) {
                store.dispatch(sendServerMessage({
                    'name': 'core.RequestEventPlayerInitialized',
                    'payload': {
                        'initDataRaw': window.Telegram.WebApp.initData,
                    },
                }));
            } else {
                console.warn('init data is unavailable');
            }
        };

        const onClose = store => () => {
            console.log('websocket disconnected');

            store.dispatch(serverDisconnected());
        };

        const onMessage = _ => (event) => {
            const parsedData = JSON.parse(event.data);

            console.log('received websocket message:', parsedData);

            _handleWebSocketEvent(store, parsedData.name, parsedData.payload);
        };

        if (startConnecting.match(action) && (socket === null || socket.readyState === WebSocket.CLOSED)) {
            if (socket !== null) {
                socket.close();
            }

            const clientId = uuidv4();

            socket = new WebSocket(process.env.REACT_APP_API_URL + '?client_id=' + clientId);

            socket.onmessage = onMessage(store);
            socket.onclose = onClose(store);
            socket.onopen = onOpen(store);
        }

        if (serverDisconnected.match(action)) {
            setTimeout(()=> {
                store.dispatch(startConnecting());
            }, 500); 
        }

        if (sendServerMessage.match(action)) {
            console.log('sending websocket message:', action.payload);

            if (socket != null) {
                socket.send(JSON.stringify(action.payload));
            }
        }

        next(action);
    };
};

export default webSocketMiddleware;
