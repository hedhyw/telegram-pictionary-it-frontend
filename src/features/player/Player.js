import { useSelector } from 'react-redux';
import { selectPlayer } from './playerSlice';

export function Player() {
    const player = useSelector(selectPlayer);

    return (
        <div>
            Your username: {player.username}
        </div>
    );
}