import { useSelector } from 'react-redux';
import { GAME_STATE_IN_PROGRESS, selectGame } from './gameSlice';
import { useEffect, useState } from 'react';

export function Timer() {
    const game = useSelector(selectGame);
    const finishAt = Date.parse(game.finishAt);

    const [secondsLeft, setSecondsLeft] = useState(0);

    useEffect(() => {
        const secondsLeft = (finishAt - Date.now()) / 1000;

        const intervalId = setInterval(() => {
            setSecondsLeft(secondsLeft);
        }, 250);

        // clear interval on re-render to avoid memory leaks
        return () => clearInterval(intervalId);
    }, [secondsLeft, finishAt]);

    const shouldRenderTimer = game.state === GAME_STATE_IN_PROGRESS && secondsLeft >= 0;

    return (
        <div>
            {shouldRenderTimer && <span>
                Left: {Math.round(secondsLeft)}s
            </span>}
            {!shouldRenderTimer && <span>
                --:--
            </span>}
        </div>
    );
}