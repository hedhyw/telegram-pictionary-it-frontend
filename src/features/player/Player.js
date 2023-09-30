import { useSelector } from 'react-redux';
import { selectPlayer } from './playerSlice';
import { 
    GAME_STATE_FINISHED,
    GAME_STATE_INITIAL,
    GAME_STATE_IN_PROGRESS,
    selectGameState,
} from '../game/gameSlice';
import './Player.css';

export function Player() {
    const player = useSelector(selectPlayer);
    const gameState = useSelector(selectGameState);

    const playerLabelByStatus = {
        [GAME_STATE_INITIAL]: 'Welcome',
        [GAME_STATE_IN_PROGRESS]: 'Let\'s play',
        [GAME_STATE_FINISHED]: 'Game over',
    }

    return (
        <div class="Player">
            {playerLabelByStatus[gameState] ?? playerLabelByStatus[GAME_STATE_INITIAL]}, {player.username}
        </div>
    );
}