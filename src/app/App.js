import './App.css';
import { Game } from '../features/game/Game';
import { useEffect } from 'react';
import { ReactComponent as ChattingImageLight } from '../assets/undraw_chatting_re_j55r_light.svg';
import { ReactComponent as ChattingImageDark } from '../assets/undraw_chatting_re_j55r_dark.svg';
import { THEME_DARK, selectTheme, setTheme } from './appSlice';
import { useDispatch, useSelector } from 'react-redux';

const TELEGRAM_EVENT_THEME_CHANGED = 'themeChanged';

function App() {
    const dispatch = useDispatch();

    const isThemeDark = useSelector(selectTheme) === THEME_DARK;
    const chatType = window.Telegram?.WebApp?.initDataUnsafe['chat_type'] || 'unknown';
    const isGroupOrSuperGroup = chatType === 'group' || chatType === 'supergroup';

    
    useEffect(() => {
        const themeCallback = () => {
            const colorScheme = window.Telegram?.WebApp?.colorScheme;
            dispatch(setTheme(colorScheme));
        };

        window.Telegram?.WebApp?.expand();
        window.Telegram?.WebApp?.onEvent(TELEGRAM_EVENT_THEME_CHANGED, themeCallback);

        return () => {
            window.Telegram?.WebApp?.onEvent(TELEGRAM_EVENT_THEME_CHANGED, () => { });
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
