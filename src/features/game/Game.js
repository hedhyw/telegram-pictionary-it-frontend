import { SwitchTransition, CSSTransition } from 'react-transition-group';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import {
    GAME_STATE_INITIAL,
    GAME_STATE_IN_PROGRESS,
    selectGamePlayers,
    selectGameState,
    selectIsCurrentPlayerLead,
    startConnecting,
    startGame,
} from './gameSlice';
import { Player } from '../player/Player';
import { LeaderCanvas } from './LeaderCanvas';
import GuesserCanvas from './GuesserCanvas';
import { ScoreBoard } from './ScoreBoard';
import { Timer } from './Timer';
import Button from '../../common/Button';
import './Game.css';
import { GameStatusEmoji, GameStatusWord } from './GameStatus';
import addEndListener from '../../common/transition';

export function Game() {
    const dispatch = useDispatch();
    const gameState = useSelector(selectGameState);
    const gamePlayers = useSelector(selectGamePlayers);
    const isCurrentPlayerLead = useSelector(selectIsCurrentPlayerLead);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => dispatch(startConnecting()), []);

    return (
        <div className="Game">
            <div className="Game-header">
                {gameState === GAME_STATE_INITIAL && <Player />}
                <GameStatusWord />
                <GameStatusEmoji />
                <Timer />
            </div>
            <SwitchTransition mode="out-in">
                <CSSTransition
                    key={gameState}
                    addEndListener={addEndListener}
                    classNames="fade">
                    <div className="Game-board">
                        {gameState === GAME_STATE_IN_PROGRESS && isCurrentPlayerLead && <LeaderCanvas />}
                        {gameState === GAME_STATE_IN_PROGRESS && !isCurrentPlayerLead && <GuesserCanvas />}
                        {gameState !== GAME_STATE_IN_PROGRESS && <ScoreBoard />}
                    </div>
                </CSSTransition>
            </SwitchTransition>
            <div className="Game-footer">
                {gameState !== GAME_STATE_IN_PROGRESS && gamePlayers.length >= 2 &&
                    <Button onClick={() => dispatch(startGame())} name="Start" title="Start the game" />
                }
                {gameState !== GAME_STATE_IN_PROGRESS && gamePlayers.length === 1 &&
                    <p>Waiting for more players to join.<br />Please, ask group members to open the link.</p>
                }
            </div>
        </div >
    );
}
