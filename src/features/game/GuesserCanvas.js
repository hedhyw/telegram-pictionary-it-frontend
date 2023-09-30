import { useDispatch, useSelector } from 'react-redux';
import React, { useState } from 'react';
import { guessWord, selectCurrentPlayer, selectRemoteImage } from './gameSlice';

export default function GuesserCanvas() {
    const dispatch = useDispatch();
    const currentPlayer = useSelector(selectCurrentPlayer);
    const remoteImage = useSelector(selectRemoteImage);

    const [word, setWord] = useState('');

    function handeSubmitWord() {
        dispatch(guessWord(word));
        setWord('');
    }

    return (
        <div>
            {remoteImage && <img src={remoteImage} alt="Drawing" />}
            {currentPlayer.roundWordMatched && <span>success</span>}
            {!currentPlayer.roundWordMatched && (
                <div>
                    <input
                        value={word}
                        onChange={(event) => setWord(event.target.value)}
                    />
                    <button type="button" onClick={() => handeSubmitWord()}>Submit</button>
                </div>
            )}
        </div>
    );
}
