import './App.css';
import { Game } from '../features/game/Game';
import { useEffect } from 'react';
import { ReactComponent as ChattingImageLight } from '../assets/undraw_chatting_re_j55r_light.svg';
import { ReactComponent as ChattingImageDark } from '../assets/undraw_chatting_re_j55r_dark.svg';

function App() {
    const chatType = window.Telegram?.WebApp?.initDataUnsafe['chat_type'] || 'unknown';
    const isGroupOrSuperGroup = chatType === 'group' || chatType === 'supergroup';
    const isThemeDark = window.Telegram?.WebApp?.colorScheme === 'dark';

    useEffect(() => {
        window.Telegram?.WebApp?.expand();
    }, []);

    return (
        <div className="App">
            {isGroupOrSuperGroup && (
                <Game />
            )}
            {!isGroupOrSuperGroup && (
                <div className="App-unavailable">
                    {isThemeDark && <ChattingImageDark />}
                    {!isThemeDark && <ChattingImageLight />}
                    <p>Please, try to open the link in a group telegram chat.</p>
                </div>
            )}
        </div>
    );
}

export default App;
