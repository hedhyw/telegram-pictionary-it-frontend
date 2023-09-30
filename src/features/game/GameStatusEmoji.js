import { useSelector } from 'react-redux';
import { GAME_STATE_FINISHED, GAME_STATE_INITIAL, GAME_STATE_IN_PROGRESS, selectGameState } from './gameSlice';

const gameStatusEmoji = {
    [GAME_STATE_INITIAL]: '☀️',
    [GAME_STATE_IN_PROGRESS]: '⌛',
    [GAME_STATE_FINISHED]: '🏁',
}

export default function GameStatusEmoji() {
    const gameState = useSelector(selectGameState);

    return (<div>
        {gameStatusEmoji[gameState] ?? gameStatusEmoji[GAME_STATE_INITIAL]}
    </div>);
}
