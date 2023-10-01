import { useSelector } from 'react-redux';
import { GAME_STATE_FINISHED, GAME_STATE_INITIAL, GAME_STATE_IN_PROGRESS, selectCurrentPlayer, selectGame, selectGameLeaderWord, selectGameState, selectIsCurrentPlayerLead } from './gameSlice';

const gameStatusEmoji = {
    [GAME_STATE_INITIAL]: '☀️',
    [GAME_STATE_IN_PROGRESS]: '⌛',
    [GAME_STATE_FINISHED]: '🏁',
};

export function GameStatusEmoji() {
    const gameState = useSelector(selectGameState);

    return (<div>
        {gameStatusEmoji[gameState] ?? gameStatusEmoji[GAME_STATE_INITIAL]}
    </div>);
}

export function GameStatusWord() {
    const game = useSelector(selectGame);
    const leaderWord = useSelector(selectGameLeaderWord);
    const isCurrentPlayerLead = useSelector(selectIsCurrentPlayerLead);
    const currentPlayer = useSelector(selectCurrentPlayer);

    const shouldShowWord = isCurrentPlayerLead || currentPlayer?.roundWordMatched;

    return (<div>
        {game.state === GAME_STATE_FINISHED && <span>{game.word}</span>}
        {game.state === GAME_STATE_IN_PROGRESS && (
            <span>
                {shouldShowWord && <span>{leaderWord || game.word || game.hint}</span>}
                {!shouldShowWord && <span>{game.hint}</span>}
                <sup>{game.hint?.length}</sup>
            </span>
        )}
    </div>);
}
