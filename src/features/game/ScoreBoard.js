import { useSelector } from 'react-redux';
import { selectGamePlayers } from './gameSlice';

export function ScoreBoard() {
    const players = useSelector(selectGamePlayers);

    return (
        <ul>
            {players.map((player) => {
                return <li key={player.clientId}>{player.username}: {player.score} {player.roundScore !== 0 && <span>(+{player.roundScore})</span>}</li>;
            })}
        </ul>
    );
}