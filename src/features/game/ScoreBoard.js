import { useSelector } from 'react-redux';
import { selectCurrentPlayer, selectGamePlayers } from './gameSlice';
import './ScoreBoard.css';

export function ScoreBoard() {
    const players = [...useSelector(selectGamePlayers)];
    const currentPlayer = useSelector(selectCurrentPlayer);

    const isPlayerCurrent = (player) => player?.clientId === currentPlayer?.clientId;

    players.sort((left, right) => (isPlayerCurrent(left) ? -1 : left.username.localeCompare(right.username)));

    return (
        <table class="ScoreBoard">
            <thead>
                <tr>
                    <th>Player</th>
                    <th>Score</th>
                </tr>
            </thead>
            <tbody>
                {players.map((player) => {
                    return <tr
                        key={player.clientId}
                        class={isPlayerCurrent(player) ? 'ScoreBoard-currentPlayer' : ''}>
                        <td>{player.username}<sup class="ScoreBoard-you"> (you)</sup></td>
                        <td>{player.score} {player.roundScore !== 0 && <span>(+{player.roundScore})</span>}</td>
                    </tr>
                })}
            </tbody>
        </table>
    );
}
