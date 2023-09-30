import './App.css';
import { Game } from '../features/game/Game';
import { useEffect } from 'react';

function App() {
    const chatType = window.Telegram?.WebApp?.initDataUnsafe['chat_type'] || 'unknown';
    const isGroupOrSuperGroup = chatType === 'group' || chatType === 'supergroup';

    useEffect(() => {
        window.Telegram?.WebApp?.expand();
    }, []);

    return (
        <div className="App">
            {isGroupOrSuperGroup && (
                <Game />
            )}
            {!isGroupOrSuperGroup && (
                <p>Open the link in the group.</p>
            )}
        </div>
    );
}

export default App;
