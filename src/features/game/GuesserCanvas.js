import { useDispatch, useSelector } from 'react-redux';
import React, { useState } from 'react';
import { guessWord, selectCurrentPlayer, selectRemoteImage } from './gameSlice';
import './GuesserCanvas.css';
import Button from '../../common/Button';
import { useEffect } from 'react';
import { THEME_DARK, selectTheme } from '../../app/appSlice';

export default function GuesserCanvas() {
    const isThemeDark = useSelector(selectTheme) === THEME_DARK;

    const dispatch = useDispatch();
    const currentPlayer = useSelector(selectCurrentPlayer);
    const remoteImage = useSelector(selectRemoteImage);

    const [word, setWord] = useState('');

    function handeSubmitWord() {
        dispatch(guessWord(word));
        setWord('');
    }

    useEffect(() => {
        const listener = function (event) {
            event.preventDefault();
        };

        document.addEventListener('touchmove', listener, { passive: false });

        return () => {
            document.removeEventListener('touchmove', listener);
        };
    }, []);

    function handleInputKeyPress(event) {
        if (event.key === 'Enter') {
            handeSubmitWord();
        }
    }

    return (
        <div className="GuesserCanvas">
            <div className={isThemeDark ? 'GuesserCanvas-Drawing GuesserCanvas-Drawing-dark' : 'GuesserCanvas-Drawing'}>
                {remoteImage && <img src={remoteImage} alt="Drawing" />}
            </div>
            <hr />
            {currentPlayer?.roundWordMatched && <div>
                <p>🏆 success 🏆</p>
                <p class="GuesserCanvas-matched-subtext">Waiting for other players to finish the game.</p>
            </div>}
            {!currentPlayer?.roundWordMatched && (
                <div className="GuesserCanvas-Input">
                    <input
                        value={word}
                        type="text"
                        placeholder="Enter the word..."
                        onChange={(event) => setWord(event.target.value)}
                        onKeyDown={handleInputKeyPress}
                    />
                    <Button
                        isSmall={true}
                        name="Submit"
                        description="Guess the word"
                        onClick={() => handeSubmitWord()} />
                </div>
            )}
        </div>
    );
}
