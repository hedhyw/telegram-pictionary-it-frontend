import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react';
import {
    GAME_STATE_IN_PROGRESS,
    selectGamePlayers,
    selectGameState,
    selectIsCurrentPlayerLead,
    startConnecting,
    startGame,
} from './gameSlice';
import { Player } from '../player/Player';
import { LeaderCanvas } from './LeaderCanvas';
import { GuesserCanvas } from './GuesserCanvas';
import { ScoreBoard } from './ScoreBoard';
import { Timer } from './Timer';

export function Game() {
    const dispatch = useDispatch();
    const gameState = useSelector(selectGameState);
    const gamePlayers = useSelector(selectGamePlayers);
    const isCurrentPlayerLead = useSelector(selectIsCurrentPlayerLead);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => dispatch(startConnecting()), []);

    return (
        <div>
            <Player />
            <Timer />
            {gameState}
            {gameState === GAME_STATE_IN_PROGRESS && isCurrentPlayerLead && <LeaderCanvas />}
            {gameState === GAME_STATE_IN_PROGRESS && !isCurrentPlayerLead && <GuesserCanvas />}
            {gameState !== GAME_STATE_IN_PROGRESS && <ScoreBoard />}
            {gameState !== GAME_STATE_IN_PROGRESS && gamePlayers.length >= 2 &&
                <button onClick={() => dispatch(startGame())} >Start</button>
            }
        </div>
    );
}
